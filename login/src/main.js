import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI) // 注册element_UI的组件与功能

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
