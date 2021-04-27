import Vue from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.css" // 默认找文件夹下的index文件(但是这个不是所以需要写路径)
// 时间案例下载moment模块
Vue.config.productionTip = false

//定义全局过滤器  任意的.vue文件内‘直接使用’
//语法：Vue.filter('')
Vue.filter("reverse", (val, s) => {
  return val.split("").reverse().join(s)
})

new Vue({
  render: h => h(App),
}).$mount('#app')
