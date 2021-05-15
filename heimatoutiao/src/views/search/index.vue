<template>
  <div class="search-container">
    <form action="/">
      <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" shape="round" background="#3296fa"
        @search="onSearch" @cancel="onCancel" />
    </form>
    <!-- 历史记录 -->
    <!-- 搜索历史记录 -->
    <!-- 联想建议 -->
  </div>
</template>

<script>
export default {
  name: 'SearchIndex',
  components: {},
  props: {},
  data () {
    return {
      searchText: ''
    }
  },
  watch: {},
  computed: {},
  created () { },
  mounted () { },
  methods: {
    onSearch (val) {
      console.log(val);
    },
    onCancel () {
      this.$router.back()
    },
  }
};
</script>
<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>