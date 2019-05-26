// モジュール設定
var modules = require('./module/moduleInit.js');
modules = modules.moduleInit();

var $ = modules.$; //jquery

$(function(){
    // カレンダー表示
    modules.initCalenderHtml.init($);
});