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