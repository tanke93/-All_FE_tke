import $ from 'jquery'

import '../src/css/index.css'

import '../src/less/index.less'

$('#ulId li:odd').css('backgroundColor', '#eee')
$('#ulId li:even').css('backgroundColor', '#aaa')


// 8. 引入字体图标样式文件
import "./assets/fonts/iconfont.css"
let theI = document.createElement("i")
theI.className = "iconfont icon-qq"
document.body.appendChild(theI)
