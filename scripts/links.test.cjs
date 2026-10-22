const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

const sourcePath = process.env.LINKS_SOURCE || path.join(__dirname, "../src/page/links.ts");
const source = ts.transpileModule(fs.readFileSync(sourcePath, "utf8"), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, experimentalDecorators: true },
}).outputText;

class Element extends EventTarget {
  constructor(value = "") {
    super();
    this.value = this.defaultValue = value;
    this.disabled = false;
    this.dataset = {};
    this.style = {};
    this.textContent = "";
    this.attributes = new Map();
    this.classes = new Set();
    this.classList = {
      add: (...names) => names.forEach((name) => this.classes.add(name)),
      remove: (...names) => names.forEach((name) => this.classes.delete(name)),
      contains: (name) => this.classes.has(name),
    };
  }
  setAttribute(name, value) {
    this.attributes.set(name, value);
  }
  removeAttribute(name) {
    this.attributes.delete(name);
  }
  get src() {
    return this.attributes.get("src");
  }
  set src(value) {
    this.attributes.set("src", value);
  }
  closest() {
    return this;
  }
  focus() {}
  scrollIntoView() {}
}

const deferred = () => {
  let resolve;
  const promise = new Promise((done) => {
    resolve = done;
  });
  return { promise, resolve };
};
const captcha = (id = "challenge-1") => ({
  ok: true,
  json: async () => ({ challengeId: id, image: `data:image/png;base64,${id}` }),
});
const problem = (detail) => ({
  status: 409,
  headers: { get: () => "application/problem+json" },
  json: async () => ({ detail }),
});
const settle = async () => {
  for (let i = 0; i < 4; i++) await new Promise(setImmediate);
};

function setup({ initial = {}, captchas = [captcha()], applications = [{ status: 201 }] } = {}) {
  const fields = Object.fromEntries(
    ["url", "displayName", "logo", "backlink", "feedUrls", "description", "email", "captchaCode"].map((name) => [
      name,
      new Element(initial[name] || ""),
    ])
  );
  const form = new Element();
  const image = new Element();
  image.src = "/links/apply/captcha";
  const refresh = new Element();
  const submit = new Element();
  const result = new Element();
  result.classList.add("is-hidden");
  const nodes = { "link-application-form": form, "link-application-captcha": image, "link-application-result": result };
  form.elements = { namedItem: (name) => fields[name] };
  form.querySelector = (selector) => {
    if (selector === ".link-application-captcha-button") return refresh;
    if (selector === ".link-application-submit") return submit;
    if (selector === ":invalid") return Object.values(fields).find((field) => field.invalid);
    return fields[/^\[name="(.+)"\]$/.exec(selector)?.[1]];
  };
  form.querySelectorAll = () => Object.values(fields).filter((field) => field.classList.contains("is-invalid"));
  form.reportValidity = () => {
    for (const [name, field] of Object.entries(fields)) {
      field.invalid =
        !field.disabled &&
        (["url", "displayName"].includes(name) ? !field.value : name === "captchaCode" && field.value.length !== 5);
    }
    return !Object.values(fields).some((field) => field.invalid);
  };
  form.reset = () =>
    Object.values(fields).forEach((field) => {
      field.value = field.defaultValue;
    });
  const requests = [];
  const captchaRequests = [];
  const fetch = async (url, options) => {
    if (url.endsWith("/captcha")) {
      captchaRequests.push({ url, options });
      return captchas[Math.min(captchaRequests.length - 1, captchas.length - 1)];
    }
    requests.push(JSON.parse(options.body));
    return applications[Math.min(requests.length - 1, applications.length - 1)];
  };
  const context = {
    exports: {},
    URLSearchParams,
    fetch,
    document: { getElementById: (id) => nodes[id] || null },
    window: { location: { search: "" } },
    FormData: class {
      get(name) {
        return fields[name].disabled ? null : fields[name].value;
      }
    },
    require: (id) => {
      assert.equal(id, "../main");
      return { documentFunction: () => () => {}, sakura: { translate: (_key, fallback) => fallback } };
    },
  };
  vm.runInNewContext(source, context, { filename: sourcePath });
  new context.exports.default().registerLinkApplication();
  return {
    fields,
    form,
    image,
    refresh,
    submit,
    result,
    requests,
    captchaRequests,
    edit(name, value, event = "input") {
      fields[name].value = value;
      fields[name].dispatchEvent(new Event(event));
    },
    submitForm() {
      form.dispatchEvent(new Event("submit", { cancelable: true }));
    },
    refreshCaptcha() {
      refresh.dispatchEvent(new Event("click", { cancelable: true }));
    },
    fill() {
      fields.url.value = "https://example.com";
      fields.displayName.value = "Example";
      fields.captchaCode.value = "ABCDE";
    },
  };
}

test("untouched derived URLs follow the site address", async () => {
  const app = setup();
  await settle();
  app.edit("url", "https://first.example/");
  app.edit("url", "https://second.example/");
  assert.equal(app.fields.logo.value, "https://second.example/logo.png");
  assert.equal(app.fields.backlink.value, "https://second.example/links");
  assert.equal(app.fields.feedUrls.value, "https://second.example/rss.xml");
});

for (const event of ["input", "change"]) {
  test(`${event} preserves custom values and intentional empty optional fields through URL edits and submit`, async () => {
    const app = setup();
    await settle();
    app.fill();
    app.edit("url", "https://first.example");
    app.edit("logo", "https://images.example/avatar.png", event);
    app.edit("backlink", "", event);
    app.edit("feedUrls", "", event);
    app.edit("url", "https://second.example");
    app.fields.url.dispatchEvent(new Event("blur"));
    assert.equal(app.fields.backlink.value, "");
    assert.equal(app.fields.feedUrls.value, "");
    app.submitForm();
    await settle();
    assert.equal(app.requests.length, 1);
    assert.equal(app.requests[0].logo, "https://images.example/avatar.png");
    assert.equal(app.requests[0].backlink, undefined);
    assert.deepEqual(app.requests[0].feedUrls, []);
  });
}

test("server-provided values are preserved before any field event", async () => {
  const app = setup({
    initial: {
      logo: "https://cdn.example/logo",
      backlink: "https://existing.example/friends",
      feedUrls: "https://existing.example/atom.xml",
    },
  });
  await settle();
  app.edit("url", "https://new.example");
  assert.equal(app.fields.logo.value, "https://cdn.example/logo");
  assert.equal(app.fields.backlink.value, "https://existing.example/friends");
  assert.equal(app.fields.feedUrls.value, "https://existing.example/atom.xml");
});

test("a successful application resets ownership for the next application", async () => {
  const app = setup();
  await settle();
  app.fill();
  app.edit("logo", "", "change");
  app.edit("backlink", "https://custom.example/friends");
  app.edit("feedUrls", "");
  app.submitForm();
  await settle();
  app.edit("url", "https://next.example");
  assert.equal(app.fields.logo.value, "https://next.example/logo.png");
  assert.equal(app.fields.backlink.value, "https://next.example/links");
  assert.equal(app.fields.feedUrls.value, "https://next.example/rss.xml");
});

test("failed initial CAPTCHA removes the native image and old code without a Cookie fallback", async () => {
  const app = setup({ initial: { captchaCode: "OLDXX" }, captchas: [{ ok: false }] });
  await settle();
  assert.equal(app.image.src, undefined);
  assert.equal(app.image.style.visibility, "hidden");
  assert.equal(app.fields.captchaCode.value, "");
  assert.equal(app.fields.captchaCode.disabled, true);
  assert.equal(app.submit.disabled, false);
  assert.equal(app.refresh.disabled, false);
  assert.equal(app.result.classList.contains("is-error"), true);
  assert.equal(app.captchaRequests.length, 1);
});

test("submitting after CAPTCHA failure only gets a new challenge and requires a new answer", async () => {
  const app = setup({ captchas: [{ ok: false }, captcha("recovered")] });
  await settle();
  app.fill();
  app.submitForm();
  await settle();
  assert.equal(app.requests.length, 0);
  assert.equal(app.fields.captchaCode.value, "");
  assert.equal(app.image.src, "data:image/png;base64,recovered");
  assert.equal(app.image.style.visibility, "");
  app.submitForm();
  await settle();
  assert.equal(app.requests.length, 0);
  app.edit("captchaCode", "NEWXX");
  app.submitForm();
  await settle();
  assert.equal(app.requests[0].challengeId, "recovered");
  assert.equal(app.requests[0].captchaCode, "NEWXX");
});

test("manual CAPTCHA failure clears the previous image and answer, and retry recovers", async () => {
  const app = setup({ captchas: [captcha("old"), { ok: false }, captcha("new")] });
  await settle();
  app.fill();
  app.refreshCaptcha();
  assert.equal(app.fields.captchaCode.value, "");
  assert.equal(app.image.style.visibility, "hidden");
  await settle();
  assert.equal(app.image.src, undefined);
  app.refreshCaptcha();
  await settle();
  assert.equal(app.image.src, "data:image/png;base64,new");
  assert.equal(app.image.style.visibility, "");
  assert.equal(app.result.classList.contains("is-hidden"), true);
  app.edit("captchaCode", "NEWXX");
  app.submitForm();
  await settle();
  assert.equal(app.requests[0].challengeId, "new");
  assert.equal(app.requests[0].captchaCode, "NEWXX");
});

test("parallel refreshes share one challenge and submissions cannot race a pending refresh", async () => {
  const pending = deferred();
  const app = setup({ captchas: [pending.promise] });
  assert.equal(app.image.src, undefined);
  assert.equal(app.image.style.visibility, "hidden");
  assert.equal(app.submit.disabled, true);
  assert.equal(app.fields.captchaCode.disabled, true);
  await settle();
  app.fill();
  app.refreshCaptcha();
  app.refreshCaptcha();
  app.submitForm();
  app.submitForm();
  await settle();
  assert.equal(app.captchaRequests.length, 1);
  assert.equal(app.requests.length, 0);
  pending.resolve(captcha("shared"));
  await settle();
  assert.equal(app.image.src, "data:image/png;base64,shared");
  assert.equal(app.image.style.visibility, "");
  assert.equal(app.submit.disabled, false);
});

test("a pending application blocks duplicate submits and manual refresh", async () => {
  const pending = deferred();
  const app = setup({ applications: [pending.promise] });
  await settle();
  app.fill();
  app.submitForm();
  app.submitForm();
  app.refreshCaptcha();
  await settle();
  assert.equal(app.requests.length, 1);
  assert.equal(app.captchaRequests.length, 1);
  assert.equal(app.submit.disabled, true);
  pending.resolve({ status: 201 });
  await settle();
  assert.equal(app.captchaRequests.length, 2);
  assert.equal(app.submit.disabled, false);
});

for (const [response, message, status] of [
  [{ status: 201 }, "申请已提交，等待审核。", "is-success"],
  [problem("该链接已提交申请"), "该链接已提交申请", "is-error"],
]) {
  test(`a failed next CAPTCHA preserves the application result: ${status}`, async () => {
    const app = setup({ captchas: [captcha(), { ok: false }], applications: [response] });
    await settle();
    app.fill();
    app.submitForm();
    await settle();
    assert.equal(app.result.textContent, message);
    assert.equal(app.result.classList.contains(status), true);
    assert.equal(app.image.src, undefined);
    assert.equal(app.image.style.visibility, "hidden");
    assert.equal(app.fields.captchaCode.value, "");
    assert.equal(app.refresh.disabled, false);
    assert.equal(app.submit.disabled, false);
  });
}

test("incomplete CAPTCHA responses cannot leave a usable old challenge", async () => {
  const app = setup({ captchas: [captcha(), { ok: true, json: async () => ({ challengeId: "missing-image" }) }] });
  await settle();
  app.fill();
  app.refreshCaptcha();
  await settle();
  assert.equal(app.image.src, undefined);
  app.submitForm();
  await settle();
  assert.equal(app.requests.length, 0);
});
