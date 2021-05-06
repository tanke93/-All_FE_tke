<template>
  <div>
    <div class="footer_wrap">
      <span>发现音乐</span>
      <span>我的音乐</span>
      <span @click="oneBtn">朋友-小传</span>
      <span @click="twoBtn">朋友-小智</span>
    </div>
    <div class="top">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// 目标: 编程式导航 - 跳转路由传参
// 方式1:
// name+params  =>  $route.params.key接收
// 方式2:
// path+query   =>  $route.query.key接收
// 区别:
// name+params (内存中传递) - 刷新网页就不在了
// path+query  (hash值?后面) - 刷新网页还在
// 注意:
// JS要跳转时, 如果当前url上"hash值"和"要跳转"的"一致", 发生路由重复的报错, 不会跳转
export default {
  methods: {
    oneBtn(){
      this.$router.push({
        name: "Part",
        params: {
          username: "小传"
        }
      })
    },
    twoBtn(){
      this.$router.push({
        path: "/part",
        query: {
          name: "小智"
        }
      })
    }
  }
};
</script>

<style scoped>
.footer_wrap {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  text-align: center;
  background-color: #333;
  color: #ccc;
}
.footer_wrap span {
  flex: 1;
  text-decoration: none;
  padding: 20px 0;
  line-height: 20px;
  background-color: #333;
  color: #ccc;
  border: 1px solid black;
}
.footer_wrap span:hover {
  background-color: #555;
}
.top {
  padding-top: 62px;
}

/*激活时样式 */
.footer_wrap .router-link-active{
  color: white;
  background: black;
}
</style>