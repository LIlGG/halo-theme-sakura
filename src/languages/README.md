# 国际化功能说明文档

Sakura 已内置前端国际化，无需开启设置。普通用户可直接切换界面语言，开发者可通过语言文件修改译文或添加新语种。

## 使用已有语言

### 切换语言

| 语言     | 语言文件             | 访问示例                      |
| -------- | -------------------- | ----------------------------- |
| 简体中文 | [zh.json](./zh.json) | `https://example.com/?lng=zh` |
| 英语     | [en.json](./en.json) | `https://example.com/?lng=en` |
| 日语     | [ja.json](./ja.json) | `https://example.com/?lng=ja` |

将 `example.com` 换成你的网站域名，在地址栏打开完整网址即可切换。参数名是 **`lng`**；网址已有查询参数时，使用 `&lng=en`。

没有指定或保存语言时，主题读取浏览器首选语言。地区变体会继续查找基础语言，例如 `en-US` 使用 `en`；目前 `zh-TW` 也使用简体中文的 `zh.json`。

语言选择会保存到当前浏览器，下次访问继续沿用，只影响这位访问者。主题目前没有内置的语言切换按钮或全站固定语言设置。

### 翻译范围

语言文件负责已接入国际化的主题文字，如分页按钮、归档标题、搜索提示和日期。文章、菜单、分类名称及手动填写的个人介绍等内容需要自行维护；Halo 后台和插件界面由各自的国际化功能负责。

## 开发导航

- [开发前准备](#开发前准备)
- [添加新语种](#添加新语种) / [编辑现有语种](#编辑现有语种)
- [在 HTML 中使用](#在-html-中使用) / [在 JavaScript 中使用](#在-javascript-中使用)
- [高级功能](#高级功能) / [常见问题](#常见问题)

## 国际化方案

初始化逻辑位于 [src/main.ts](../main.ts)，日期格式化逻辑位于 [src/utils/i18nFormat.ts](../utils/i18nFormat.ts)。

| 组件                                                                                            | 用途                             |
| ----------------------------------------------------------------------------------------------- | -------------------------------- |
| [i18next](https://www.i18next.com/)                                                             | 查找译文、处理变量与复数         |
| [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) | 检测并保存语言                   |
| [i18next-chained-backend](https://github.com/i18next/i18next-chained-backend)                   | 串联缓存与资源加载器             |
| [i18next-localstorage-backend](https://github.com/i18next/i18next-localstorage-backend)         | 缓存生产环境的语言资源           |
| [loc-i18next](https://github.com/mthh/loc-i18next)                                              | 翻译带有 `data-i18n` 的 DOM 元素 |

语言 JSON 通过动态 `import()` 加载，由 Vite 打包到 `templates/assets/dist/`。生产构建优先读取语言资源缓存，开发构建跳过该缓存。

## 开发前准备

建议使用与当前 CI 一致的 Node.js 22，以及 [package.json](../../package.json) 指定的 pnpm 9.15.1：

```sh
git clone https://github.com/LIlGG/halo-theme-sakura.git
cd halo-theme-sakura
pnpm install --frozen-lockfile
pnpm dev
```

`pnpm dev` 只监听并构建源码，**不会启动网页服务器**。需要将主题安装到 Halo 开发环境，通过 Halo 的网站地址预览；修改模板或主题配置后，按需重新加载主题。

完成修改后，停止开发构建并运行 `pnpm build`。部署时更新整个主题包，包括 `templates/assets/dist/`，不能只上传语言 JSON，也不要手动编辑生成的压缩文件。安装方式见 [项目 README](../../README.md)。

## 添加新语种

以法语 `fr` 为例，在仓库根目录执行：

```sh
cp src/languages/en.json src/languages/fr.json
```

1. 保留 JSON 层级和键名，翻译字符串值，并按目标语言补齐复数形式。
2. 文件名使用小写语言代码，如 `fr.json`、`pt-br.json`，无需额外注册语言。
3. 重新构建，在 Halo 中打开 `/?lng=fr`，检查相关页面及 PJAX 跳转后的文字。
4. 贡献新语言时，同步更新本文的语言表，并检查需要提交的构建产物。

## 编辑现有语种

翻译键对应 JSON 的对象路径。例如修改英语首页的“发现”，只需编辑 `en.json` 中 `home.discovery` 的值。

- 保留键名、`{{ ... }}` 变量、`$t(...)` 引用和格式化名称。
- 新增界面文字时，在所有内置语言文件中补齐对应翻译。
- 使用有效 JSON，不添加注释或尾随逗号；修改后重新构建并验证。

## 在 HTML 中使用

主题会在首次初始化和 PJAX 刷新时处理 `[data-i18n]` 元素。

### 文本和属性

```html
<span data-i18n="home.discovery">发现</span>
<input type="search" data-i18n="[placeholder]search.search_modal.placeholder" placeholder="搜索..." />
<button data-i18n="[title]common.copy_code;common.copy_code" title="复制代码">复制代码</button>
```

`data-i18n` 指定翻译键，`[属性名]` 指定要翻译的属性，多个目标用分号分隔。缺失译文时使用元素原有内容。

普通文本翻译会替换子内容。若要保留图标，可把 `data-i18n` 放在独立的文字 `span` 上，或用 `i18n-target` 指向子元素：

```html
<div data-i18n="home.discovery" i18n-target=".label">
  <span class="iconify" data-icon="fa:leaf"></span>
  <span class="label">发现</span>
</div>
```

`i18n-target` 必须匹配当前元素的子元素，否则会替换当前元素的内容。

### 变量

通过 `i18n-options` 传入 JSON 参数，替换译文中的 `{{ visit }}`：

```html
<span data-i18n="postlist.heat" i18n-options='{"visit": 12}'>12 次浏览</span>
```

Thymeleaf 中可由服务端生成参数，例如文章浏览量：

```html
<span data-i18n="postlist.heat" th:i18n-options="|{'visit': ${post.stats.visit}}|"></span>
```

字符串参数需要正确序列化和转义，避免引号破坏属性。注意本主题使用 **`i18n-options`** 和 **`i18n-target`**，两者都没有 `data-` 前缀。

### HTML 内容

```html
<div data-i18n="[html]post.copyright_template_html.license"></div>
```

`[html]` 将译文写入 `innerHTML`。主题关闭了插值转义（`escapeValue: false`），因此只应插入可信内容；普通文字使用默认文本模式即可。

## 在 JavaScript 中使用

使用 `sakura.translate(key, defaultValue, options?)`，参数依次为翻译键、默认文字和 i18next 选项。以 `src/page/` 中的模块为例：

```ts
import { sakura } from "../main";

// 在国际化初始化完成后调用。
const label = sakura.translate("common.copy_code", "复制代码");
const result = sakura.translate("search.search_result.title", "搜索结果：{{ keyword }}", {
  keyword: "Halo",
});
```

外部脚本可通过 `window.sakura.translate(...)` 调用。初始化前调用只会原样返回默认字符串，且不会自动更新；静态文字优先使用 `data-i18n`。

需要等待首次初始化时，可使用以下写法：

```ts
import { sakura } from "../main";

function renderTitle() {
  const title = document.querySelector("#example-title");
  if (title) title.textContent = sakura.translate("home.discovery", "发现");
}

if (sakura.$t) {
  renderTitle();
} else {
  window.addEventListener("sakura:i18n", () => queueMicrotask(renderTitle), { once: true });
}
```

当前 `sakura:i18n` 事件早于 `$t` 和 `$localize` 挂载，因此回调使用微任务延后执行。初始化后动态插入的 DOM 可通过 `sakura.$localize("#example-container")` 翻译。

## 高级功能

### 自定义模板

译文支持以下写法：

- `{{ keyword }}`：读取调用参数，如 `Search results: {{ keyword }}`。
- `$t(page.categories.title)`：引用其他翻译键，如 `$t(page.categories.title) Radar Chart`。

变量名和引用键应与代码保持一致，不要翻译它们。

### 复数

传入数值类型的 `count`，由 i18next 选择复数形式：

```ts
sakura.translate("common.days", "{{ count }} 天", { count: 1 }); // 英语：1 day
sakura.translate("common.days", "{{ count }} 天", { count: 2 }); // 英语：2 days
```

英语对应 `common.days_one` 和 `common.days_other`。其他语言的形式可能不同，参见 [i18next 复数说明](https://www.i18next.com/translation-function/plurals)。

### 日期和相对时间

| 格式化名称           | 输入                         | 用途                     |
| -------------------- | ---------------------------- | ------------------------ |
| `datetimeFormat`     | 日期值，如 ISO 日期字符串    | 格式化日期时间           |
| `relativeTimeFormat` | 过去某时刻的 Unix 毫秒时间戳 | 显示“几分钟前”等相对时间 |

例如 `post.time` 的译文包含 `{{ time, datetimeFormat }}`：

```ts
sakura.translate("post.time", "发布于 {{ time, datetimeFormat }}", {
  time: "2026-01-01T08:00:00Z",
  params: {
    options: { year: "numeric", month: "2-digit", day: "2-digit" },
    separator: "-",
  },
});
```

未传 `params.options` 时使用主题的日期格式设置；传入后使用对应的 `Intl.DateTimeFormat` 选项。`separator` 只替换结果中的 `/`。

相对时间译文可写为 `{{ time, relativeTimeFormat }}`，并传入 `time: Date.now() - 60_000`。这里需要毫秒时间戳，而非经过的秒数。

## 常见问题

**修改浏览器语言后没有变化？**

语言检测顺序为：URL `lng` → Cookie `i18next` → localStorage `i18nextLng` → sessionStorage `i18nextLng` → 浏览器语言 → HTML `lang`。

要恢复自动识别，在开发者工具的“应用 / 存储”中删除该网站 localStorage 中的 `i18nextLng`，若上述 Cookie 或 sessionStorage 项存在也一并删除，然后移除 URL 中的 `lng` 并重新加载。无需清空全部存储。

**修改译文后没有生效？**

先确认已重新构建、部署并选择了正确语言。生产构建的翻译缓存以 `i18next_sakura_` 开头，默认保留 7 天并校验主题版本；同版本修改后，可仅删除这些缓存项再刷新。仍无变化时检查浏览器或 CDN 静态缓存。`pnpm dev` 跳过翻译资源缓存，但仍会保存语言选择。

**部分文字未翻译或显示翻译键？**

先确认文字属于主题的翻译范围，再检查对应语言文件和键。主题未配置统一的中文回退：缺失译文时使用元素原有内容或调用方提供的默认文字，没有默认内容时可能显示翻译键。新增语言应补齐译文。

## 作者

© [LIlGG](https://github.com/LIlGG)，基于 [MIT](../../LICENSE) 许可证发行。<br>
作者及其贡献者共有版权（[帮助维护列表](https://github.com/LIlGG/halo-theme-sakura/graphs/contributors)）。

> [lixingyong.com](https://lixingyong.com) · GitHub [@LIlGG](https://github.com/LIlGG)
