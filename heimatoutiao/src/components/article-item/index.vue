<template>
  <van-cell class="article-item">
    <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
    <div slot="label">
      <div v-if="article.cover.type===3" class="cover-wrap">
        <div class="cover-item" v-for="(img,index) in article.cover.images" :key="index">
          <van-image class="cover-item-img" :src="img" fit="cover"></van-image>
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <van-image class="right-cover" v-if="article.cover.type===1" fit="cover" slot="default"
      :src="article.cover.images[0]">
    </van-image>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
  }
  .label-info-wrap span:nth-child(2) {
    margin: 0 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px;
    .cover-item {
      flex: 1;
      height: 146px;
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
    .cover-item:nth-child(2) {
      padding: 0 4px;
    }
  }
}
</style>