// モジュール設定
var modules = require('./module/moduleInit.js');
modules = modules.moduleInit();

var $ = modules.$; //jquery

// テーブルの仮データ
let tableDate = [
    {'settingId': 'a', 'coverage': 1, 'executing': 50, 'goal': '達成', 'satisfaction': '満足している'},
    {'settingId': 'b','coverage': 2, 'executing': 20, 'goal': '未達成', 'satisfaction': 'あまり満足していない'},
    {'settingId': 'c','coverage': 3, 'executing': 30, 'goal': '達成', 'satisfaction': '満足している'},
    {'settingId': 'd','coverage': 4, 'executing': 50, 'goal': '未達成', 'satisfaction': '満足していない'},
    {'settingId': 'e','coverage': 5, 'executing': 10, 'goal': '達成', 'satisfaction': '満足している'},
    {'settingId': 'f','coverage': 6, 'executing': 30, 'goal': '達成', 'satisfaction': '満足していない'},
    {'settingId': 'g','coverage': 7, 'executing': 40, 'goal': '達成', 'satisfaction': '満足している'}
];

$(function(){
    // カレンダー表示
    modules.initCalenderHtml.init($);

    // 仮データ表示
    for(let i in tableDate){
        $('.learning-history-tbody').append('<tr id=' + tableDate[i].settingId + '><td>' + tableDate[i].coverage + '回</td><td>' + tableDate[i].executing + '%</td><td>' + tableDate[i].goal + '</td><td>' + tableDate[i].satisfaction + '</td></tr>');
    }

    // テーブル内を選択されたら
    $('.learning-history-tbody tr').click(function (){
        
    });
    
});