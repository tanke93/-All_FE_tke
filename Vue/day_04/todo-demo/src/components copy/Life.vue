<template>
  <div>
    <p>生命周期</p>
    <p id="myP">{{msg}}</p>
    <ul id="myUl">
      <li v-for="(val,index) in arr" :key="index">
        {{val}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'hello vue',
      arr: [2, 4, 6, 8],

    }
  },
  beforeCreate () {
    console.log("beforeCreate -- 执行");
    console.log(this.msg); // undefined
  },
  created () {
    console.log("created -- 执行");
    console.log(this.msg); // hello, Vue
  }
}
</script>

<style>
</style>