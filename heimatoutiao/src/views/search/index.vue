<template>
  <div class="search-container">
    <form action="/">
      <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" shape="round" background="#3296fa"
        @search="onSearch" @cancel="onCancel" @focus="isResultShow = false" />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :searchText="searchText" />
    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :searchText="searchText" @search="onSearch" />
    <!-- 历史记录 -->
    <search-history v-else />
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  props: {},
  data () {
    return {
      searchText: "",
      isResultShow: false
    }
  },
  watch: {},
  computed: {},
  created () { },
  mounted () { },
  methods: {
    onSearch (val) {
      this.searchText = val
      this.isResultShow = true
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