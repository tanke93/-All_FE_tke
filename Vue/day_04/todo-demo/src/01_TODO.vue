<template>
  <div class='todoapp'>
    <TodoHeader @create="createFn"></TodoHeader>
    <TodoMain :arr="list" @del="deleteFn"></TodoMain>
    <TodoFooter :farr="list"></TodoFooter>
  </div>
</template>

<script>
import "./styles/base.css"
import "./styles/index.css"
import TodoHeader from './components/TodoHeader';
import TodoMain from "./components/TodoMain";
import TodoFooter from "./components/TodoFooter";
export default {
  data () {
    return {
      list: [
        { id: 100, name: "吃饭", isDone: true },
        { id: 201, name: "睡觉", isDone: false },
        { id: 103, name: "打豆豆", isDone: true },
      ],
    };
  },
  components: {
    TodoHeader,
    TodoMain,
    TodoFooter
  },
  methods: {
    createFn (taskName) {
      let id = this.list.length == 0 ? 100 : this.list[this.list.length - 1].id + 1
      this.list.push({
        id: id,
        name: taskName,
        isDone: false
      })
    },
    deleteFn (ind) {
      this.list.splice(ind, 1)
    }
  }
}
</script>

<style>
</style>