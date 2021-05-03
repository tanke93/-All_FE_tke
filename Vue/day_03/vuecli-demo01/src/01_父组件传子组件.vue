<template>
  <div>
    <Product title="好吃的口水鸡" price="50" intro="开业大酬宾, 全场8折"></Product>
    <Product title="好可爱的可爱多" price="20" intro="老板不在家, 全场1折"></Product>
    <Product title="好贵的北京烤鸭" price="290" :intro="str"></Product>
  </div>
</template>

<script>
import Pannel from './components/pannel_01'
export default {
  component: {
    Pannel1: Pannel
  }
}
</script>

<style>
</style>