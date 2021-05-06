import Vue from 'vue'
import App from './App.vue'
import Find from '@/views/Find' // @是src的绝对地址


import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: "/", // 默认hash值路径
    redirect: "/find" // 重定向到/find
    // 浏览器url中#后的路径被改变成/find-重新匹配规则
  },
  {
    path: "/find",
    name: "Find",
    component: Find,
    children: [
      {
        path: "recommend",
        component: Recommend
      },
      {
        path: "ranking",
        component: Ranking
      },
      {
        path: "songlist",
        component: SongList
      }
    ]
  },
  {
    path: "/my",
    name: "My",
    component: My
  },
  {
    path: "/part",
    name: "Part",
    component: Part
  },
  {
    path: "/part/:username", // 有:的路径代表要接收具体的值
    component: Part
  },
  // 404在最后(规则是从前往后逐个比较path)
  {
    path: "*",
    component: NotFound
  }
]

const router = new VueRouter({
  routes,
})
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
