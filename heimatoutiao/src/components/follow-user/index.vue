<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    :loading="loading"
    @click="onFollow"
  >已关注</van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow"
  >关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  components: {},
  model: {
    //自定义v-model的名称
    prop: 'isFollowed', //默认是value
    event: 'update-is_followed', //默认是input
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async onFollow() {
      this.loading = true
      try {
        if (this.isFollowed) {
          //已关注 取消关注
          await deleteFollow(this.userId)
        } else {
          //没有关注 添加关注
          await addFollow(this.userId)
        }
        // this.article.is_followed = !this.article.is_followed
        // this.$emit('update-is_followed', !this.value)
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (error) {
        let message = '操作失败，请重试！'
        if (error.response && error.response.status === 400) {
          message = '你不能关注你自己！'
          this.$toast(message)
        } else if (error.response.status === 401) {
          this.$toast('登录时长过长，您需重新登录！')
        } else {
          this.$toast(message)
        }
      }
      this.loading = false
    },
  },
}
</script>
<style lang="less" scoped>
</style>