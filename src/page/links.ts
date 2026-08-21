import { documentFunction, sakura } from "../main";

const REST_API_BASE = "/apis/api.link.halo.run/v1alpha1";

const PROBLEM_MESSAGES: Record<string, { key: string; fallback: string }> = {
  "400 https://halo.run/probs/invalid-link-application": {
    key: "page.links.apply.errors.invalid",
    fallback: "请检查申请内容",
  },
  "400 https://halo.run/probs/invalid-link-application-captcha": {
    key: "page.links.apply.errors.captcha",
    fallback: "验证码错误或已过期",
  },
  "403 https://halo.run/probs/link-application-disabled": {
    key: "page.links.apply.errors.disabled",
    fallback: "友链申请暂未开放",
  },
  "409 https://halo.run/probs/duplicate-link-application": {
    key: "page.links.apply.errors.duplicate",
    fallback: "该链接已经申请",
  },
  "409 https://halo.run/probs/link-application-capacity-reached": {
    key: "page.links.apply.errors.capacity",
    fallback: "待审核申请已满",
  },
  "429 https://halo.run/probs/request-not-permitted": {
    key: "page.links.apply.errors.rate",
    fallback: "请求过于频繁",
  },
  "503 https://halo.run/probs/link-application-unavailable": {
    key: "page.links.apply.errors.unavailable",
    fallback: "服务暂时不可用",
  },
};

export default class Links {
  @documentFunction()
  public registerLinkApplication() {
    const form = document.getElementById("link-application-form") as HTMLFormElement | null;
    if (!form || form.dataset.enhanced === "true") {
      return;
    }
    form.dataset.enhanced = "true";

    const captchaImage = document.getElementById("link-application-captcha") as HTMLImageElement | null;
    const captchaButton = form.querySelector(".link-application-captcha-button") as HTMLButtonElement | null;
    const result = document.getElementById("link-application-result");
    const submitButton = form.querySelector(".link-application-submit") as HTMLButtonElement | null;
    let challengeId: string | null = null;
    let refreshing = false;

    const translate = (key: string, fallback: string) => sakura.translate(key, fallback);

    const setStatus = (type: "success" | "error" | "hidden", message = "") => {
      if (!result) {
        return;
      }
      result.classList.remove("is-success", "is-error", "is-hidden");
      if (type === "hidden") {
        result.classList.add("is-hidden");
        result.textContent = "";
        result.removeAttribute("role");
        return;
      }
      result.classList.add(type === "success" ? "is-success" : "is-error");
      result.setAttribute("role", type === "success" ? "status" : "alert");
      result.textContent = message;
    };

    const toast = (message: string) => {
      if (sakura.$toast) {
        sakura.$toast.create(message);
      }
    };

    const clearInvalid = () => {
      form.querySelectorAll(".link-application-field.is-invalid").forEach((field) => {
        field.classList.remove("is-invalid");
      });
    };

    const markInvalid = (fieldName?: string | null) => {
      if (!fieldName) {
        return;
      }
      const field = form.querySelector(`[name="${fieldName}"]`)?.closest(".link-application-field");
      field?.classList.add("is-invalid");
    };

    const siteBase = (raw: string) => {
      const value = raw.trim().replace(/\/+$/, "");
      return value || null;
    };

    const derivedFields: Record<"logo" | "backlink" | "feedUrls", { suffix: string; last: string }> = {
      logo: { suffix: "/logo.png", last: "" },
      backlink: { suffix: "/links", last: "" },
      feedUrls: { suffix: "/rss.xml", last: "" },
    };

    const applyDerivedUrls = (rawUrl: string) => {
      const base = siteBase(rawUrl);
      if (!base) {
        return;
      }
      (Object.keys(derivedFields) as Array<keyof typeof derivedFields>).forEach((name) => {
        const field = derivedFields[name];
        const el = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;
        if (!el) {
          return;
        }
        const current = el.value.trim();
        const next = `${base}${field.suffix}`;
        if (!current || current === field.last) {
          el.value = next;
          field.last = next;
        }
      });
    };

    const splitFeedUrls = (value: string) =>
      value
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

    const refreshCaptcha = async () => {
      if (refreshing) {
        return;
      }
      refreshing = true;
      try {
        const response = await fetch(`${REST_API_BASE}/link-applications/captcha`, {
          method: "POST",
          credentials: "omit",
        });
        if (!response.ok) {
          throw new Error("CAPTCHA unavailable");
        }
        const payload = await response.json();
        challengeId = payload.challengeId ?? null;
        if (captchaImage && payload.image) {
          captchaImage.src = payload.image;
        }
      } catch {
        challengeId = null;
        if (captchaImage) {
          captchaImage.src = `/links/apply/captcha?t=${Date.now()}`;
        }
      } finally {
        refreshing = false;
      }
    };

    const inferInvalidField = (errors: unknown) => {
      const text = Array.isArray(errors) ? errors.join(" ") : "";
      if (text.includes("Logo")) {
        return "logo";
      }
      if (text.includes("反链")) {
        return "backlink";
      }
      if (text.includes("订阅")) {
        return "feedUrls";
      }
      if (text.includes("网站名称") || text.includes("displayName")) {
        return "displayName";
      }
      if (text.includes("URL") || text.includes("url")) {
        return "url";
      }
      return undefined;
    };

    const readProblem = async (response: Response) => {
      const fallback = translate("page.links.apply.errors.network", "暂时无法提交，请稍后再试");
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/problem+json")) {
        return fallback;
      }
      try {
        const problem = await response.json();
        const mapped = PROBLEM_MESSAGES[`${problem.status} ${problem.type}`];
        if (problem.type?.includes("invalid-link-application-captcha")) {
          markInvalid("captchaCode");
        } else if (problem.type?.includes("invalid-link-application")) {
          markInvalid(inferInvalidField(problem.errors));
        }
        if (mapped) {
          return problem.detail || translate(mapped.key, mapped.fallback);
        }
        return problem.detail || fallback;
      } catch {
        return fallback;
      }
    };

    const urlInput = form.elements.namedItem("url") as HTMLInputElement | null;
    urlInput?.addEventListener("input", () => {
      applyDerivedUrls(urlInput.value);
    });
    urlInput?.addEventListener("blur", () => {
      applyDerivedUrls(urlInput.value);
    });

    captchaButton?.addEventListener("click", (event) => {
      event.preventDefault();
      const captchaInput = form.elements.namedItem("captchaCode") as HTMLInputElement | null;
      refreshCaptcha().then(() => {
        captchaInput?.focus();
      });
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      clearInvalid();

      if (urlInput) {
        applyDerivedUrls(urlInput.value);
      }

      if (!form.reportValidity()) {
        const firstInvalid = form.querySelector(":invalid") as HTMLElement | null;
        firstInvalid?.closest(".link-application-field")?.classList.add("is-invalid");
        firstInvalid?.focus();
        return;
      }

      if (!challengeId) {
        await refreshCaptcha();
      }
      if (!challengeId) {
        const message = translate("page.links.apply.errors.captcha", "验证码错误或已过期");
        setStatus("error", message);
        toast(message);
        return;
      }

      const formData = new FormData(form);
      const captchaCode = String(formData.get("captchaCode") || "").trim();
      const payload = {
        url: String(formData.get("url") || "").trim(),
        displayName: String(formData.get("displayName") || "").trim(),
        logo: String(formData.get("logo") || "").trim() || undefined,
        description: String(formData.get("description") || "").trim() || undefined,
        email: String(formData.get("email") || "").trim() || undefined,
        backlink: String(formData.get("backlink") || "").trim() || undefined,
        feedUrls: splitFeedUrls(String(formData.get("feedUrls") || "")),
        challengeId,
        captchaCode,
      };

      submitButton?.setAttribute("disabled", "disabled");
      if (submitButton) {
        submitButton.textContent = translate("page.links.apply.submitting", "正在提交...");
      }

      try {
        const response = await fetch(`${REST_API_BASE}/link-applications`, {
          method: "POST",
          credentials: "omit",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.status === 201) {
          const message = translate("page.links.apply.success", "申请已提交，等待审核。");
          form.reset();
          Object.values(derivedFields).forEach((field) => {
            field.last = "";
          });
          clearInvalid();
          setStatus("success", message);
          toast(message);
          result?.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        }

        const message = await readProblem(response);
        setStatus("error", message);
        toast(message);
      } catch {
        const message = translate("page.links.apply.errors.network", "暂时无法提交，请稍后再试");
        setStatus("error", message);
        toast(message);
      } finally {
        challengeId = null;
        const captchaInput = form.elements.namedItem("captchaCode") as HTMLInputElement | null;
        if (captchaInput) {
          captchaInput.value = "";
        }
        if (submitButton) {
          submitButton.removeAttribute("disabled");
          submitButton.textContent = translate("page.links.apply.submit", "申请友链");
        }
        await refreshCaptcha().catch(() => undefined);
      }
    });

    const params = new URLSearchParams(window.location.search);
    const applied = params.get("applied");
    if (applied === "success") {
      toast(translate("page.links.apply.success", "申请已提交，等待审核。"));
    } else if ((applied === "error" || applied === "disabled") && result?.textContent) {
      toast(result.textContent);
    }
    if (applied) {
      params.delete("applied");
      params.delete("message");
      params.delete("field");
      params.delete("value");
      const next = `${window.location.pathname}${params.toString() ? `?${params}` : ""}${window.location.hash}`;
      window.history.replaceState({}, "", next);
      document.getElementById("link-application")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    refreshCaptcha();
  }
}
