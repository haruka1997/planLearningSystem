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

    // カレンダー内を押されたら
    $(document).on("click", ".calender-content", function () {
        var id = $(this).attr("id");
        if(id !== undefined){   //計画詳細表示の場合
            var category = id.slice(0,1);
            if(category === 'L'){
                planDetail(id);   //学習計画詳細表示
            }else{
                recordDetail(id);   // 学習記録詳細表示
            }
        }
    });
});

function calenderDisplay(){
    modules.initCalenderHtml.init($); // カレンダーの内容初期化   
   if(planDisplayFlag){ //計画のラジオボタンが押されていたら
        modules.calenderItemSet.set(plans, $);  // 計画をカレンダーにセット
   }else{
        modules.calenderItemSet.set(records, $); // 記録をカレンダーにセット
   }
   // スクロール位置をカレンダーの位置にセット
//    $('.mdl-layout').animate({scrollTop: $('.mdl-layout')[0].scrollHeight}, 'normal');
}

function planDetail(id){
    for(var i=0; i<plans.length; i++){
        if(plans[i].id == id){ //選択した計画データ一致
            let selectPlan = plans[i];
            $('.learning-plan-detail-modal-wrapper').addClass('is-visible');    //学習計画詳細モーダル表示

            // フッターボタン非表示
            $('.detail-modal-footer-button button').css('display', 'none');
            $('.plan-modal input').attr('disabled', true);
            $('.plan-modal textarea').attr('disabled', true);

            // キャンセルボタン押されたら
            $('.header-cansel-button').click(function () {
                $('.learning-plan-detail-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
            });

            // フォームの値セット
            $('.learning-plan-detail-modal-wrapper #detailLearningContent').val(selectPlan.content);
            $('.learning-plan-detail-modal-wrapper #detailLearningDate').val(selectPlan.date);
            $('.learning-plan-detail-modal-wrapper #detailLearningTimeStart').val(selectPlan.time.start);
            $('.learning-plan-detail-modal-wrapper #detailLearningTimeEnd').val(selectPlan.time.end);
            $('.learning-plan-detail-modal-wrapper #detailLearningMemo').val(selectPlan.memo);
        }
    }
}

function recordDetail(id){
    for(var i=0; i<records.length; i++){
        if(records[i].id == id){ //選択した計画データ一致
            let selectRecord = records[i];
            $('.learning-record-detail-modal-wrapper').addClass('is-visible');    //学習記録詳細モーダル表示

            // フッターボタン非表示
            $('.detail-modal-footer-button button').css('display', 'none');
            $('.plan-modal input').attr('disabled', true);
            $('.plan-modal textarea').attr('disabled', true);

            // キャンセルボタン押されたら
            $('.header-cansel-button').click(function () {
                $('.learning-record-detail-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
            });

            // フォームの値セット
            $('.learning-record-detail-modal-wrapper #detailLearningContent').val(selectRecord.content);
            $('.learning-record-detail-modal-wrapper #detailLearningDate').val(selectRecord.date);
            $('.learning-record-detail-modal-wrapper #detailLearningTimeStart').val(selectRecord.time.start);
            $('.learning-record-detail-modal-wrapper #detailLearningTimeEnd').val(selectRecord.time.end);
            $('.learning-record-detail-modal-wrapper #detailLearningMemo').val(selectRecord.memo);

        }
    }
}