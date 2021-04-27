<template>
  <div>
    <h1>{{msg}}</h1>
    <h2>{{obj.name}}</h2>
    <h3>{{obj.age > 18 ? '成年' : '未成年'}}</h3>
    <!-- <a v-bind:href="url">百度</a> -->
    <a :href=url>百度</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello Vue',
      obj: {
        name: '小小v',
        age: 5
      },
      url: 'http://www.baidu.com'
    }
  }
}
</script>

<style>
</style>
