import $ from 'jquery'

import '../src/css/index.css'

import '../src/less/index.less'

$('#ulId li:odd').css('backgroundColor', '#eee')
$('#ulId li:even').css('backgroundColor', '#aaa')

//书写高版本的js语法
const fn = () => { console.log('一个箭头函数'); }
console.log(fn);
