module.exports = {

    loginSet: function(){
        var modules = {};

        // CSS
        require('./../../lib/material.min.css');
        require('./../../css/login.css');
        require('./../../css/main.css');
    
        modules.htmlescape = require('./htmlescape.js');
    
        return modules;
    },

    mainSet: function(){
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
        
        // chart.js
        modules.Chart = require('chart.js');
      
        // initCalenderHtml
        modules.initCalenderHtml = require('./initCalenderHtml.js');
    
        modules.setChartItem = require('./setChartItem.js');
    
        modules.htmlescape = require('./htmlescape.js');
    
        return modules;

    }
}