import Vue from 'vue'
import App from './App.vue'

//全局定义组件
import Pannel from './components/pannel_01'
// Vue.component('组件名',组件对象)
Vue.component("Pannel1", Pannel)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
