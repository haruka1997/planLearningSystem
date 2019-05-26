// モジュール設定
var modules = require('./module/moduleInit.js');
modules = modules.moduleInit();

var $ = modules.$; //jquery

// テーブルの仮データ
let tableDate = [
    {'coverage': 1, 'executing': 50, 'goal': '達成', 'satisfaction': '満足している'},
    {'coverage': 2, 'executing': 20, 'goal': '未達成', 'satisfaction': 'あまり満足していない'},
    {'coverage': 3, 'executing': 30, 'goal': '達成', 'satisfaction': '満足している'},
    {'coverage': 4, 'executing': 50, 'goal': '未達成', 'satisfaction': '満足していない'},
    {'coverage': 5, 'executing': 10, 'goal': '達成', 'satisfaction': '満足している'},
    {'coverage': 6, 'executing': 30, 'goal': '達成', 'satisfaction': '満足していない'},
    {'coverage': 7, 'executing': 40, 'goal': '達成', 'satisfaction': '満足している'}
];

$(function(){
    // カレンダー表示
    modules.initCalenderHtml.init($);

    // 仮データ表示
    for(let i in tableDate){
        $('.learning-history-tbody').append('<tr><td>' + tableDate[i].coverage + '回</td><td>' + tableDate[i].executing + '%</td><td>' + tableDate[i].goal + '</td><td>' + tableDate[i].satisfaction + '</td></tr>');
    }

    // テーブル内を選択されたら
    
});