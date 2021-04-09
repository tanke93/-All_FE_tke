$(function () {
  getGoodsInfo();
  function getGoodsInfo () {
    let now_id = parseInt(window.location.search.substr(1))
    console.log();
    $.ajax({
      method: 'get',
      url: 'http://shop.meilian.info/api/goods/getinfo',
      data: {
        id: now_id
      },
      success: res => {
        if (res.code !== 2000) return
        console.log(res);
        var htmlStr = template('goods-Info', res.data)
        $('.aui-scrollView').html(htmlStr)
      }
    })
  }
})