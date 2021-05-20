<template>
  <van-button :icon="value ===1 ? 'good-job':'good-job-o'" :class="{liked :value === 1}" :loading="loading"
    @click="onCollect" />
</template>

<script>
import { addLike, deleteLike } from "@/api/article";
export default {
  name: "LikeArticle",
  components: {},
  props: {
    value: {
      type: [Number],
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
        let status = -1
        if (this.value === 1) {
          //已点赞，则取消点赞
          await deleteLike(this.articleId)
        } else {
          //未点赞，则添加点赞
          await addLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast('操作失败，请重试！')
      }
      this.loading = false
    }
  }
};
</script>
<style lang="less" scoped>
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>