// モジュール設定
var modules = require('./module/moduleInit.js');
modules = modules.moduleInit();

var $ = modules.$; //jquery

let planDisplayFlag = true;
let plans = [],
    records = [];


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
                // 計画と記録に配列分け
                plans = data.plan;
                records = data.record;
                for(let plan in plans){
                    plans[plan].id = plans[plan].planId;
                    plans[plan].date = plans[plan].planDate;
                    plans[plan].time = JSON.parse(plans[plan].planTime);
                }
                for(let record in records){
                    records[record].id = records[record].recordId;
                    records[record].date = records[record].recordDate;
                    records[record].time = JSON.parse(records[record].recordTime);
                }
                // カレンダー表示
                calenderDisplay();
            }
        })
        // Ajaxリクエストが失敗した時発動
        .fail( (data) => {
           
        });
    });

    // ラジオボタン切り替え
    $( 'input[name="options"]:radio' ).change( function() {
        let radioval = $(this).val();
        if(radioval == '計画'){
            planDisplayFlag = true;
        }else{
            planDisplayFlag = false;
        }
        calenderDisplay();
    });
});

function calenderDisplay(){
    modules.initCalenderHtml.init($); // カレンダーの内容初期化   
   if(planDisplayFlag){ //計画のラジオボタンが押されていたら
        modules.calenderItemSet.set(plans, $);  // 計画をカレンダーにセット
   }else{
        modules.calenderItemSet.set(records, $); // 記録をカレンダーにセット
   }
}