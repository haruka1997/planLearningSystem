// モジュール設定
var modules = require('./module/moduleInit.js');
modules = modules.moduleInit();

var $ = modules.$; //jquery

let planDisplayFlag = true;
let displayItems = {
    plans: [],
    records: []
};

// let plans = [],
//     records = [];


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
            // let currentSettingId = window.sessionStorage.getItem(['settingId']);
            // 取得した学習履歴をにテーブルに表示
            for(let i in data){
                // if(data[i].settingId !== currentSettingId){
                if(data[i].executing == null){
                    data[i].executing = '未計算';
                }else{
                    data[i].executing = data[i].executing + '%';
                }

                if(data[i].achievement == 100){
                    data[i].achievement = '達成';
                }else if(data[i].achievement == 0){
                    data[i].achievement = '未達成';
                }else{
                    data[i].achievement = '未登録';
                }

                switch(data[i].satisfaction){
                    case '0':
                        data[i].satisfaction = '満足していない';
                        break;
                    case '25':
                        data[i].satisfaction = 'あまり満足していない';
                        break;
                    case '50':
                        data[i].satisfaction = 'どちらともいえない';
                        break;
                    case '75':
                        data[i].satisfaction = 'まあ満足している';
                        break;
                    case '100':
                        data[i].satisfaction = '満足している';
                        break;
                    default:
                        data[i].satisfaction = '未登録';                         
                }

                $('.learning-history-tbody').append('<tr id=' + data[i].settingId + '><td>' + data[i].coverage + '回</td><td>' + data[i].executing + '</td><td>' + data[i].achievement + '</td><td>' + data[i].satisfaction + '</td></tr>');
                // }
            }
        }
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
       
    });

    // 今週分の予定と記録を取得する
    let thisWeekSettingId = window.sessionStorage.getItem(['settingId']);
    getCalenderItem(thisWeekSettingId);


    // テーブル内を選択されたら
    $(document).on("click", ".learning-history-tbody tr", function () {
        let selectSettingId = $(this).attr('id');
        getCalenderItem(selectSettingId);

        // 学習計画と学習記録の取得
        // $.ajax({
        //     url:'./../../php/learningHistory/getPlanAndRecord.php',
        //     type:'POST',
        //     data:{
        //         'settingId': selectSettingId
        //     },
        //     dataType: 'json'       
        // })
        // // Ajaxリクエストが成功した時発動
        // .done( (data) => {
        //     if(data) {
        //         // 計画と記録に配列分け
        //         plans = data.plan;
        //         records = data.record;
        //         for(let plan in plans){
        //             plans[plan].id = plans[plan].planId;
        //             plans[plan].date = plans[plan].planDate;
        //             plans[plan].time = JSON.parse(plans[plan].planTime);
        //         }
        //         for(let record in records){
        //             records[record].id = records[record].recordId;
        //             records[record].date = records[record].recordDate;
        //             records[record].time = JSON.parse(records[record].recordTime);
        //         }
        //         // カレンダー表示
        //         calenderDisplay();
        //     }
        // })
        // // Ajaxリクエストが失敗した時発動
        // .fail( (data) => {
           
        // });
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

    // 学習の計画追加ボタンを押されたら
    $('#add-learning-plan').click(function (){
        learningPlanAdd();
    });

    // 学習の計画追加ボタンを押されたら
    $('#add-private-plan').click(function (){
        privatePlanAdd();
    });

    // 学習の記録追加ボタンを押されたら
    $('#add-learning-record').click(function (){
        learningRecordAdd();
    });
});

function calenderDisplay(){
    modules.initCalenderHtml.init($); // カレンダーの内容初期化   
   if(planDisplayFlag){ //計画のラジオボタンが押されていたら
        modules.calenderItemSet.set(displayItems.plans, $);  // 計画をカレンダーにセット
        // ボタンの表示切り替え
        $('.add-plan-button').css('display', '');
        $('.add-record-button').css('display', 'none');
   }else{
        modules.calenderItemSet.set(displayItems.records, $); // 記録をカレンダーにセット
        // ボタンの表示切り替え
        $('.add-plan-button').css('display', 'none');
        $('.add-record-button').css('display', '');
   }
   // スクロール位置をカレンダーの位置にセット
//    $('.mdl-layout').animate({scrollTop: $('.mdl-layout')[0].scrollHeight}, 'normal');
}

/**
 * カレンダーに表示する計画と記録のデータを取得(Ajax)
 */
function getCalenderItem(settingId){
    $.ajax({
        url:'./../../php/learningHistory/getCalenderItem.php',
        type:'POST',
        data:{
            'settingId': settingId
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
                displayItems.plans.push(plans[plan]);
            }
            for(let record in records){
                records[record].id = records[record].recordId;
                records[record].date = records[record].recordDate;
                records[record].time = JSON.parse(records[record].recordTime);
                displayItems.records.push(records[record]);
            }
            // カレンダー表示
            calenderDisplay();
        }
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
       
    });
}

/**
 * 学習の計画追加処理
 */
function learningPlanAdd(){
    $('.learning-plan-create-modal-wrapper').addClass('is-visible');    //学習計画作成モーダル表示

    // キャンセルボタン押されたら
    $('.header-cansel-button').click(function () {
        $('.learning-plan-create-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
        initModalForm();
    });

    // 追加ボタン押されたら
    // $('.learning-add-button').one("click", function() {

    //     let plan = {};
    //     plan.time = {};

    //     //  入力内容の取得
    //     plan.content = $('#learningContent').val();
    //     plan.date = $('#learningDate').val();
    //     plan.time.start = $('#learningTimeStart').val();
    //     plan.time.end = $('#learningTimeEnd').val();
    //     plan.memo = $('#learningMemo').val();
    //     plan.learningFlag = true;

    //     // idの設定
    //     plan.id = 'L' + new Date().getTime();

    //     // フォームの値チェック
    //     let errorMessage = modules.formValueCheck.check(plan);

    //     // ダブルブッキングチェック
    //     let doubleBookingFlag = planDoubleBookingCheck(plan, plan.id);
    //     if(doubleBookingFlag){
    //         errorMessage.push('既に追加された予定と被ります．空いている時間に変更しましょう．');
    //     }

    //     // エラーがあれば表示、なければ登録処理
    //     if(errorMessage.length !== 0){
    //         for(let i in errorMessage){
    //             $('.modal-error').append(errorMessage[i] + '<br>');
    //         }
    //         // モーダルを1秒後に閉じる
    //         $('.learning-plan-create-modal-wrapper').delay(2000).queue(function(){
    //             $(this).removeClass('is-visible').dequeue();
    //             $('.modal-error').text('');
    //         });
    //     }else{
    //         // Ajax通信 計画情報をDBに追加
    //         postPlan(plan);
    //     }
    // });
}

/**
 * プライベートの予定追加処理
 */
function privatePlanAdd(){
    $('.private-plan-create-modal-wrapper').addClass('is-visible');    //プライベートの予定モーダル表示

    // キャンセルボタン押されたら
    $('.header-cansel-button').click(function () {
        $('.private-plan-create-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
        $('.tag').removeClass('active');// タグ選択状態を全解除
    });

    // タグボタンを押されたら
    $('.tag').click(function (){
        selectTag =  $(this).attr("id");    //選択されたタグ色取得
        $('.tag').removeClass('active');// タグ選択状態を全解除
        $(this).addClass('active'); //選択したタグを選択状態にセット
    });

    // 追加ボタン押されたら
    // $('.private-add-button').one('click', function () {
    //     $('.private-plan-create-modal-wrapper').removeClass('is-visible');    //モーダル閉じる

    //     let plan = {};
    //     plan.time = {};

    //     //  入力内容の取得
    //     plan.content = "";
    //     plan.date = $('#privateDate').val();
    //     plan.time.start = $('#privateTimeStart').val();
    //     plan.time.end = $('#privateTimeEnd').val();
    //     plan.tag = selectTag;
    //     plan.memo = $('#privateMemo').val();
    //     plan.learningFlag = false;

    //     // idの設定
    //     plan.id = 'P' + new Date().getTime();  

    //     // フォームの値チェック
    //     let errorMessage = modules.formValueCheck.check(plan);

    //     // ダブルブッキングチェック
    //     let doubleBookingFlag = planDoubleBookingCheck(plan, plan.id);
    //     if(doubleBookingFlag){
    //         errorMessage.push('既に追加された予定と被ります．空いている時間に変更しましょう．');
    //     }

    //     // エラーがあれば表示、なければ登録処理
    //     if(errorMessage.length !== 0){
    //         for(let i in errorMessage){
    //             $('.modal-error').append(errorMessage[i] + '<br>');
    //         }
    //         // モーダルを1秒後に閉じる
    //         $('.private-plan-create-modal-wrapper').delay(2000).queue(function(){
    //             $(this).removeClass('is-visible').dequeue();
    //             $('.modal-error').text('');
    //         });
    //     }else{
    //         // Ajax通信 計画情報をDBに追加
    //         postPlan(plan);
    //     }      
    // });
}

/**
 * 学習の記録追加処理
 */
function learningRecordAdd(){

    $('.learning-record-create-modal-wrapper').addClass('is-visible');    //学習記録作成モーダル表示

    // キャンセルボタン押されたら
    $('.header-cansel-button').click(function () {
        $('.learning-record-create-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
        initModalForm();
    });

    // 学習内容で「その他」を選択されたら
    $('.select-learning-content').change(function() {
        if($('#selectLearningContent').val() == "その他"){
            $('.input-learning-content').css('display', 'inline');
        }else{
            $('.input-learning-content').css('display', 'none');
        }
    });

    // 追加ボタン押されたら
    // $('.learning-add-button').one("click", function() {

    //     let record = {};
    //     record.time = {};

    //     //  入力内容の取得
    //     if($('#selectLearningContent').val() !== "その他"){
    //         record.content = $('#selectLearningContent').val();
    //     }else{
    //         record.content = $('#inputLearningContent').val();
    //     }
    //     record.date = $('#learningDate').val();
    //     record.time.start = $('#learningTimeStart').val();
    //     record.time.end = $('#learningTimeEnd').val();
    //     record.memo = $('#learningMemo').val();

    //     // idの設定
    //     record.id = 'R' + new Date().getTime();

    //     // フォームの値チェック
    //     let errorMessage = modules.formValueCheck.check(record);

    //     // ダブルブッキングチェック
    //     let doubleBookingFlag = recordDubleBookingCheck(record, record.id);
    //     if(doubleBookingFlag){
    //         errorMessage.push('既に追加された予定と被ります．空いている時間に変更しましょう．');
    //     }

    //     // エラーがあれば表示、なければ登録処理
    //     if(errorMessage.length !== 0){
    //         for(let i in errorMessage){
    //             $('.modal-error').append(errorMessage[i] + '<br>');
    //         }
    //         // モーダルを1秒後に閉じる
    //         $('.learning-record-create-modal-wrapper').delay(2000).queue(function(){
    //             $(this).removeClass('is-visible').dequeue();
    //             $('.modal-error').text('');
    //         });
    //     }else{
    //         // Ajax通信
    //         $.ajax({
    //             url:'./../../php/learningRecord/postRecord.php',
    //             type:'POST',
    //             data:{
    //                 'userId': window.sessionStorage.getItem(['userId']),
    //                 'recordId': record.id,
    //                 'settingId': window.sessionStorage.getItem(['settingId']),
    //                 'content': record.content,
    //                 'recordDate': record.date,
    //                 'recordTime': JSON.stringify(record.time),
    //                 'memo': record.memo
    //             },
    //             dataType: 'json'       
    //         })
    //         // Ajaxリクエストが成功した時発動
    //         .done( (data) => {
    //             recordDataSet(record, false, false);
    //         })
    //         // Ajaxリクエストが失敗した時発動
    //         .fail( (data) => {
    //             alert('登録に失敗しました');
    //         })
    //     }

    // });
}

/**
 * 計画の詳細表示
 * @param {String} id 
 */
function planDetail(id){
    for(var i=0; i<plans.length; i++){
        if(plans[i].id == id){ //選択した計画データ一致
            let selectPlan = plans[i];
            $('.learning-plan-detail-modal-wrapper').addClass('is-visible');    //学習計画詳細モーダル表示

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

            // 編集ボタン押されたら
            $('.learning-edit-button').one("click", function () {

                let editPlan = {};
                editPlan.time = {};

                //  入力内容の取得
                editPlan.content = $('#detailLearningContent').val();
                editPlan.date = $('#detailLearningDate').val();
                editPlan.time.start = $('#detailLearningTimeStart').val();
                editPlan.time.end = $('#detailLearningTimeEnd').val();
                editPlan.memo = $('#detailLearningMemo').val();
                editPlan.learningFlag = true;
                editPlan.settingId = selectPlan.settingId;

                // フォームの値チェック
                let errorMessage = modules.formValueCheck.check(editPlan);

                // ダブルブッキングチェック
                let doubleBookingFlag = planDoubleBookingCheck(editPlan, id);
                if(doubleBookingFlag){
                    errorMessage.push('既に追加された予定と被ります．空いている時間に変更しましょう．');
                }

                // エラーがあれば表示、なければ登録処理
                if(errorMessage.length !== 0){
                    for(let i in errorMessage){
                        $('.modal-error').append(errorMessage[i] + '<br>');
                    }
                    // モーダルを1秒後に閉じる
                    $('.learning-plan-detail-modal-wrapper').delay(2000).queue(function(){
                        $(this).removeClass('is-visible').dequeue();
                        $('.modal-error').text('');
                    });
                }else{
                    editPlan.id = 'L' + new Date().getTime();
                    updatePlan(editPlan, id, i);
                }      
            });

            // 学習計画の削除ボタンを押されたら
            $('.learning-delete-button').one("click", function () {
                deletePlan(selectPlan, id, i);
            });

            break;
        }
    }
}

function recordDetail(id){
    for(var i=0; i<records.length; i++){
        if(records[i].id == id){ //選択した計画データ一致
            let selectRecord = records[i];
            $('.learning-record-detail-modal-wrapper').addClass('is-visible');    //学習記録詳細モーダル表示

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

/**
 * モーダルフォームの初期化
 * @param {array} plan 
 */
function initModalForm(){
    $('#learningContent').val('');
    $('#learningDate').val('');
    $('#learningTimeStart').val('');
    $('#learningTimeEnd').val('');
    $('#learningMemo').val('');
    $('#privateDate').val('');
    $('#privateTimeStart').val('');
    $('#privateTimeEnd').val('');
    $('#privateTimeEnd').val('');
    $('.tag').removeClass('active');
    $('#privateMemo').val('');
    $('.modal-error').text('');
}

function planDataSet(plan, learningFlag, editFlag, deleteFlag){
    if(learningFlag && learningFlag == 'true'){
        
        modules.initCalenderHtml.init($);

        var afterLearningPlans = JSON.parse(JSON.stringify(plans));
        if(editFlag !== false){
            afterLearningPlans.splice(Number(editFlag),1);
        }

        if(deleteFlag !== false){
            afterLearningPlans.splice(Number(deleteFlag),1);
        }else{
            afterLearningPlans.push(plan);
        }

        // displayPlans = afterLearningPlans.concat(privatePlans);
        
        // カレンダーセット
        modules.calenderItemSet.set(afterLearningPlans, $);

        plans = JSON.parse(JSON.stringify(afterLearningPlans));
        // calcTotalLearningTime();    // 合計学習時間の算出

        if(editFlag === false && deleteFlag === false){
            $('.learning-plan-create-modal-wrapper').removeClass('is-visible');
        }else{
            $('.learning-plan-detail-modal-wrapper').removeClass('is-visible');
        }

    }else{

        modules.initCalenderHtml.init($);

        var afterPrivatePlans = JSON.parse(JSON.stringify(privatePlans));
        if(editFlag !== false){
            afterPrivatePlans.splice(Number(editFlag),1);
        }

        if(deleteFlag !== false){
            afterPrivatePlans.splice(Number(deleteFlag),1);
        }else{
            afterPrivatePlans.push(plan);
        }

        displayPlans = afterPrivatePlans.concat(plans);

        // カレンダーセット
        modules.calenderItemSet.set(displayPlans, $);
        
        privatePlans = JSON.parse(JSON.stringify(afterPrivatePlans));

        // タグ初期化
        $('.tag').removeClass('active');// タグ選択状態を全解除

        if(editFlag === false && deleteFlag === false){
            $('.private-plan-create-modal-wrapper').removeClass('is-visible');
        }else{
            $('.private-plan-detail-modal-wrapper').removeClass('is-visible');
        }
    }
}


/**
 * ajax updatePlan
 * @param {*} editPlan 
 * @param {*} id 
 * @param {*} i 
 */
function updatePlan(editPlan, id, i){
    console.log(editPlan);
    $.ajax({
        url:'./../../php/planCreate/postPlan.php',
        type:'POST',
        data:{
            'userId': window.sessionStorage.getItem(['userId']),
            'planId': editPlan.id,
            'settingId': editPlan.settingId,
            'content': editPlan.content,
            'planDate': editPlan.date,
            'planTime': JSON.stringify(editPlan.time),
            'memo': editPlan.memo,
            'tag': editPlan.tag,
            'learningFlag': editPlan.learningFlag
        },
        dataType: 'json'       
    })
    // Ajaxリクエストが成功した時発動
    .done( (data) => {
        // 編集された計画に編集フラグを立てる
        $.ajax({
            url:'./../../php/planCreate/updatePlan.php',
            type:'POST',
            data:{
                'planId': id,
                'editId': editPlan.id
            },
            dataType: 'json'       
        })
        // Ajaxリクエストが成功した時発動
        .done( (data) => {
            planDataSet(editPlan, editPlan.learningFlag, i, false);
        })
        // Ajaxリクエストが失敗した時発動
        .fail( (data) => {
            alert('編集に失敗しました');
            return data;
        })
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
        alert('登録に失敗しました');
    })
}

/**
 * ajax deletePlan
 */
function deletePlan(deletePlan, id, i){
    $.ajax({
        url:'./../../php/planCreate/deletePlan.php',
        type:'POST',
        data:{
            'planId': id
        },
        dataType: 'json'       
    })
    // Ajaxリクエストが成功した時発動
    .done( (data) => {
        planDataSet(deletePlan, deletePlan.learningFlag, false, i);
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
        alert('削除に失敗しました');
        return data;
    })
}

function planDoubleBookingCheck(plan, id){

    var doubleBookingFlag = false;

    for(var learningIndex = 0; learningIndex < plans.length; learningIndex++){
        if(id !== plans[learningIndex].id){
            if(plans[learningIndex].date == plan.date){
                // 開始時間が既に作成された予定とダブる または　終了時間が既に作成された予定とダブる
                if((plans[learningIndex].time.start < plan.time.start && plans[learningIndex].time.end > plan.time.start)
                || (plans[learningIndex].time.start < plan.time.end && plans[learningIndex].time.end > plan.time.end)
                || (plans[learningIndex].time.start > plan.time.start && plans[learningIndex].time.end < plan.time.end)
                || (plans[learningIndex].time.start == plan.time.start && plans[learningIndex].time.end == plan.time.end)){
                    doubleBookingFlag = true;
                    break;
                }
            }
        }
    } 

    return doubleBookingFlag;
}