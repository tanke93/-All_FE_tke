<template>
  <div>
    <p>原来的样子:{{ msg |reverse }}</p>
    <p :title="msg | toUp">鼠标长停</p>
    <!-- 多个过滤器使用 -->
    <p :title="msg | toUp |reverse('|')">鼠标长停</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello Vue'
    }
  },
  filters: {
    tuUp (val) {
      return val.toUpperCase()
    }
  }
}
</script>

<style>
</style>