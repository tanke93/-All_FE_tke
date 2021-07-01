<template>
  <!-- file-list是上传的文件列表 可以绑定到上传组件上 让上传组件来显示 -->
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="upload"
      :file-list="fileList"
      :class="{disabled : fileComputed}"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress
      v-if="showPercent"
      style="width:180px"
      :percentage="percent"
    />
    <el-dialog
      title="图片预览"
      :visible.sync="showDialog"
    >
      <img
        :src="imgUrl"
        style="width:100%"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
import Cos from 'cos-js-sdk-v5' // 引入腾讯云cos包
// 实例化Cos对象
const cos = new Cos({
  SecretId: 'AKID1vb3HL8h28zc1B6mCNJ0RedOuEJAnBLG', // 身份识别
  SecretKey: 'kFYdU6TcYGk14tUqxpTs53mGVVGm49za' // 身份密钥
})
export default {
  data () {
    return {
      fileList: [],
      showDialog: false,
      imgUrl: '',
      currentFileUid: null,
      percent: 0,
      showPercent: false // 默认不显示进度条
    }
  },
  computed: {
    fileComputed () {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview (file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
      // this.fileList = fileList
    },
    changeFile (file, fileList) {
      // file是当前的文件 fileList是当前的最新数组
      this.fileList = fileList.map(item => item)
      // 此处上传成功依赖于后续上传腾讯云COS(后台)成功，数据才能进来
    },
    beforeUpload (file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是JPG,GIF,BMP,PNG格式')
        return false
      }
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      // 已经确定当前上传的就是当前的这个file
      this.currentFileUid = file.uid
      this.showPercent = true // 显示进度条
      return true
    },
    upload (params) {
      console.log(params.file)
      if (params.file) {
        cos.putObject({
          Bucket: 'rzzt-1306163005', // 存储桶
          Region: 'ap-chongqing', // 地域
          Key: params.file.name, // 文件名
          Body: params.file, // 要上传的文件对象
          StorageClass: 'STANDARD', // 上传的模式类型(默认)
          onProgress: (params) => {
            // console.log(params)
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          // console.log(err || data)
          if (!err && data.statusCode === 200) {
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                // 讲成功的地址赋值给原来的url属性
                return { url: 'http://' + data.Location, upload: true }
                // upload为true 表示这张图片已经上传成功 此处为后续应用做是否保存的标记
              }
              return item
            })
            // 将上传成功的地址 回写到fileList中 fileList一旦变化 upload组件 就会根据fileList的变化而去渲染视图
            // 关闭进度条
            // 重置百分比
            setTimeout(() => {
              this.showPercent = false
              this.percent = 0
            }, 1000)
          }
        })
      }
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>
