import Vue from 'vue'
import App from './App.vue'
import "./mobile/flexible"//适配
import "./styles/reset.css"//初始化样式
import router from './router'//路由对象

import { Tabbar, TabbarItem, NavBar, Col, Row, Image as VanImage, Cell, Icon } from 'vant';

//测试封装的api方法
import { recommendMusicAPI } from '@/api';
async function fn () {
  const res = await recommendMusicAPI()
  // axios请求在原地的promise对象(里面有一个ajax请求)
  console.log(res);
}
fn()

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(Icon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
