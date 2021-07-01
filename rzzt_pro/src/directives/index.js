// 负责自定义指令模块
export const imagerror = {
  inserted (dom, options) {
    // dom 表示当前指令作用的dom对象 此时认定为Img
    // options是指令中的变量的解释 其中options.value
    // 当图片有地址 却没有加载成功的时候 会报404错误 并触发onerror事件
    dom.src = dom.src || options.value
    dom.onerror = function () {
      // 当图片加载异常的时候 会将指令配置的默认图片设置为该图片的内容
      dom.src = options.value
    }
  },
  // 赋值之后重新处理
  componentUpdated (dom, options) {
    dom.src = dom.src || options.value
  }
}
