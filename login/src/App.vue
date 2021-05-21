<template>
  <div id="app">
    <el-card class="login-card">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        style="margin-top:50px"
      >
        <el-form-item prop="mobile">
          <el-input
            v-model="loginForm.mobile"
            placeholder="请输入您的手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入您的手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width:100%"
            type="primary"
            @click="login"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  },
  data () {
    const checkMobile = function (rule, value, callback) {
      value.charAt(3) === 9 ? callback() : callback(new Error('手机号第三位必须是9'))
    }
    return {
      // 数据对象
      loginForm: {
        // 校验字段
        mobile: '',
        password: ''
      },
      // 校验规则
      loginRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空',
          trigger: 'blur'
        }, {
          pattern: /^1[3-9]\d{9}$/,
          message: '输入的手机格式不正确',
          trigger: 'blur '
        }, {
          trigger: 'blur',
          validator: checkMobile
        }],
        password: [{
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        }, {
          min: 6,
          max: 16,
          message: '密码应为6-16位的长度',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    login () {
      // this.$refs.loginForm.validator(isOk => {
      //   if (isOk) {
      //     // 表示 校验通过
      //     console.log('校验通过');
      //   }
      // })
      this.$refs.loginForm.validator().then(() => {
        console.log('成功');
      }).catch(() => {
        console.log('失败');
      })
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
  background-color: pink;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-card {
  width: 440px;
  height: 370px;
}
</style>
