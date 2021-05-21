<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      @load="onLoad"
    >
      <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false,
    }
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearchResult({
          page: this.page, //页码
          per_page: this.perPage, //每页数据条数
          q: this.searchText, //查询关键字
        })

        // if (Math.random() > 0.5) {
        //   JSON.parse('addasdsa')
        // }
        const { results } = data.data
        this.list.push(...results)

        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = false
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },
  },
}
</script>
<style lang="less" scoped>
</style>