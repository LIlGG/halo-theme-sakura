function initMathjaxConfig() {
  MathJax.Hub.Config({
    showProcessingMessages: false, //关闭js加载过程信息
    messageStyle: "none", //不显示信息
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
      inlineMath: [["$", "$"], ["\\(", "\\)"]], //行内公式选择符
      displayMath: [["$$", "$$"], ["\\[", "\\]"]], //段内公式选择符
      skipTags: ["script", "noscript", "style", "textarea", "pre", "code", "a"], //避开某些标签
      ignoreClass: "no-math"
    },
    "HTML-CSS": {
      availableFonts: ["STIX", "TeX"], //可选字体
      showMathMenu: false //关闭右击菜单显示
    }
  });
}

if (!window.MathJax) {
  // 加载 MathJax
  Util.loadJS("https://cdn.bootcss.com/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML", initMathjaxConfig)
} else {
  initMathjaxConfig();
}