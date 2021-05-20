<template>
  <div class="search-container">
    <form class="search-form" action="/">
      <van-search v-model.trim="searchText" show-action placeholder="请输入搜索关键词" shape="round" background="#3296fa"
        @search="onSearch" @cancel="onCancel" @focus="isResultShow = false" />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :searchText="searchText" />
    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :searchText="searchText" @search="onSearch" />
    <!-- 历史记录 -->
    <search-history v-else :search-histories="searchHistories" @clear-search-histories="clearSearchHistories"
      @search="onSearch" ref="child" />
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'
import { setItem, getItem } from '@/utils/storage'
import { Dialog } from 'vant'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion,
    [Dialog.Component.name]: Dialog.Component,
  },
  props: {},
  data () {
    return {
      searchText: "",
      isResultShow: false,
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [] //搜索的历史记录
    }
  },
  watch: {
    searchHistories (value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {
    onSearch (val) {
      if (val.trim() == '') {
        this.$toast('搜索内容不能为空！')
        this.searchText = ''
        return
      }
      this.searchText = val.trim()
      //存储搜索历史记录

      // const index = this.searchHistories.indexOf(val)
      // if (index !== -1) {
      //   this.searchHistories.splice(index, 1)
      // }
      // this.searchHistories.unshift(val)
      this.searchHistories = [...new Set([val.trim(), ...this.searchHistories])]

      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    },
    clearSearchHistories () {
      Dialog.confirm({
        message: '确定要清空记录吗？',
      }).then(() => {
        this.searchHistories = []
        this.$refs.child.isDeleteShow = false
      })
    }
  }
};
</script>
<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    background-color: #3296fa;
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>