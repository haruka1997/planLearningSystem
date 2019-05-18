module.exports.moduleInit = function(){

    var modules = {};
    // カレンダーセットモジュール
    modules.calenderItemSet = require(`./calenderItemSet.js`);

    // Ajaxモジュール
    modules.ajax = require(`./ajax.js`);

    // jquery
    modules.$ = require('jquery');
    // chart.js
    modules.Chart = require('chart.js');

    // header
    modules.header = require('../header.js');

    return modules;

}