<template>
  <div id="app">
    <div class="container">
      <!-- 顶部框模块 -->
      <div class="form-group">
        <div class="input-group">
          <h4>品牌管理</h4>
        </div>
      </div>

      <!-- 数据表格 -->
      <table class="table table-bordered table-hover mt-2">
        <thead>
          <tr>
            <th>编号</th>
            <th>资产名称</th>
            <th>价格</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='(v,i) in list' :key='v.id'>
            <td>{{v.id}}</td>
            <td>{{v.name}}</td>

            <!-- 如果价格超过100，就有red这个类 -->
            <td :class="{red: v.price > 100}">{{v.price}}</td>
            <td>{{v.time}}</td>
            <td><a href="javascript:;" @click.prevent="delItem(i)">删除</a></td>
          </tr>
        </tbody>

        <tfoot v-if="list.length === 0">
          <tr>
            <td colspan="5" style="text-align: center">暂无数据</td>
          </tr>
        </tfoot>

      </table>

      <!-- 添加资产 -->
      <form class="form-inline">
        <div class="form-group">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="资产名称" v-model="name" />
          </div>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <div class="form-group">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="价格" v-model.number="price" />
          </div>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <!-- 阻止表单提交 -->
        <button class="btn btn-primary" @click.prevent="addItem">添加资产</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      name: "", // 名称
      price: 0, // 价格
      list: [
        { id: 100, name: "外套", price: 199, time: new Date('2010-08-12') },
        { id: 101, name: "裤子", price: 34, time: new Date('2013-09-01') },
        { id: 102, name: "鞋", price: 25.4, time: new Date('2018-11-22') },
        { id: 103, name: "头发", price: 19900, time: new Date('2020-12-12') }
      ],
    };
  },
  methods: {
    addItem () {
      if (this.name.trim().length === 0 || this.price === 0) {
        alert('资产名称或价格不能为空!')
        return
      }
      let id = this.list.length === 0 ? 100 : Math.max(...this.list.map(v => v.id)) + 1
      // let id = this.list.length === 0 ? 100 : this.list[this.list.length - 1].id - 1

      this.list.push({
        id: id,
        name: this.name,
        price: this.price,
        time: new Date()
      })
    },
    delItem (i) {
      console.log(i);
      this.list.splice(i, 1)
    }
  }

};
</script>

<style scope>
.red {
  color: red;
}
</style>