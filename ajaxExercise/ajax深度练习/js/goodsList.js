$(function () {
  let page = 1
  getGoodsList(page);
  //搜索
  $('#search_input').keypress(function (e) {
    let keywords = $(this).val()
    if (e.keyCode == 13) {
      getGoodsList(page, keywords);
    }
  })
  //上一页
  $('.aui-pagination-next').click(function () {
    let page_MaxNum = $('#aui_page').html()
    if (page < page_MaxNum) {
      $(this).removeClass('disabled')
      page++;
      getGoodsList(page);
    } else {
      $(this).addClass('disabled')
      $('.aui-pagination-next').attr("disabled");
    }
  })
  //下一页
  $('.van-icon-arrow-left').click(function () {
    if (page > 1) {
      $(this).removeClass('disabled')
      page--;
      getGoodsList(page);
    } else {
      $(this).addClass('disabled')
      $('.aui-pagination-next').attr("disabled");
    }
  })

  $('.aui-list-theme-box').on('click', '.aui-list-theme-img', function () {
    let this_id = $(this).parents('a').attr('data-id');
    $.ajax({
      method: 'get',
      url: 'http://shop.meilian.info/api/goods/getinfo',
      data: {
        id: this_id
      },
      success: res => {
        if (res.code !== 2000) return
        window.location.replace('./goodsInfo.html' + '?' + this_id)
      }
    })
  })


  function getGoodsList (dqpage, keywords) {
    $.ajax({
      method: 'get',
      url: 'http://shop.meilian.info/api/goods/getlist',
      data: {
        page: dqpage,
        search: keywords
      },
      success: function (res) {
        if (dqpage >= 2) {
          res.data.forEach(v => {
            v.fileurl = '/uploads/1.jpg'
          });
        }
        let page_str = `${res.page.pageNo}/<span id='aui_page'>${res.page.pageCount}</span>,共${res.page.total}件商品`
        $('.aui-pagination-page').html(page_str)
        // console.log(res);
        var htmlStr = template('goods-List', res)
        $('.aui-list-theme-box').html(htmlStr)
      }
    })
  }
  let token = localStorage.getItem('token')
  //添加购物车

  $('.aui-list-theme-box').on('click', '.aui-coupon', function () {
    let goods_id = $(this).parents('.aui-list-item').attr('data-id');
    let goods_price = parseInt($(this).siblings('.aui-flex-box').find('span').html());
    $.ajax({
      method: 'GET',
      url: 'http://shop.meilian.info/api/cart/add',
      data: {
        gid: goods_id,
        price: goods_price
      },
      headers: { Authorization: 'Bearer ' + token },
      success: function (res) {
        if (res.code !== 4303) return alert('添加购物车失败！')
        alert('购物车添加商品成功！')
      }
    })

  })
  // 跳转购物车
  $('#shopping_cart').on('click', function () {
    // alert(11)
    $.ajax({
      method: 'get',
      url: 'http://shop.meilian.info/api/cart/getlist',
      headers: { Authorization: 'Bearer ' + token },
      success: function (res) {
        location.href = './cart.html'
      }
    })
  })
})