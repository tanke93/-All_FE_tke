<template>
  <div>
    <h1>生命周期</h1>
    <Life v-if="show"></Life>
    <button @click="show=false">销毁组件</button>
  </div>
</template>

<script>
import Life from './components/Life';
export default {
  data () {
    return {
      show: true
    }
  },
  component: {
    Life
  }
}
</script>

<style>
</style>