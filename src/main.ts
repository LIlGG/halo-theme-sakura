import { jsonToMap } from "./utils/util";
import "./module/index";
import "@/css/main.css";
import "@purge-icons/generated";

/* 核心启动，通常不建议也不应当由用户调用，只能由启动代码使用  */
interface Sakura {
  getThemeConfig(group: String): ThemeConfig;
  refresh(): void;
  registerDocumentFunction(name: String, method: Function): void;
}

declare var Sakura: {
  prototype: Sakura;
  new (config?: String): Sakura;
};

interface ThemeConfig {
  isEmpty(): Boolean;
  getValue<T extends Number | String | Boolean | ThemeConfig[]>(
    key: String,
    type: new (...args: any) => T
  ): T | undefined;
}

class ThemeConfigImpl implements ThemeConfig {
  private schemas?: any;

  constructor(schemas?: any) {
    this.schemas = schemas;
  }

  isEmpty(): Boolean {
    return !this.schemas;
  }

  getValue<T extends Number | String | Boolean | ThemeConfig[]>(
    key: String,
    type: new (...args: any) => T
  ): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    if (!(key.toString() in this.schemas)) {
      return undefined;
    }
    return new type(this.schemas.key);
  }
}

interface DocumentFunctionFactory {
  registerDocumentFunction(name: String, method: Function): void;

  getDocumentFunction(name: String): Function | undefined;

  getDocumentFunctions(): Map<String, Function>;

  getDocumentFunctionNames(): Iterable<String>;

  geDocumentFunctionCount(): Number;
}

class SakuraDocumentFunctionFactory implements DocumentFunctionFactory {
  private documentFunctions: Map<String, Function>;

  constructor() {
    this.documentFunctions = new Map();
  }

  geDocumentFunctionCount(): Number {
    return this.documentFunctions.size;
  }

  getDocumentFunctions(): Map<String, Function> {
    return this.documentFunctions;
  }

  getDocumentFunctionNames(): Iterable<String> {
    if (this.documentFunctions.size === 0) {
      return new Set();
    }
    return this.documentFunctions.keys();
  }

  registerDocumentFunction(methodName: String, methodFunction: Function): void {
    this.documentFunctions.set(methodName, methodFunction);
  }

  getDocumentFunction(name: String): Function | undefined {
    if (!this.documentFunctions.has(name)) {
      return undefined;
    }
    return this.documentFunctions.get(name);
  }
}

export class SakuraApp implements Sakura {
  private readonly config?: String;

  private themeconfigs: Map<String, ThemeConfig>;

  private currPageData: Map<String, any>  = new Map();

  private startupDate: Date = new Date();

  private documentFunctionFactory: DocumentFunctionFactory = new SakuraDocumentFunctionFactory();

  private events: Map<String, Event> = new Map();

  public readonly REFRESH_EVENT_NAME: String = "sakura:refresh";

  constructor(config?: String) {
    this.config = config;
    this.themeconfigs = new Map();
    this.refreshThemeConfig();
  }

  private refreshThemeConfig() {
    if (!this.config) {
      return;
    }
    let groupMap = JSON.parse(this.config.toString());
    Object.keys(groupMap).forEach((key) => {
      let themeConfig = new ThemeConfigImpl(groupMap[key]);
      this.themeconfigs.set(key, themeConfig);
    });
  }

  getThemeConfig(group: String): ThemeConfig {
    let themeConfig = this.themeconfigs.get(group);
    if (!themeConfig) {
      return new ThemeConfigImpl();
    }
    return themeConfig;
  }

  /**
   * 页面变化时，刷新 Sakura 所需更新的公共状态。
   *
   * <P>
   * 特别的，为了减少公共 JS 的大小，不建议在此方法内调用状态可变的功能刷新方法。例如可由用户开启或关闭的功能。
   * 此类开放功能可由内联代码使用 window 监听事件 "sakura:refresh" 来进行刷新,也可以放在 `lib` 目录下，之后
   * 在主题端使用 `script` 标签引入。
   * <P>
   */
  public refresh(): void {
    // 初始化刷新前置
    this.prepareRefresh();
    // 注册路由
    this.registerRoute();
    // 获取 Dom 函数工厂
    this.obtainFunctionFactory();
    // 注册预设 Dom 函数
    this.registerDomProcessors();
    // 初始化事件广播器
    this.initEventMulticaster();
    // 处理所有 DocumentFunction
    this.finishDocumentFunction();
    // 结束刷新
    this.finishRefresh();
  }

  /**
   * 注册 documentFunction 函数，该类函数通常为动态加载。
   * 
   * @param name 函数名
   * @param method 函数
   */
  public registerDocumentFunction(name: String, method: Function): void {
    this.obtainFunctionFactory();
    this.documentFunctionFactory.registerDocumentFunction(name, method);
    this.finishDocumentFunction();
  }

  protected finishDocumentFunction(): void {
    let functions = this.documentFunctionFactory.getDocumentFunctions();
    for (let [key, value] of functions) {
      value();
    }
  }

  protected registerDomProcessors(): void {
    let functions = getDocumentFunctions();
    functions.forEach((value, key) => {
      this.documentFunctionFactory.registerDocumentFunction(key, value);
    })
    if (this.getThemeConfig("advanced").getValue("log", Boolean)) {
      console.log("共获取预设 documentFunction " + functions.size + " 个");
    }
  }

  protected obtainFunctionFactory(): DocumentFunctionFactory {
    if (!this.documentFunctionFactory) {
      this.documentFunctionFactory = new SakuraDocumentFunctionFactory();
    }
    return this.documentFunctionFactory;
  }

  protected prepareRefresh(): void {
    this.startupDate = new Date();
    this.refreshMetadata();

    if (this.getThemeConfig("advanced").getValue("log", Boolean)) {
      console.log("Sakura Refreshing");
    }
  }

  protected refreshMetadata() {
    try {
      this.currPageData = jsonToMap<string, any>(pageData);
    } catch (error) {
      console.error("解析 pageData 失败：", error);
    }
  }

  protected async registerRoute() {
    const _templateId = this.currPageData.get("_templateId");
    if (!_templateId) {
      return;
    }
    // TODO 也可以通过 `./page/index` 这类具体名称处理，优点是不需要加上 min.js，缺点是需要特殊处理
    const modulePath = `./page/${_templateId}.min.js`;
    await import(modulePath);
  }

  protected initEventMulticaster(): void {
    let refreshEvent = this.events.get(this.REFRESH_EVENT_NAME);
    if (!refreshEvent) {
      //TODO 将每页的可变属性传递给事件
      refreshEvent = new CustomEvent(this.REFRESH_EVENT_NAME.toString());
      this.events.set(this.REFRESH_EVENT_NAME, refreshEvent);
    }
  }

  protected finishRefresh(): void {
    let refreshEvent = this.events.get(this.REFRESH_EVENT_NAME) as Event;
    window.dispatchEvent(refreshEvent);
    if (this.getThemeConfig("advanced").getValue("log", Boolean)) {
      console.log("finish Refreshing");
    }
  }
}

// 全局配置文件变量，由主题提供
declare const config: any;
// 当前可变属性变量，由主题提供
declare const pageData: any;

export var sakura: Sakura = new SakuraApp(config);;

document.addEventListener("DOMContentLoaded", () => {
  sakura.refresh();
});

var functions: Map<String, Function>;

function getDocumentFunctions(): Map<String, Function> {
  return functions;
}

export function documentFunction() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!sakura) {
      functions = new Map();
      functions.set(propertyKey, descriptor.value);
      return;
    }
    sakura.registerDocumentFunction(propertyKey, descriptor.value);
  };
}
