$(function () {
  $('.login-btn').on('click', function (e) {
    e.preventDefault();
    const loginDataArray = $('form').serializeArray()
    let formData = loginDataArray.reduce((prev, cur) => ({ ...prev, [cur.name]: cur.value }), {})
    console.log(formData);
    if (formData.username.trim() === '') {
      alert('用户名不能为空！')
    } else if (!/^\w{2,8}$/.test(formData.username.trim())) {
      alert('用户名格式不正确，请重新输入！')
    } else if (formData.password.trim === '') {
      alert('密码不能为空！')
    } else if (!/^.{6,16}$/.test(formData.password)) {
      alert('密码格式不正确，请重新输入！')
    } else {
      $.ajax({
        method: 'post',
        url: 'http://shop.meilian.info/api/member/login',
        data: formData,
        success: function (res) {
          console.log(res);
          if (res.code !== 2000) return alert('登录失败！')
          alert('登陆成功！')
          localStorage.setItem('token', res.jwt)
          location.href = './goodsList.html'
        }
      })
    }
  })
})
