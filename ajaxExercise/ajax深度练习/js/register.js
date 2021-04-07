$(function () {
  $('form').submit(function (e) {
    e.preventDefault()
    const dataArray = $(this).serializeArray()

    // 方法一
    // let formData = {}
    // dataArray.forEach(item => {
    //   formData[item.name] = item.value
    // })
    // console.log(formData);//{username: "123", email: "123@qq.com", password: "123", repassword: "123"}
    // console.log(dataArray);

    // 方法二
    // let formData = dataArray.reduce((prev, cur) => {
    //   return { ...prev, [cur.name]: cur.value }
    // }, {})


    let formData = dataArray.reduce((prev, cur) => ({ ...prev, [cur.name]: cur.value }), {})
    // console.log(formData);

    // 归纳
    //   prev = {}
    //   ...prev =
    //   cur = { name: 'username', value: 'xxxx' }
    //   return { 'username'：xxxx }
    // ------
    //   prev = {  }
    // cur = { name: 'email', value: 'xxxx@qq.coim' }
    // return { 'username'：xxxx， email: 'xxx@qq.com' }
    // ----
    //   prev = { 'username'：xxxx， email: 'xxx@qq.com' }
    // cur = { name: 'password', value: 'qwe123' }
    // return { 'username'：xxxx， email: 'xxx@qq.com', password： 'qwe123' }

    if (formData.username.trim() === '') {
      alert('用户名未输入！')
    } else if (!/^\w{2,8}$/.test(formData.username.trim())) {
      alert('用户名格式不正确！')
    } else if (formData.email.trim() === '') {
      alert('邮箱未填写！')
    } else if (formData.password.trim() === '') {
      alert('密码不能为空！')
    } else if (!/^.{6,16}$/.test(formData.password)) {
      alert('密码格式不正确')
    } else if (formData.password.trim() !== formData.repassword.trim()) {
      alert('两次密码输入不一致')
    } else {
      $.ajax({
        method: 'post',
        url: 'http://shop.meilian.info/api/member/register',
        data: formData,
        success: function (res) {
          console.log(res);
          if (res.code !== 2000) return alert('注册失败！')
          alert('注册成功！')
          location.href = './login.html'
        }
      })
    }
  })
})