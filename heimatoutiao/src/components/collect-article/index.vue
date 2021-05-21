<template>
  <van-button
    :icon="value ? 'star':'star-o'"
    :class="{collected:value}"
    :loading="loading"
    @click="onCollect"
  />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'ColloectArticle',
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  watch: {},
  computed: {},
  created () { },
  mounted () { },
  methods: {
    async onCollect () {
      this.loading = true
      try {
        // 已收藏，就取消收藏
        if (this.value) {
          await deleteCollect(this.articleId)
        } else {
          // 反之，就添加收藏
          await addCollect(this.articleId)
        }
        // 传给父组件，更新试图
        this.$emit('input', !this.value)

        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast('操作失败，请重试！')
      }
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
