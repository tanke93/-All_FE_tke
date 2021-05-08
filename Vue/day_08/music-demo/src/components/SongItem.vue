<template>
  <van-cell center :title="name" :label="author +'-'+ album">
    <template #right-icon>
      <van-icon size="0.6rem" name="play-circle-o" @click="playFn" />
    </template>
  </van-cell>
</template>

<script>
export default {
  props: {
    name: String,//歌名
    author: String,//歌手
    album: String,//专辑
    id: Number//歌曲id
  },
  methods: {
    playFn () {
      this.$router.push({
        path: '/play',
        query: {
          id: this.id //歌曲id 通过路由跳转传递
        }
      })
    }
  }
}
</script>

<style>
</style>