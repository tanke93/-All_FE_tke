<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <PageTools :show-before="true">
      <!-- 写法一 -->
      <!-- <span slot="before">123</span> -->
      <!-- 写法二 -->
      <!-- slot="名称" v-slot:名称 -->
      <template v-slot:before>
        <span>123</span>
      </template>
      <el-button
        slot="after"
        type="primary"
      >导入excel</el-button>
    </PageTools>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import PageTools from '@/components/PageTools'

export default {
  name: 'Dashboard',
  components: {

  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
