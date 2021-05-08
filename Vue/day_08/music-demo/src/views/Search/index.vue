<template>
  <div>
    <van-search class="border0" v-model="value" shape="round" placeholder="输入要搜索的关键词" @input="inputFn"></van-search>
    <div class="search_wrap" v-if="resultList.length === 0">
      <p class="hot_title">热门搜索</p>
      <div class="hot_name_wrap">
        <span class="hot_item" v-for="(obj,index) in hotArr" :key="index" @click="fn(obj.first)">{{obj.first}}</span>
      </div>
    </div>
    <div class="search_wrap" v-else>
      <p class="hot_title">最佳匹配</p>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <SongItem v-for="obj in resultList" :key="obj.id" :name="obj.name" :author="obj.ar[0].name" :album="obj.al.name"
          :id="obj.id">
        </SongItem>
      </van-list>
    </div>
  </div>
</template>

<script>
//铺设搜索关键词
//在定义methods里getListFn方法
import { hotSearchAPI, searchResultListAPI } from '@/api';
import SongItem from '@/components/SongItem'
export default {
  data () {
    return {
      value: "",//搜索关键字
      hotArr: [],//热搜关键字
      resultList: [],//搜索结果
      loading: false,//加载中 只有为false,才能触底后触发onload方法
      finished: false,
      page: 1
    }
  },
  async created () {
    const res = await hotSearchAPI()
    console.log(res);
    this.hotArr = res.data.result.hots
  },
  methods: {
    async getListFn () {
      return await searchResultListAPI({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20
      })
    },
    async fn (val) {
      this.page = 1
      this.value = val
      // console.log(this.getListFn());
      const res = await this.getListFn()
      console.log(res);
      this.resultList = res.data.result.songs
    },
    async inputFn () {
      this.page = 1
      if (this.value.length === 0) {
        this.resultList = []
        return
      }
      const res = await this.getListFn()
      this.resultList = res.data.result.songs
    },
    async onLoad () {//触底事件(加载下一页数据) 数据会自动把loading改为true
      this.page++
      const res = await this.getListFn()
      if (res.data.result.songCount === 0) {
        this.finished = true
        return
      }
      this.resultList = [...this.resultList, ...res.data.result.songs]
      this.loading = false //手动改回false
    }
  },
  components: {
    SongItem
  }
}
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
</style>