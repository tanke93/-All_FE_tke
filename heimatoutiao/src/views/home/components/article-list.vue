<template>
  <div class="article-list">
    <van-pull-refresh v-model="isreFreshLoading" :success-text="refreshSuccessText" :success-duration="1500"
      @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error"
        error-text="未知错误，点击重新加载" @load="onLoad">
        <article-item v-for="(article,index) in list" :key="index" :article="article"></article-item>
        <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article';
import ArticleItem from '@/components/article-item';
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [],//存储列表数据的数组
      loading: false,
      finished: false,
      timestamp: null, //请求获取下一页的时间戳
      error: false,//控制列表加载失败的提示状态
      isreFreshLoading: false, //控制下拉刷新的loading状态
      refreshSuccessText: '刷新成功'
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {//1、请求获取数据
    //2、把请求结果数据放到list数组中
    //3、本次数据加载结束后把加载状态设置为结束
    //4、判断数据是否全部加载完成
    async onLoad () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,//频道id
          timestamp: this.timestamp || Date.now() //时间戳
        })

        // 模拟报错
        // if (Math.random() > 0.5) {
        //   JSON.parse('sdfsdf')
        // }
        console.log(data);
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          //更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        // console.log('请求失败', error);
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        //请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,//频道id
          timestamp: Date.now() //下拉刷新，每次请求获取最新数据,故传递最新时间戳
        })
        //模拟失败
        if (Math.random() > 0.4) {
          JSON.parse('sdfsdf')
        }
        //2、将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)
        //关闭下拉刷新的loading状态
        this.isreFreshLoading = false

        this.refreshSuccessText = `刷新成功,更新了${results.length}条数据`
      } catch (error) {
        this.isreFreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }

    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  // height: 79vh;
  height: calc(100vh - 274px);
  overflow-y: auto;
}
</style>