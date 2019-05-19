module.exports.moduleInit = function(){

    var modules = {};

    // CSS
    require('./../../lib/material.min.css');
    require('./../../lib/materialIcons.css');
    require('./../../lib/bootstrap.min.css');
    require('./../../lib/propeller.min.css');
    require('./../../css/planCreate.css');
    require('./../../css/learningRecord.css');
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
    let loginConfirm = require('./loginConfirm.js');
    loginConfirm.confirm();

    // header
    let header = require('./header.js');
    header.init(modules.$);

    // initCalenderHtml
    modules.initCalenderHtml = require('./initCalenderHtml.js');

    return modules;

}