<h1 align="center">国际化功能说明文档</h1>

# 功能说明
目前本主题的国际化，属于前端国际化。因此与 [Halo](https://halo.run) 后端有关的文字无法使用本国际化进行处理【菜单及后台设置项】。建议将菜单手动设置为其他语种。
# 添加国际化字段
如果使用者需要更改主题源码，并且需要添加额外的国际化字段，可以按照如下步骤进行：

1. 使用特定格式编写国际化语言所能识别的 HTML
2. 在 languages/xx.yml 下，添加新增字段的 key - value
3. 清除浏览器 storage 缓存，以便于更新新增字段

## 普通文本示例
最简单的，你可以使用最基础的 key - value 来使用国际化渲染你的文本。最简单的使用方式如下，定义一个 html
```html
<div class="i18n" data-iname="page.title"></div>
```

`class="i18n"` 是必须存在的，这代表将使用国际化获取目标文本。 

`data-iname` 代表在国际化翻译文件中的 key 值，必须是唯一值。

相对应的，翻译文件 **zh.yml** 里面应该如此写

```yml
page:
  title: 这是一个标题
```

使用如上方式，最终输出的 html 将为
```html
<div class="i18n" data-iname="page.title">这是一个标题</div>
```

## 属性文本实例（placeholder 等）

对于属性文本，例如 placeholder 等，也可以使用国际化来渲染。使用方式如下：

```html
<input class="i18n" type="search" data-iname="placeholder" data-iattr="placeholder" placeholder="Search...">	
```

`data-iattr` 正是区分渲染为文本与渲染成属性的地方，其值为需要使用国际化渲染的属性名称。

相对应的，翻译文件 **zh.yml** 里应该如下编写

```yml
placeholder: 这是提示文本
```

使用如上方式，最终输出的 html 将为

```html
<input class="i18n" type="search" data-iname="placeholder" data-iattr="placeholder" placeholder="这是提示文本">	
```

## 使用通配符示例

在正常使用国际化渲染的时候，大多数情况下只会使用比较简单的静态文本。但有时候，也需要 **动态参数**，例如评论数量，观看数量等，这时候将可以采用通配符的方式来编写国际化。如下所示：

```html
<title class="i18n" data-iname="page.title" data-ivalue="${blog_title!}"></title>
```

`data-ivalue` 可以接收一个或多个可变参数【多个参数使用英文分号（`;`）分隔】。在执行国际化的时候，会将此值带入并进行渲染。

使用通配符方式时，`zh.yml` 应该使用如下方式编写：

```yml
page:
  title: 这是博客的标题：%s
```

其中 `%s` 为 `data-ivalue` 传递过来的参数，如果有多个参数，则使用多个 `%s` 即可，但需要按照参数顺序。

使用此种方式，假设 blog_title 为 takagi 经过国际化处理之后，将会输出

```html
<title class="i18n" data-iname="page.title" data-ivalue="${blog_title!}">这是博客的标题：takagi</title>
```

特别的，如果想输出 %s 本身，那么需要如下编写 yml
```yml
page:
  title: 这是博客的标题：%s %%s
```

如此将会输出
```html
<title class="i18n" data-iname="page.title" data-ivalue="${blog_title!}">这是博客的标题：takagi %s</title>
```
# 添加语种
## 新建语种
对于现有翻译文件不能满足需求的，可以在主题目录 `/languages/` 目录下新建一个对应语言的 yml 文件，需要注意的是，此文件命名需要为标准国际化语言（[ISO 639-1](https://baike.baidu.com/item/ISO%20639-1/8292914?fr=aladdin)）所对应的 **语言文化代码**，例如 zh.yml，en.yml，ja.yml 等。

新建之后，建议先复制其他语言文件（推荐 zh.yml）内的所有文本至新建翻译文件内，然后依次翻译其内的文本即可。

## 增加主题配置
如果修改完成之后，还想在后台主题设置中可见，那么需要在主题配置中增加刚刚新建的语言。

在 settings.yml 文件中，搜索 i18n，找到如下文本
```yaml
    i18n:
      name: i18n
      label: 主题语言
      type: select
      default: auto
      options:
        - value: auto
          label: 自动
        - value: zh
          label: 中文（简体）
        - value: en
          label: 英文
```

在上述文本的 `options` 节点下新增一条。其中 value 为文件名，label 为翻译，如下所示

```yaml
    i18n:
      name: i18n
      label: 主题语言
      type: select
      default: auto
      options:
        - value: auto
          label: 自动
        - value: zh
          label: 中文（简体）
        - value: en
          label: 英文
        - value: ja
          label: 日文
```

# 注意事项

## 关于 Select 等标签
目前暂不考虑 Select 标签的国际化渲染，目前暂时没有使用到。并且，此国际化只是临时方案，若 halo 后端国际化完成，则本国际化渲染也会同步更新。

## 关于文本与属性渲染共存的情况
目前来说，渲染成属性和渲染成文本只能二选一，因为还没有发现有需要使用到复杂渲染的地方。如果后续有需求，可以考虑进行设计。

## 不能在渲染为文本的国际化 HTML 内嵌套其他HTML
由于渲染为文本会替换此 html 的 text，因此如果其内部有其他 html，将会被覆盖。如下所示将是不正确的使用
```html
<div class="i18n" data-iname="page.title">
    <span>这是一个文本</span>
</div>
```

如果使用上述 HTML 格式，则经过国际化处理之后 **`<span>这是一个文本</span>`** 将会被覆盖。

应该使用如下所述的 HTML 格式
```html
<div>
    <div class="i18n" data-iname="page.title"></div>
    <span>这是一个文本</span>
</div>
```

# 作者

© [LIlGG](https://github.com/LIlGG)，基于 [MIT](./LICENSE) 许可证发行。<br>
作者及其贡献者共有版权 （[帮助维护列表](https://github.com/LIlGG/halo-theme-sakura/graphs/contributors)）。

> [lixingyong.com](https://lixingyong.com) · GitHub [@LIlGG](https://github.com/LIlGG)