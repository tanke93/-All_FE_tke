<template>
  <div>
    <p id='hehe' :class="classArr">这是一段文字</p>

    <button @click="choiceClass">hehe</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      classArr: ['red', 'pink']
    }
  },
  methods: {
    choiceClass () {
      this.classArr.push('blue')

      // var p = document.querySelector('#hehe')
      // console.log(p.outerHTML);

      return this.classArr
    }
  }
}
</script>

<style scope>
.red {
  color: red;
}
.pink {
  background-color: pink;
  /* color: pink; */
}
.blue {
  font-size: 24px;
}
</style>