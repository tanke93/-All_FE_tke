<template>
  <div>
    <span>全选:</span>
    <input type="checkbox" v-model="isAll" />
    <button @click="btn">反选</button>
    <ul>
      <li v-for="(obj,index) in arr" :key="index">
        <input type="checkbox" v-model="obj.c" />
        <span>名字</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      arr: [
        {
          name: "猪八戒",
          c: false,
        },
        {
          name: "孙悟空",
          c: false,
        },
        {
          name: "唐僧",
          c: false,
        },
        {
          name: "白龙马",
          c: false,
        }
      ]
    }
  },
  computed: {
    isAll: {
      set (val) {
        // 7. 全选框 - 选中状态(true/false)
        this.arr.forEach(obj => obj.c = val)
      },
      get () {
        // 6. 统计小选框状态 ->  全选状态
        // every口诀: 查找数组里"不符合"条件, 直接原地返回false
        return this.arr.every(obj => obj.c === true)
      }
      // return this.arr.every({ c } => c)
    }
  },
  methods: {
    btn () {
      // return this.arr.every(o => o.c)
      this.arr.forEach(obj => obj.c = !obj.c)
    }
  }
}
</script>

<style>
</style>