module.exports.moduleInit = function(){

    var modules = {};

    // CSS
    require('./../../lib/material.min.css');
    require('./../../lib/bootstrap.min.css');
    require('./../../lib/propeller.min.css');
    require('./../../css/login.css');
    require('./../../css/main.css');
    require('./../../css/calender.css');

    // JS
    require('./../../lib/material.min.js');


    // カレンダーセットモジュール
    modules.calenderItemSet = require(`./calenderItemSet.js`);

    // jquery
    modules.$ = require('jquery');

    // chart.js
    modules.Chart = require('chart.js');
  

    // loginConfirm
    if(window.location.href.split('/').pop() !== 'login.html'){
        let loginConfirm = require('./loginConfirm.js');
        loginConfirm.confirm();
    }

    // initCalenderHtml
    modules.initCalenderHtml = require('./initCalenderHtml.js');

    modules.setChartItem = require('./setChartItem.js');

    return modules;

}