// モジュール設定
var modules = require('./module/moduleInit.js');
modules = modules.moduleInit();

var $ = modules.$; //jquery


$(function(){
    // カレンダー表示
    modules.initCalenderHtml.init($);    

    // テーブルに表示するデータの取得
    $.ajax({
        url:'./../../php/learningHistory/getHistoryData.php',
        type:'POST',
        data:{
            'userId': window.sessionStorage.getItem(['userId'])
        },
        dataType: 'json'       
    })
    // Ajaxリクエストが成功した時発動
    .done( (data) => {
        if(data) {
            let currentSettingId = window.sessionStorage.getItem(['settingId']);
            // 取得した学習履歴をにテーブルに表示
            for(let i in data){
                if(data[i].settingId !== currentSettingId){
                    $('.learning-history-tbody').append('<tr id=' + data[i].settingId + '><td>' + data[i].coverage + '回</td><td>' + data[i].executing + '%</td><td>' + data[i].achievement + '</td><td>' + data[i].satisfaction + '</td></tr>');
                }
            }
        }
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
       
    });

    // テーブル内を選択されたら
    $(document).on("click", ".learning-history-tbody tr", function () {
        let selectSettingId = $(this).attr('id');

        // 学習計画と学習記録の取得
        $.ajax({
            url:'./../../php/learningHistory/getPlanAndRecord.php',
            type:'POST',
            data:{
                'settingId': selectSettingId
            },
            dataType: 'json'       
        })
        // Ajaxリクエストが成功した時発動
        .done( (data) => {
            if(data) {
                // カレンダー表示
                console.log(data);
            }
        })
        // Ajaxリクエストが失敗した時発動
        .fail( (data) => {
           
        });
    
    });
});