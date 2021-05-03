<template>
  <footer class="footer">
    <span class="todo-count">剩余<strong>{{count}}</strong>件</span>
    <ul class="filters">
      <li>
        <a :class="{selected:isSel==='all'}" href="javascript:;" @click="isSel='all'">全部</a>
      </li>
      <li>
        <a :class="{selected:isSel==='no'}" href="javascript:;" @click="isSel='no'">未完成</a>
      </li>
      <li>
        <a :class="{selected:isSel==='yes'}" href="javascript:;" @click="isSel='yes'">已完成</a>
      </li>
    </ul>
    <button class="clear-completed">清除已完成</button>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      isSel: 'all'
    }
  },
  // 5.0 props定义
  props: ['farr'],
  // 5.1 计算属性 - 任务数量
  computed: {
    count () {
      return this.farr.length
    }
  }
}
</script>