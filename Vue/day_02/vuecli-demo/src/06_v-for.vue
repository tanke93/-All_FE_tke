<template>
  <div>
    <ul>
      <li v-for="(v,i) in arr" :key="i">
        {{v}}
      </li>
    </ul>
    <button @click="add">新增</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      arr: ['一', '二', '三']
    }
  },
  methods: {
    add () {
      this.arr.splice(1, 0, '新的')
    }
  }
}
</script>

<style>
</style>