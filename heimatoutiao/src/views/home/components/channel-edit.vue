<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        @click="isShow = !isShow"
        plain
        round
        size="mini"
      >{{ isShow?'完成':'编辑' }}</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10" :column-num="3">
      <van-grid-item
        class="grid-item"
        v-for="(channel,index) in myChannels"
        :key="channel.id"
        @click="onMyChannelClick(channel ,index)"
      >
        <van-icon v-show="isShow && !fiexdChannels.includes(channel.id)" slot="icon" name="clear"></van-icon>
        <span class="text" :class="{active:active === index}" slot="text">{{channel.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10" :column-num="3">
      <van-grid-item
        class="grid-item"
        v-for="(channel,index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      require: true,
    },
    active: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      allChannels: [], //所有频道
      isShow: false,
      fiexdChannels: [0],
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      // 方法二
      return this.allChannels.filter((channel) => {
        return !this.myChannels.find((myChannel) => {
          return myChannel.id === channel.id
        })
      })
      // 方法一
      // const channels = []
      // this.allChannels.forEach(channel => {
      //   const ret = this.myChannels.find(myChannel => {
      //     return myChannel.id === channel.id
      //   })

      //   if (!ret) {
      //     channels.push(channel)
      //   }
      // });
      // return channels
    },
  },
  created() {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
        console.log(data)
      } catch (error) {
        this.$toast('数据获取失败')
      }
    },
    async onAddChannel(channel) {
      this.myChannels.push(channel)
      // 数据持久化
      if (this.user) {
        try {
          await addUserChannel({
            id: channel.id, //频道ID
            seq: this.myChannels.length, //序号
          })
        } catch (error) {
          this.$toast('保存失败，请稍后重试')
        }
      } else {
        //未登录，把数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick(channel, index) {
      if (this.isShow) {
        if (this.fiexdChannels.includes(channel.id)) {
          return
        }
        //删除频道项
        this.myChannels.splice(index, 1)
        //编辑状态 执行删除
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }

        this.deleteChannel(channel)
      } else {
        // 非编辑状态执行频道切换
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel(channel) {
      try {
        if (this.user) {
          await deleteUserChannel(channel.id)
        } else {
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (error) {
        this.$toast('操作失败,请稍后重试')
      }
    },
  },
}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 85px;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.grid-item {
    min-width: 160px !important;
    height: 86px;
    .van-grid-item__content {
      font-size: 26px;
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 26px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/.my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/.recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 4px;
        }
      }
    }
  }
}
</style>