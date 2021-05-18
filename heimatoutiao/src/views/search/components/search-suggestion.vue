<template>
  <div class="search-suggestion">
    <van-cell :title="text" icon="search" v-for="(text,index) in suggestions" :key="index"
      @click="$emit('search', text)">
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash';
export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []//联想建议数据列表
    }
  },
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.loadgetSearchSuggestions(value)
      }, 200),
      immediate: true
    }
  },
  computed: {},
  created () {

  },
  mounted () { },
  methods: {
    async loadgetSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    highlight (text) {
      const highlightStr = `<span class='active'>${this.searchText}</span>`
      // RegExp 正则表达式构造函数
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
};
</script>
<style lang="less" scoped>
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>