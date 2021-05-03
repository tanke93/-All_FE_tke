<template>
  <div>
    <!-- 目标: 子传父 -->
    <!-- 1. 父组件, @自定义事件名="父methods函数" -->
    <sonToFather v-for="(obj, ind) in list" :key="obj.id" :title="obj.proname" :price="obj.proprice" :intro="obj.info"
      :index="ind" @subprice="fn"></sonToFather>
  </div>
</template>

<script>

import sonToFather from './components/sonToFather'
export default {
  data () {
    return {
      list: [
        {
          id: 1,
          proname: "超级好吃的棒棒糖",
          proprice: 18.80,
          info: "开业大酬宾, 全场8折",
        },
        {
          id: 2,
          proname: "超级好吃的大鸡腿",
          proprice: 34.20,
          info: "好吃不腻, 快来买啊",
        },
        {
          id: 3,
          proname: "超级无敌的冰激凌",
          proprice: 14.20,
          info: "炎热的夏天, 来个冰激凌了",
        },
      ],
    };
  },
  components: {
    sonToFather
  },
  methods: {
    fn (inde, price) {
      // 逻辑代码
      this.list[inde].proprice > 1 && (this.list[inde].proprice = (this.list[inde].proprice - price).toFixed(2))
    }
  }
};
</script>

<style>
</style>