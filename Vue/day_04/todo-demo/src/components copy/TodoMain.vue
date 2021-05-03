<template>
  <ul class="todo-list">
    <!-- completed: 完成的类名 -->
    <li :class="{completed: o.isDone}" v-for="(o,i) in arr" :key='o.id'>
      <div class="view">
        <input class="toggle" type="checkbox" v-model="o.isDone" />
        <label>{{o.name}}</label>
        <button @click="delFn(i)" class="destroy"></button>
      </div>
    </li>
  </ul>

</template>

<script>
export default {
  props: ["arr"],
  methods: {
    delFn (index) {
      this.$emit('del', index)
    }
  }
}
</script>