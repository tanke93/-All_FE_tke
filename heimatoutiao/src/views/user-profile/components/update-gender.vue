<template>
  <div class="update-gender">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onPickerchange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  watch: {},
  computed: {},
  created () { },
  mounted () { },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const localGender = this.localGender

        await updateUserProfile({
          gender: localGender
        })
        // 更新试图
        this.$emit('input', localGender)
        // 关闭弹层
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast('更新失败')
      }
    },
    onPickerchange (picker, value, index) {
      this.localGender = index
    }
  }
}
</script>
<style lang="less" scoped>
</style>
