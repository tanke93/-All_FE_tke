<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <comment-item v-for="(item,index) in list" :key="index" :comment="item" />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  components: {
    CommentItem,
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null, //下一页数据的标记
      limit: 10,
    }
  },
  watch: {},
  computed: {},
  created() {
    this.onLoad()
  },
  mounted() {},
  methods: {
    // 1、请求获取数据
    async onLoad() {
      try {
        const { data } = await getComments({
          type: 'a', //  评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source,
          offset: this.offset,
          limit: this.limit,
        })
        // 2、将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)

        this.$emit('onload-success', data.data)
        // 3、将loading设置为false
        this.loading = false
        // 4、判断是否还有数据
        // 有就更新获取下一页的数据页码
        // 没有就将finished设置true结束
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        this.$toast('数据获取失败，请稍后重试！')
      }
    },
  },
}
</script>
<style lang="less" scoped>
</style>