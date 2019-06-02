// モジュール設定
var modules = require('./module/moduleInit.js');
modules = modules.moduleInit();

var $ = modules.$; //jquery

let planDisplayFlag = true;
let displayItems = {
    plans: [],
    records: []
};
let historyData = [];
let settingData = {};
let selectSettingId = undefined;
let calenderDate = [];

let ajaxFlag = {
    postPlan: false,
    editPlan: false,
    deletePlan: false,
    postRecord: false,
    editRecord: false,
    deleteRecord: false
}

$(function(){

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
            historyData = data;
            // 取得した学習履歴をにテーブルに表示
            for(var i in data){
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
            }
            
            selectSettingId = data[i].settingId;
            calenderDate = calcCalenderDate(selectSettingId);
            getCalenderItem(selectSettingId);
        }
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
       
    });

    // テーブル内を選択されたら
    $(document).on("click", ".learning-history-tbody tr", function () {
        selectSettingId = $(this).attr('id');
        calenderDate = calcCalenderDate(selectSettingId);
        getCalenderItem(selectSettingId);

    });

    // ラジオボタン切り替え
    $( 'input[name="options"]:radio' ).change( function() {
        let radioval = $(this).val();
        if(radioval == '計画'){
            planDisplayFlag = true;
        }else{
            planDisplayFlag = false;
        }
        calenderDisplay(calenderDate);
    });

    // カレンダー内を押されたら
    $(document).on("click", ".calender-content", function () {
        var id = $(this).attr("id");
        if(id !== undefined){   //計画詳細表示の場合
            var category = id.slice(0,1);
            if(category === 'L'){   // 学習記録詳細表示
                learningPlanDetail(id);
            }else if(category === 'P'){
                privatePlanDetail(id);   // プライベート予定詳細表示
            }else{
                learningRecordDetail(id);   // 学習記録詳細表示
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

function calenderDisplay(this_monday){
    modules.initCalenderHtml.init($, calenderDate); // カレンダーの内容初期化   
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
    // 表示アイテムの初期化
    displayItems.plans = [];
    displayItems.records = [];
    $('#selectLearningContent').html('<option>学習内容を選択</option>');

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
            
            // 二重登録されたものを除外
            displayItems.plans = plans.filter(function(v1,i1,a1){ 
                return (a1.findIndex(function(v2){ 
                    return (v1.insertTime===v2.insertTime) 
                }) === i1);
            });
            displayItems.records = records.filter(function(v1,i1,a1){ 
                return (a1.findIndex(function(v2){ 
                    return (v1.insertTime===v2.insertTime) 
                }) === i1);
            });

            for(let plan in displayItems.plans){
                // id, date, timeに変換
                displayItems.plans[plan].id = displayItems.plans[plan].planId;
                displayItems.plans[plan].date = displayItems.plans[plan].planDate;
                displayItems.plans[plan].time = JSON.parse(displayItems.plans[plan].planTime);
                // 学習内容リストのセット
                if(displayItems.plans[plan].learningFlag == "true"){
                    $('<option value="' + displayItems.plans[plan].content + '">' + displayItems.plans[plan].content + '</option>').appendTo('#selectLearningContent');
                }
            }
            $('<option value="その他">その他</option>').appendTo('#selectLearningContent');
            for(let record in displayItems.records){
                displayItems.records[record].id = displayItems.records[record].recordId;
                displayItems.records[record].date = displayItems.records[record].recordDate;
                displayItems.records[record].time = JSON.parse(displayItems.records[record].recordTime);
            }

            // カレンダー表示
            calenderDisplay(calenderDate);
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
        $('.learning-plan-create-modal-wrapper .learning-add-button').attr('disabled', true);
        initModalForm();
    });

    // 学習日のリスト表示
    $('.learning-plan-create-modal-wrapper #learningDate').html('');
    let day = ['(月)', '(火)', '(水)', '(木)', '(金)', '(土)', '(日)'];
    for(let date in calenderDate){
        let value = calenderDate[date].year + '-' + calenderDate[date].month + '-' + calenderDate[date].date;
        $('<option value="' + value + '">' + value + day[date] + '</option>').appendTo('.learning-plan-create-modal-wrapper #learningDate');
    }

    // フォームの必須項目が入力されたら
    $('.learning-plan-create-modal-wrapper input.required').on('change', function(){
        $('.learning-plan-create-modal-wrapper input.required').each(function() {
            let error = false;
            if($(this).val() === ''){
                error = true;
            }
            
            if(!error){
                $('.learning-plan-create-modal-wrapper .learning-add-button').attr('disabled', false);
            }else{
                $('.learning-plan-create-modal-wrapper .learning-add-button').attr('disabled', true);
            }
        });
    });

    // 追加ボタン押されたら
    $('.learning-plan-create-modal-wrapper .learning-add-button').off("click").one("click", function() {

        let plan = {};
        plan.time = {};

        //  入力内容の取得
        plan.content = $('.learning-plan-create-modal-wrapper #learningContent').val();
        plan.date = $('.learning-plan-create-modal-wrapper #learningDate').val();
        plan.time.start = $('.learning-plan-create-modal-wrapper #learningTimeStart').val();
        plan.time.end = $('.learning-plan-create-modal-wrapper #learningTimeEnd').val();
        plan.memo = $('.learning-plan-create-modal-wrapper #learningMemo').val();
        plan.learningFlag = true;

        // idの設定
        plan.id = 'L' + new Date().getTime();

        // ダブルブッキングチェック
        let doubleBookingFlag = calenderDoubleBookingCheck(plan, plan.id);

        // エラーがあれば表示、なければ登録処理
        if(doubleBookingFlag){
            $('.modal-error').text('既に追加された予定と被ります．空いている時間に変更しましょう．');
            // モーダルを1秒後に閉じる
            $('.learning-plan-create-modal-wrapper').delay(2000).queue(function(){
                $(this).removeClass('is-visible').dequeue();
                $('.modal-error').text('');
                ajaxFlag.postPlan = false;
            });
        }else{
            // Ajax通信 計画情報をDBに追加
            postPlan(plan);
        }
    });
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
        $('.private-plan-create-modal-wrapper .private-add-button').attr('disabled', true);
    });

    // タグボタンを押されたら
    $('.tag').click(function (){
        selectTag =  $(this).attr("id");    //選択されたタグ色取得
        $('.tag').removeClass('active'); //タグ選択状態を全解除
        $(this).addClass('active'); //選択したタグを選択状態にセット
    });

    // 学習日のリスト表示
    $('.private-plan-create-modal-wrapper #privateDate').html('');
    let day = ['(月)', '(火)', '(水)', '(木)', '(金)', '(土)', '(日)'];
    for(let date in calenderDate){
        let value = calenderDate[date].year + '-' + calenderDate[date].month + '-' + calenderDate[date].date;
        $('<option value="' + value + '">' + value + day[date] + '</option>').appendTo('.private-plan-create-modal-wrapper #privateDate');
    }

    // フォームの必須項目が入力されたら
    $('.private-plan-create-modal-wrapper input.required').on('change', function(){
        let error = false;
        $('.private-plan-create-modal-wrapper input.required').each(function() {
            if($(this).val() === ''){
                error = true;
            }
        });

        if(!error){
            $('.private-plan-create-modal-wrapper .private-add-button').attr('disabled', false);
        }else{
            $('.private-plan-create-modal-wrapper .private-add-button').attr('disabled', true);
        }

    });


    // 追加ボタン押されたら
    $('.private-add-button').off('click').one('click', function () {
        $('.private-plan-create-modal-wrapper').removeClass('is-visible');    //モーダル閉じる

        let plan = {};
        plan.time = {};

        //  入力内容の取得
        plan.content = "";
        plan.date = $('.private-plan-create-modal-wrapper #privateDate').val();
        plan.time.start = $('.private-plan-create-modal-wrapper #privateTimeStart').val();
        plan.time.end = $('.private-plan-create-modal-wrapper #privateTimeEnd').val();
        plan.tag = selectTag;
        plan.memo = $('.private-plan-create-modal-wrapper #privateMemo').val();
        plan.learningFlag = false;

        // idの設定
        plan.id = 'P' + new Date().getTime();  

        // ダブルブッキングチェック
        let doubleBookingFlag = calenderDoubleBookingCheck(plan, plan.id);

        // エラーがあれば表示、なければ登録処理
        if(doubleBookingFlag){
            $('.modal-error').text('既に追加された予定と被ります．空いている時間に変更しましょう．');
            // モーダルを1秒後に閉じる
            $('.private-plan-create-modal-wrapper').delay(2000).queue(function(){
                $(this).removeClass('is-visible').dequeue();
                $('.modal-error').text('');
            });
        }else{
            // Ajax通信 計画情報をDBに追加
            postPlan(plan);
        }      
    });
}

/**
 * 学習の記録追加処理
 */
function learningRecordAdd(){

    $('.learning-record-create-modal-wrapper').addClass('is-visible');    //学習記録作成モーダル表示

    // キャンセルボタン押されたら
    $('.header-cansel-button').click(function () {
        $('.learning-record-create-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
        $('.learning-record-create-modal-wrapper .learning-add-button').attr('disabled', true);
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

    // 学習日のリスト表示
    $('.learning-record-create-modal-wrapper #learningDate').html('');
    let day = ['(月)', '(火)', '(水)', '(木)', '(金)', '(土)', '(日)'];
    for(let date in calenderDate){
        let value = calenderDate[date].year + '-' + calenderDate[date].month + '-' + calenderDate[date].date;
        $('<option value="' + value + '">' + value + day[i] + '</option>').appendTo('.learning-record-create-modal-wrapper #learningDate');
    }

    let formErrorCheck = function(value){
        let error = false;
        let selectContent = $('.learning-record-create-modal-wrapper select.required').val();
        let inputContent = $('.learning-record-create-modal-wrapper #inputLearningContent').val();
        if(value === '' || selectContent == '学習内容を選択' || (selectContent == 'その他' && inputContent == '')){
            error = true;
        }

        if(!error){
            $('.learning-record-create-modal-wrapper .learning-add-button').attr('disabled', false);
        }else{
            $('.learning-record-create-modal-wrapper .learning-add-button').attr('disabled', true);
        }
    };

    // フォームの必須項目が入力されたら
    $('.learning-record-create-modal-wrapper input.required').on('change', function(){
        $('.learning-record-create-modal-wrapper input.required').each(function() {
           formErrorCheck($(this).val());
        });
    });

    $('.learning-record-create-modal-wrapper select.required').on('change', function(){
        $('.learning-record-create-modal-wrapper input.required').each(function() {
            formErrorCheck($(this).val());
        });
    });

    // 追加ボタン押されたら
    $('.learning-add-button').off('click').one("click", function() {

        let record = {};
        record.time = {};

        //  入力内容の取得
        if($('.learning-record-create-modal-wrapper #selectLearningContent').val() !== "その他"){
            record.content = $('.learning-record-create-modal-wrapper #selectLearningContent').val();
        }else{
            record.content = $('.learning-record-create-modal-wrapper #inputLearningContent').val();
        }
        record.date = $('.learning-record-create-modal-wrapper #learningDate').val();
        record.time.start = $('.learning-record-create-modal-wrapper #learningTimeStart').val();
        record.time.end = $('.learning-record-create-modal-wrapper #learningTimeEnd').val();
        record.memo = $('.learning-record-create-modal-wrapper #learningMemo').val();

        // idの設定
        record.id = 'R' + new Date().getTime();

        // ダブルブッキングチェック
        let doubleBookingFlag = calenderDoubleBookingCheck(record, record.id);

        // エラーがあれば表示、なければ登録処理
        if(doubleBookingFlag){
            $('.modal-error').text('既に追加された予定と被ります．空いている時間に変更しましょう．');
            // モーダルを1秒後に閉じる
            $('.learning-record-create-modal-wrapper').delay(2000).queue(function(){
                $(this).removeClass('is-visible').dequeue();
                $('.modal-error').text('');
            });
        }else{
            // Ajax通信
            $.ajax({
                url:'./../../php/learningRecord/postRecord.php',
                type:'POST',
                data:{
                    'userId': window.sessionStorage.getItem(['userId']),
                    'recordId': record.id,
                    'settingId': selectSettingId,
                    'content': record.content,
                    'recordDate': record.date,
                    'recordTime': JSON.stringify(record.time),
                    'memo': record.memo
                },
                dataType: 'json'       
            })
            // Ajaxリクエストが成功した時発動
            .done( (data) => {
                calenderDataSet(record, false, false);
            })
            // Ajaxリクエストが失敗した時発動
            .fail( (data) => {
                alert('登録に失敗しました');
            })
        }

    });
}

/**
 * 計画の詳細表示
 * @param {String} id 
 */
function learningPlanDetail(id){
    for(var i=0; i<displayItems.plans.length; i++){
        if(displayItems.plans[i].id == id){ //選択した計画データ一致
            let selectPlan = displayItems.plans[i];
            $('.learning-plan-detail-modal-wrapper').addClass('is-visible');    //学習計画詳細モーダル表示

            // キャンセルボタン押されたら
            $('.header-cansel-button').click(function () {
                $('.learning-plan-detail-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
                $('.learning-plan-detail-modal-wrapper .learning-edit-button').attr('disabled', false);
            });

            // 学習日のリスト表示
            $('.learning-plan-detail-modal-wrapper #detailLearningDate').html('');
            let day = ['(月)', '(火)', '(水)', '(木)', '(金)', '(土)', '(日)'];
            for(let date in calenderDate){
                let value = calenderDate[date].year + '-' + calenderDate[date].month + '-' + calenderDate[date].date;
                $('<option value="' + value + '">' + value + day[date] + '</option>').appendTo('.learning-plan-detail-modal-wrapper #detailLearningDate');
            }

            // フォームの必須項目が入力されたら
            $('.learning-plan-detail-modal-wrapper input.required').on('change', function(){
                let error = false;
                $('.learning-plan-detail-modal-wrapper input.required').each(function() {
                    if($(this).val() === ''){
                        error = true;
                    }
                    
                    if(!error){
                        $('.learning-plan-detail-modal-wrapper .learning-edit-button').attr('disabled', false);
                    }else{
                        $('.learning-plan-detail-modal-wrapper .learning-edit-button').attr('disabled', true);
                    }
                });
            });

            // フォームの値セット
            $('.learning-plan-detail-modal-wrapper #detailLearningContent').val(selectPlan.content);
            $('.learning-plan-detail-modal-wrapper #detailLearningDate').val(selectPlan.date);
            $('.learning-plan-detail-modal-wrapper #detailLearningTimeStart').val(selectPlan.time.start);
            $('.learning-plan-detail-modal-wrapper #detailLearningTimeEnd').val(selectPlan.time.end);
            $('.learning-plan-detail-modal-wrapper #detailLearningMemo').val(selectPlan.memo);

            // 編集ボタン押されたら
            $('.learning-plan-detail-modal-wrapper .learning-edit-button').off("click").one("click", function () {

                let editPlan = {};
                editPlan.time = {};

                //  入力内容の取得
                editPlan.content = $('.learning-plan-detail-modal-wrapper #detailLearningContent').val();
                editPlan.date = $('.learning-plan-detail-modal-wrapper #detailLearningDate').val();
                editPlan.time.start = $('.learning-plan-detail-modal-wrapper #detailLearningTimeStart').val();
                editPlan.time.end = $('.learning-plan-detail-modal-wrapper #detailLearningTimeEnd').val();
                editPlan.memo = $('.learning-plan-detail-modal-wrapper #detailLearningMemo').val();
                editPlan.learningFlag = true;

                // ダブルブッキングチェック
                let doubleBookingFlag = calenderDoubleBookingCheck(editPlan, id);

                // エラーがあれば表示、なければ登録処理
                if(doubleBookingFlag){
                    $('.modal-error').text('既に追加された予定と被ります．空いている時間に変更しましょう．');
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
            $('.learning-plan-detail-modal-wrapper .learning-delete-button').off('click').one("click", function () {
                deletePlan(selectPlan, id, i);
            });

            break;
        }
    }
}

/**
 * プライベートの予定詳細表示
 * @param {String} id 
 */
function privatePlanDetail(id){
    for(var i=0; i<displayItems.plans.length; i++){
        if(displayItems.plans[i].id == id){ //選択した計画データ一致
            let selectPlan = displayItems.plans[i];
            $('.private-plan-detail-modal-wrapper').addClass('is-visible');    //プライベートの予定詳細モーダル表示

            // キャンセルボタン押されたら
            $('.header-cansel-button').click(function () {
                 // タグ初期化
                $('.tag').removeClass('active');// タグ選択状態を全解除
                $('.private-plan-detail-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
                $('.private-plan-detail-modal-wrapper .private-edit-button').attr('disabled', false);
                initModalForm();
            });

            // 学習日のリスト表示
            $('.private-plan-detail-modal-wrapper #detailPrivateDate').html('');
            let day = ['(月)', '(火)', '(水)', '(木)', '(金)', '(土)', '(日)'];
            for(let date in calenderDate){
                let value = calenderDate[date].year + '-' + calenderDate[date].month + '-' + calenderDate[date].date;
                $('<option value="' + value + '">' + value + day[date] + '</option>').appendTo('.private-plan-detail-modal-wrapper #detailPrivateDate');
            }

            // フォームの必須項目が入力されたら
            $('.private-plan-detail-modal-wrapper input.required').on('change', function(){
                let error = false;
                $('.private-plan-detail-modal-wrapper input.required').each(function() {
                    if($(this).val() === ''){
                        error = true;
                    }
                    
                    if(!error){
                        $('.private-plan-detail-modal-wrapper .private-edit-button').attr('disabled', false);
                    }else{
                        $('.private-plan-detail-modal-wrapper .private-edit-button').attr('disabled', true);
                    }
                });
            });

            // フォームの値セット
            $('.private-plan-detail-modal-wrapper #detailPrivateDate').val(selectPlan.date);
            $('.private-plan-detail-modal-wrapper #detailPrivateTimeStart').val(selectPlan.time.start);
            $('.private-plan-detail-modal-wrapper #detailPrivateTimeEnd').val(selectPlan.time.end);
            $('.private-plan-detail-modal-wrapper #detailPrivateMemo').val(selectPlan.memo);

            // タグボタンを押されたら
            $('.tag').click(function (){
                selectTag =  $(this).attr("id");    //選択されたタグ色取得
                $('.tag').removeClass('active');// タグ選択状態を全解除
                $(this).addClass('active'); //選択したタグを選択状態にセット
            });

            // TODO: 予定編集処理
            // 編集ボタン押されたら
            $('.private-plan-detail-modal-wrapper .private-edit-button').off("click").one("click", function () {
                $('.private-plan-detail-modal-wrapper').removeClass('is-visible');    //モーダル閉じる

                let editPlan = {};
                editPlan.time = {};

                //  入力内容の取得
                editPlan.content = "";
                editPlan.date = $('.private-plan-detail-modal-wrapper #detailPrivateDate').val();
                editPlan.time.start = $('.private-plan-detail-modal-wrapper #detailPrivateTimeStart').val();
                editPlan.time.end = $('.private-plan-detail-modal-wrapper #detailPrivateTimeEnd').val();
                editPlan.memo = $('.private-plan-detail-modal-wrapper #detailPrivateMemo').val();
                editPlan.tag = selectTag;
                editPlan.learningFlag = false;
                editPlan.settingId = selectPlan.settingId;

                // ダブルブッキングチェック
                let doubleBookingFlag = calenderDoubleBookingCheck(editPlan, id);

                // エラーがあれば表示、なければ登録処理
                if(doubleBookingFlag){
                    $('.modal-error').text('既に追加された予定と被ります．空いている時間に変更しましょう．');
                    // モーダルを1秒後に閉じる
                    $('.private-plan-detail-modal-wrapper').delay(2000).queue(function(){
                        $(this).removeClass('is-visible').dequeue();
                        $('.modal-error').text('');
                    });
                }else{
                    editPlan.id = 'P' + new Date().getTime();
                    updatePlan(editPlan, id, i);
                }     
            });

            // プライベートの予定の削除ボタンを押されたら
            $('.private-plan-detail-modal-wrapper .private-delete-button').off('click').one("click", function () {
                deletePlan(selectPlan, id, i);
            });
            break;
        }
    }
}

function learningRecordDetail(id){
    for(var i=0; i<displayItems.records.length; i++){
        if(displayItems.records[i].id == id){ //選択した計画データ一致
            let selectRecord = displayItems.records[i];
            $('.learning-record-detail-modal-wrapper').addClass('is-visible');    //学習記録詳細モーダル表示

            // キャンセルボタン押されたら
            $('.header-cansel-button').click(function () {
                $('.learning-record-detail-modal-wrapper .learning-edit-button').attr('disabled', false);
                $('.learning-record-detail-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
            });

             // 学習日のリスト表示
             $('.learning-record-detail-modal-wrapper #detailLearningDate').html('');
             let day = ['(月)', '(火)', '(水)', '(木)', '(金)', '(土)', '(日)'];
             for(let date in calenderDate){
                 let value = calenderDate[date].year + '-' + calenderDate[date].month + '-' + calenderDate[date].date;
                 $('<option value="' + value + '">' + value + day[date] + '</option>').appendTo('.learning-record-detail-modal-wrapper #detailLearningDate');
             }

            // フォームの必須項目が入力されたら
            $('.learning-record-detail-modal-wrapper input.required').on('change', function(){
                let error = false;
                $('.learning-record-detail-modal-wrapper input.required').each(function() {
                    if($(this).val() === ''){
                        error = true;
                    }                    
                    if(!error){
                        $('.learning-record-detail-modal-wrapper .learning-edit-button').attr('disabled', false);
                    }else{
                        $('.learning-record-detail-modal-wrapper .learning-edit-button').attr('disabled', true);
                    }
                });
            });

            // フォームの値セット
            $('.learning-record-detail-modal-wrapper #detailLearningContent').val(selectRecord.content);
            $('.learning-record-detail-modal-wrapper #detailLearningDate').val(selectRecord.date);
            $('.learning-record-detail-modal-wrapper #detailLearningTimeStart').val(selectRecord.time.start);
            $('.learning-record-detail-modal-wrapper #detailLearningTimeEnd').val(selectRecord.time.end);
            $('.learning-record-detail-modal-wrapper #detailLearningMemo').val(selectRecord.memo);

            // 編集ボタン押されたら
            $('.learning-record-detail-modal-wrapper .learning-edit-button').off('click').one("click", function () {

                let editRecord = {};
                editRecord.time = {};

                //  入力内容の取得
                editRecord.id = id;
                editRecord.content = $('.learning-record-detail-modal-wrapper #detailLearningContent').val();
                editRecord.date = $('.learning-record-detail-modal-wrapper #detailLearningDate').val();
                editRecord.time.start = $('.learning-record-detail-modal-wrapper #detailLearningTimeStart').val();
                editRecord.time.end = $('.learning-record-detail-modal-wrapper #detailLearningTimeEnd').val();
                editRecord.memo = $('.learning-record-detail-modal-wrapper #detailLearningMemo').val();


                // ダブルブッキングチェック
                let doubleBookingFlag = calenderDoubleBookingCheck(editRecord, id);

                // エラーがあれば表示、なければ登録処理
                if(doubleBookingFlag){
                    $('.modal-error').text('既に追加された予定と被ります．空いている時間に変更しましょう．');
                    // モーダルを1秒後に閉じる
                    $('.learning-record-detail-modal-wrapper').delay(2000).queue(function(){
                        $(this).removeClass('is-visible').dequeue();
                        $('.modal-error').text('');
                    });
                }else{                    
                    // 記録の編集
                    // Ajax通信
                    $.ajax({
                        url:'./../../php/learningRecord/updateRecord.php',
                        type:'POST',
                        data:{
                            'recordId': id,
                            'content': editRecord.content,
                            'recordDate': editRecord.date,
                            'recordTime': JSON.stringify(editRecord.time),
                            'memo': editRecord.memo
                        },
                        dataType: 'json'       
                    })
                    // Ajaxリクエストが成功した時発動
                    .done( (data) => {
                        calenderDataSet(editRecord, i, false);
                    })
                    // Ajaxリクエストが失敗した時発動
                    .fail( (data) => {
                        alert('編集に失敗しました');
                    })
                }
            });

            // 削除ボタン押されたら
            $('.learning-record-detail-modal-wrapper .learning-delete-button').off('click').one("click", function () {
                // 記録の削除
                // Ajax通信
                $.ajax({
                    url:'./../../php/learningRecord/deleteRecord.php',
                    type:'POST',
                    data:{
                        'recordId': id
                    },
                    dataType: 'json'       
                })
                // Ajaxリクエストが成功した時発動
                .done( (data) => {
                    calenderDataSet(selectRecord, false, i);
                })
                // Ajaxリクエストが失敗した時発動
                .fail( (data) => {
                    alert('削除に失敗しました');
                })
            });

            break;

        }
    }
}

/**
 * モーダルフォームの初期化
 * @param {array} plan 
 */
function initModalForm(){
    $('#learningContent').val('');
    $('#selectLearningContent').val('学習内容を選択');
    $('.input-learning-content').css('display', 'none');
    $('#inputLearningContent').val('');
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

function calenderDataSet(item, editFlag, deleteFlag){
    let id = item.id.slice(0,1);
    modules.initCalenderHtml.init($, calenderDate);

    if(id == 'L' || id == 'P'){  // 計画データ

        var afterPlans = JSON.parse(JSON.stringify(displayItems.plans));
        if(editFlag !== false){
            afterPlans.splice(Number(editFlag),1);
        }

        if(deleteFlag !== false){
            afterPlans.splice(Number(deleteFlag),1);
        }else{
            afterPlans.push(item);
        }
        
        // カレンダーセット
        modules.calenderItemSet.set(afterPlans, $);

        displayItems.plans = JSON.parse(JSON.stringify(afterPlans));
        // calcTotalLearningTime();    // 合計学習時間の算出

        if(editFlag === false && deleteFlag === false){
            $('.learning-plan-create-modal-wrapper').removeClass('is-visible');
            $('.private-plan-create-modal-wrapper').removeClass('is-visible');
        }else{
            $('.learning-plan-detail-modal-wrapper').removeClass('is-visible');
            $('.private-plan-detail-modal-wrapper').removeClass('is-visible');
        }

    }else{  // 記録データ

        var afterRecords = JSON.parse(JSON.stringify(displayItems.records));
        if(editFlag !== false){
            afterRecords.splice(Number(editFlag),1);
        }

        if(deleteFlag !== false){
            afterRecords.splice(Number(deleteFlag),1);
        }else{
            afterRecords.push(item);
        }
        
        // カレンダーセット
        modules.calenderItemSet.set(afterRecords, $);

        displayItems.records = JSON.parse(JSON.stringify(afterRecords));
        // calcTotalLearningTime();    // 合計学習時間の算出

        if(editFlag === false && deleteFlag === false){
            $('.learning-record-create-modal-wrapper').removeClass('is-visible');
        }else{
            $('.learning-record-detail-modal-wrapper').removeClass('is-visible');
        }

    }
}

/**
 * カレンダーの日付計算
 * @param {} settingId 
 */
function calcCalenderDate(settingId){
    for(data in historyData){
        if(historyData[data].settingId == settingId){
            let date = historyData[data].insertTime;
            // 指定した週の月曜日の日時取得
            let today = new Date(Number(date));
            let this_year = today.getFullYear();
            let this_month = today.getMonth()+1;
            let this_date = today.getDay();  // 今日の曜日
            if(this_date == 0) this_date =  7;  // 日曜日なら
            let this_monday = today.getDate() - this_date + 1;

            let calenderDateArray = [];
            let lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
            let diffForLastDate = lastDate - this_monday;
            let next_month = this_month+1;
            // 一桁0詰め処理
            if(String(this_month).length==1) this_month = '0' + this_month;
            if(String(next_month).length==1) next_month = '0' + next_month;

            if(diffForLastDate < 7){    // 月をまたぎそう

                for(let i=1; i<=(diffForLastDate+1); i++){
                    if(String(this_monday).length==1) this_monday = '0' + this_monday;
                    calenderDateArray.push({
                        year: this_year,
                        month: this_month,
                        date: this_monday
                    });
                    this_monday++;
                }
                for(let j=1; j<=(7-(diffForLastDate+1)); j++){
                    if(String(j).length==1) j = '0' + j;
                    calenderDateArray.push({
                        year: this_year,
                        month: next_month,
                        date: j
                    });
                }  
            }else{
                for(let i=0; i<7; i++){
                    if(String(this_monday).length==1) this_monday = '0' + this_monday;
                    calenderDateArray.push({
                        year: this_year,
                        month: this_month,
                        date: this_monday
                    });
                    this_monday++;
                }
            }

            return calenderDateArray;
        }
    }
}

function postPlan(plan){
    $.ajax({
        url:'./../../php/planCreate/postPlan.php',
        type:'POST',
        data:{
            'userId': window.sessionStorage.getItem(['userId']),
            'planId': plan.id,
            'settingId': selectSettingId,
            'content': plan.content,
            'planDate': plan.date,
            'planTime': JSON.stringify(plan.time),
            'memo': plan.memo,
            'tag': plan.tag,
            'learningFlag': plan.learningFlag
        },
        dataType: 'json'       
    })
    // Ajaxリクエストが成功した時発動
    .done( (data) => {
        calenderDataSet(plan, false, false);
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
        alert('登録に失敗しました');
    })
}


/**
 * ajax updatePlan
 * @param {*} editPlan 
 * @param {*} id 
 * @param {*} i 
 */
function updatePlan(editPlan, id, i){
    $.ajax({
        url:'./../../php/planCreate/postPlan.php',
        type:'POST',
        data:{
            'userId': window.sessionStorage.getItem(['userId']),
            'planId': editPlan.id,
            'settingId': selectSettingId,
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
            calenderDataSet(editPlan, i, false);
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
        calenderDataSet(deletePlan, false, i);
        return true;
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
        alert('削除に失敗しました');
        return false;
    })
}

function calenderDoubleBookingCheck(item, id){
    let checkId = id.slice(0,1);
    let doubleBookingFlag = false;

    if(checkId == 'L' || checkId == 'P'){

        for(var learningIndex = 0; learningIndex < displayItems.plans.length; learningIndex++){
            if(id !== displayItems.plans[learningIndex].id){
                if(displayItems.plans[learningIndex].date == item.date){
                    // 開始時間が既に作成された予定とダブる または　終了時間が既に作成された予定とダブる
                    if((displayItems.plans[learningIndex].time.start < item.time.start && displayItems.plans[learningIndex].time.end > item.time.start)
                    || (displayItems.plans[learningIndex].time.start < item.time.end && displayItems.plans[learningIndex].time.end > item.time.end)
                    || (displayItems.plans[learningIndex].time.start > item.time.start && displayItems.plans[learningIndex].time.end < item.time.end)
                    || (displayItems.plans[learningIndex].time.start == item.time.start && displayItems.plans[learningIndex].time.end == item.time.end)){
                        doubleBookingFlag = true;
                        break;
                    }
                }
            }
        } 
    }else{

        for(var learningIndex = 0; learningIndex < displayItems.records.length; learningIndex++){
            if(id !== displayItems.records[learningIndex].id){
                if(displayItems.records[learningIndex].date == item.date){
                    // 開始時間が既に作成された予定とダブる または　終了時間が既に作成された予定とダブる
                    if((displayItems.records[learningIndex].time.start < item.time.start && displayItems.records[learningIndex].time.end > item.time.start)
                    || (displayItems.records[learningIndex].time.start < item.time.end && displayItems.records[learningIndex].time.end > item.time.end)
                    || (displayItems.records[learningIndex].time.start > item.time.start && displayItems.records[learningIndex].time.end < item.time.end)
                    || (displayItems.records[learningIndex].time.start == item.time.start && displayItems.records[learningIndex].time.end == item.time.end)){
                        doubleBookingFlag = true;
                        break;
                    }
                }
            }
        } 
    }
    return doubleBookingFlag;
}