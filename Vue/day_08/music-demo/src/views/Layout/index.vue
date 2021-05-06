<template>
  <div>
    <van-nav-bar :title="activeTitle" />
    <!-- <van-nav-bar :title="this.$route.meta.title" /> -->

    <!-- 二级路由 -->
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/layout/search" icon="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeTitle: this.$route.meta.title,//顶部导航要显示的标题（默认获取当前的路由对象里meta中title值）
    }
  },
  //路由切换 - 侦听$router对象改变
  watch: {
    $route () {
      this.activeTitle = this.$route.meta.title;//提取切换后路由信息对象里的title显示
    }
  }

}
</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>