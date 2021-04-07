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
      page++;
      getGoodsList(page);
    } else {
      $('.aui-pagination-next').attr("disabled");
    }
  })
  //下一页
  $('.van-icon-arrow-left').click(function () {
    if (page > 1) {
      page--;
      getGoodsList(page);
    } else {
      $('.aui-pagination-next').attr("disabled");
    }
  })

  $('.aui-list-theme-box').on('click', 'a', function () {
    let this_id = $(this).attr('data-id');
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
        console.log(res);
        var htmlStr = template('goods-List', res)
        $('.aui-list-theme-box').html(htmlStr)
      }
    })
  }
})