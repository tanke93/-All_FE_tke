<template>
  <div>
    <p>你要买商品的数量: {{count}}</p>
    <button v-on:click='count=count+1'>加一</button>
    <button v-on:click='addFn'>自增</button>
    <button v-on:click='addCountFn(5)'>自加5</button>
    <button @click='subFn'>自减</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 1,
    }
  },
  methods: {
    addFn () {
      this.count++
    },
    addCountFn (num) {
      this.count += num
    },
    subFn () {
      this.count--
    }
  }
}
</script>

<style>
</style>