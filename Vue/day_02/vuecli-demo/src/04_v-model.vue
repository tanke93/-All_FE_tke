<template>
  <div>
    <span>用户名：</span>
    <input type="text" v-model="username"><br>
    <span>密码：</span>
    <input type="password" v-model="password">
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '1',
      password: ''
    }
  },
  methods: {

  }
}
</script>

<style>
</style>