var flag = {
    planReferenceOpenFlag: false,  // 学習計画参考データ開閉フラグ
    planReferenceChartSetFlag: false,  // 学習計画参考データグラフセット
    learningSettingWindowShowFlag: true, // 学習の設定画面表示フラグ
    planCreateWindowShowFlag: false   // 計画の作成画面表示フラグ
};

var learningPlans = [], // 登録された学習計画
    privatePlans = [],  // 登録されたプライベート予定
    displayPlans = [], // 表示する予定
    settingData = {     // 設定情報
        coverage: "",   // 学習範囲
        understanding: "",  // 理解度
        goal: ""    // 目標点数
    },
    totalTime = 0;  // 合計学習時間


// 選択されたタグ色
var selectTag = '';

// モジュール設定
var modules = require('./module/moduleInit.js');
modules = modules.moduleInit();

var $ = modules.$; //jquery

$(function(){
    // 先週の学習の満足度が登録されているか確認
    let today = new Date();
    let month = today.getMonth();
    let this_date = today.getDay();  // 今日の曜日
    if(this_date == 0) this_date =  7;  // 日曜日なら
    let last_monday = today.getDate() - this_date - 6;
    let last_sunday = last_monday + 6;

    // 先週の月曜日の日時
    let last_monday_date = new Date(today.getFullYear(), month, last_monday, 0,0,0,0).getTime();
    // 先週の日曜日の日時
    let last_sunday_date = new Date(today.getFullYear(), month, last_sunday, 23,59,59,59).getTime();

    // Ajax通信
    $.ajax({
        url:'./../../php/planCreate/getSatisfaction.php',
        type:'POST',
        data:{
            'userId': window.sessionStorage.getItem(['userId']),
            'startDate': last_monday_date,
            'endDate': last_sunday_date
        },
        dataType: 'json'       
    })
    // Ajaxリクエストが成功した時発動
    .done( (data) => {
        if(data) {
            // 学習の振り返りモーダル表示
            learningSatisfactionModal(data);
        }
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
       
    })

    // 学習の設定情報の取得
    // 今週月曜日の日時取得
    let this_monday = today.getDate() - this_date + 1;
    let this_monday_date = new Date(today.getFullYear(), month, this_monday, 0,0,0,0).getTime();
    // Ajax通信
    $.ajax({
        url:'./../../php/planCreate/getSetting.php',
        type:'POST',
        data:{
            'userId': window.sessionStorage.getItem(['userId']),
            'startDate': this_monday_date
        },
        dataType: 'json'       
    })
    // Ajaxリクエストが成功した時発動
    .done( (data) => {
        // settingIdをsessionに保存
        window.sessionStorage.setItem(['settingId'],data[0].settingId);

        // 設定情報の格納
        settingData.coverage = data[0].coverage;
        settingData.understanding = data[0].understanding;
        settingData.goal = data[0].goal;

        // 変更ボタンを表示
        $('.learning-setting-edit-button').addClass('show');

        // 学習の計画作成画面表示
        planCreateWindowInit();

    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {

         // 学習の設定画面を表示状態にする
        $('#learning-setting-content').addClass('show');

         // 登録ボタンを表示
         $('.learning-setting-regist-button').addClass('show');

         // 計画の作成ボタンをdisable化する
         $(".plan-create-button").prop("disabled", true);
    })

    // 学習の設定画面の登録ボタンが押されたら
    $('.learning-setting-regist-button').click(function (){
        // 学習の設定情報の登録  
        // settingIdの生成
        let settingId = new Date().getTime().toString(16)  + Math.floor(1000*Math.random()).toString(16);
        // Ajax通信
        $.ajax({
            url:'./../../php/planCreate/postSetting.php',
            type:'POST',
            data:{
                'settingId': settingId,
                'userId': window.sessionStorage.getItem(['userId']),
                'coverage': $('#coverage').val(),
                'understanding': $('#understanding').val(),
                'goal': $('#goal').val(),
                'insertTime': new Date().getTime()
            },
            dataType: 'json'       
        })
        // Ajaxリクエストが成功した時発動
        .done( (data) => {
            // settingIdをsessionに保存
            window.sessionStorage.setItem(['settingId'], settingId);
            // 設定情報の格納
            settingData.coverage = $('#coverage').val();
            settingData.understanding = $('#understanding').val();
            settingData.goal = $('#goal').val();

            // 登録ボタンを非表示
            $('.learning-setting-regist-button').removeClass('show');
            // 変更ボタンを表示
            $('.learning-setting-edit-button').addClass('show');

            // 学習の計画作成画面表示
            planCreateWindowInit();

        })
        // Ajaxリクエストが失敗した時発動
        .fail( (data) => {
           alert('学習の設定情報の登録に失敗しました');
        });
    });

    // 学習の設定変更ボタンが押されたら
    $('.learning-setting-edit-button').click(function (){
        // 学習の設定情報の変更
        // Ajax通信
        $.ajax({
            url:'./../../php/planCreate/updateSetting.php',
            type:'POST',
            data:{
                'settingId': window.sessionStorage.getItem(['settingId']),
                'coverage': $('#coverage').val(),
                'understanding': $('#understanding').val(),
                'goal': $('#goal').val(),
                'insertTime': new Date().getTime()
            },
            dataType: 'json'       
        })
        // Ajaxリクエストが成功した時発動
        .done( (data) => {
            // 設定情報の格納
            settingData.coverage = $('#coverage').val();
            settingData.understanding = $('#understanding').val();
            settingData.goal = $('#goal').val();

            // 学習の計画作成画面表示
            planCreateWindowInit();

        })
        // Ajaxリクエストが失敗した時発動
        .fail( (data) => {
           alert('学習の設定情報の変更に失敗しました');
        });
    });

    // 学習の設定ボタンが押されたら
    $('.learning-setting-button').click(function (){
        learningSettingWindowInit();
    });

    // 計画の作成ボタンが押されたら
    $('.plan-create-button').click(function (){
        planCreateWindowInit();
    });

    // 学習の計画追加ボタンを押されたら
    $('#add-learning-plan').click(function (){
        learningPlanAdd();
    });

    // プライベートの予定追加ボタンを押されたら
    $('#add-private-plan').click(function (){
        privatePlanAdd();
    });

    // カレンダー内を押されたら
    $(document).on("click", ".calender-content", function () {
        var id = $(this).attr("id");
        if(id !== undefined){   //計画詳細表示の場合
            var category = id.slice(0,1);
            if(category === 'L'){
                learningPlanDetail(id);   //学習計画詳細表示
            }else{
                privatePlanDetail(id);  // プライベートの予定詳細表示
            }
        }
    });
    
    // 学習計画参考データボタンが押されたら
    $('.plan-reference-button').click(function(){
        flag.planReferenceOpenFlag = !flag.planReferenceOpenFlag;
        $('.plan-reference-item').slideToggle();
        
        if(flag.planReferenceOpenFlag){   //学習リスト開
            if(!flag.planReferenceChartSetFlag){
                // グラフ表示のためのデータ取得
                $.ajax({
                    url:'./../../php/planCreate/getReferenceData.php',
                    type:'POST',
                    data:{
                        'userId': window.sessionStorage.getItem(['userId']),
                        'settingId': window.sessionStorage.getItem(['settingId'])
                    },
                    dataType: 'json'       
                })
                // Ajaxリクエストが成功した時発動
                .done( (data) => {
                   if(data !== null){
                    let timeChartData = calcReferenceData(data); 
                    let chartLabels = [];
                    let chartData = {
                        'executing': [],
                        'achievement': [],
                        'satisfaction': []
                    };
                    for(let label of Object.keys(timeChartData)){
                            chartLabels.push(label);
                            chartData['executing'].push(timeChartData[label][0]);
                            chartData['achievement'].push(timeChartData[label][1]);
                            chartData['satisfaction'].push(timeChartData[label][2]);
                    }

                    // グラフの描画
                        var ctx = document.getElementById("planReferenceLine").getContext('2d');
                        var planReferenceLine = new modules.Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: chartLabels,
                                datasets: [
                                    {
                                        label: '計画実施率',
                                        data: chartData['executing'],
                                        backgroundColor: "#1E88E5",
                                        borderColor: '#64B5F6',
                                        fill: false,
                                        lineTension: 0
                                    },
                                    {
                                        label: '目標達成率',
                                        data: chartData['achievement'],
                                        backgroundColor: "#D81B60",
                                        borderColor: '#F06292',
                                        fill: false,
                                        lineTension: 0
                                    },
                                    {
                                        label: '学習満足率',
                                        data: chartData['satisfaction'],
                                        backgroundColor: "#C0CA33",
                                        borderColor: '#DCE775',
                                        fill: false,
                                        lineTension: 0
                                    }
                                ],
                            },
                            options:{
                                scales: {
                                    xAxes: [{
                                        scaleLabel: {                 // 軸ラベル
                                            display: true,                // 表示設定
                                            labelString: '1週間あたりの合計学習時間(分)',    // ラベル
                                        },
                                    }],
                                    yAxes: [{
                                        ticks: {
                                            callback: function(value){
                                                return value+'%';
                                            }
                                        }
                                        }]
                                }                            
                            }
                        });

                        var ctx = document.getElementById("planReferenceBar").getContext('2d');
                        var planReferenceBar = new modules.Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ["6:00〜12:00", "12:00〜18:00", "18:00〜24:00"],
                                datasets: [
                                    {
                                        label: '計画実施率',
                                        data: [90, 100, 30],
                                        backgroundColor: "#64B5F6"
                                    },
                                    {
                                        label: '目標達成率',
                                        data: [80, 90, 100],
                                        backgroundColor: "#F06292"
                                    },
                                    {
                                        label: '学習満足率',
                                        data: [30, 40, 100],
                                        backgroundColor: "#DCE775"
                                    }
                                ],
                            },
                            options:{
                                scales: {
                                    xAxes: [{
                                        scaleLabel: {                 // 軸ラベル
                                            display: true,                // 表示設定
                                            labelString: '学習時間帯',    // ラベル
                                        },
                                    }],
                                    yAxes: [{
                                        ticks: {
                                            callback: function(value){
                                                return value+'%';
                                            }
                                        }
                                        }]
                                }                            
                            }
                        });
                        flag.planReferenceChartSetFlag = true;
                    }else{
                        alert('参考データが不足しているため表示できません');
                    }
                })
                // Ajaxリクエストが失敗した時発動
                .fail( (data) => {
                   alert('参考データの取得に失敗しました');
                });
            }
        }else{  //学習リスト閉
        }
	});
});

/**
 * 学習満足度の登録
 */
function learningSatisfactionModal(data){
    let settingId = data.settingId;
    let goal = data.goal;
    let executing = 0;

    $('.learning-satisfaction-modal-wrapper').addClass('is-visible');    // 学習満足度モーダルの表示
    
    // 計画進捗率を算出するために計画と記録を取得
    $.ajax({
        url:'./../../php/learningHistory/getPlanAndRecord.php',
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
            let plans = data.plan;
            let records = data.record;
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
           
            executing = calcExecuting(plans, records);
        }
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
       
    });

    // 完了ボタンが押されたら
    $('.learning-satisfaction-complete-button').click(function (){

        // 目標達成の算出
        let achievement = '達成';
        if($('#testScore').val() < goal){
            achievement = '未達成';
        }
        // Ajax通信
        $.ajax({
            url:'./../../php/planCreate/postSatisfaction.php',
            type:'POST',
            data:{
                'userId': window.sessionStorage.getItem(['userId']),
                'satisfaction': $('#learningSatisfaction').val(),
                'achievement': achievement,
                'executing': executing,
                'settingId': settingId
            },
            dataType: 'json'       
        })
        // Ajaxリクエストが成功した時発動
        .done( (data) => {
            // 学習満足度モーダルを閉じる
            $('.learning-satisfaction-modal-wrapper').removeClass('is-visible');
        })
        // Ajaxリクエストが失敗した時発動
        .fail( (data) => {
           alert('学習満足度の登録に失敗しました');
        });
    });    
}
/**
 * 学習の設定画面の初期化
 */
function learningSettingWindowInit(){
    flag.learningSettingWindowShowFlag = true;
    flag.planCreateWindowShowFlag = false;
    referenceDataStateSet();
    headerMenuStateSet();

    // フォームの値設定
    $('#coverage').val(settingData.coverage);
    $('#understanding').val(settingData.understanding);
    $('#goal').val(settingData.goal);
}

/**
 * 計画の作成画面の初期化
 */
function planCreateWindowInit(){
    flag.planCreateWindowShowFlag = true;
    flag.learningSettingWindowShowFlag = false;
    referenceDataStateSet();
    headerMenuStateSet();

     // html読み込み
     modules.initCalenderHtml.init($);

     // 計画の作成ボタンのdisable化を解除する
     $(".plan-create-button").prop("disabled", false);    

    if(displayPlans.length == 0){
        // Ajax通信
        $.ajax({
            url:'./../../php/planCreate/getPlan.php',
            type:'POST',
            data:{
                'userId': window.sessionStorage.getItem(['userId']),
                'settingId': window.sessionStorage.getItem(['settingId'])
            },
            dataType: 'json'       
        })
        // Ajaxリクエストが成功した時発動
        .done( (plans) => {
            if(plans.length > 0){
                for(let i in plans){
                    plans[i].id = plans[i].planId; 
                    plans[i].date = plans[i].planDate;
                    plans[i].time = JSON.parse(plans[i].planTime);
                    if(plans[i].learningFlag == "true"){
                        learningPlans.push(plans[i]);
                    }else{
                        privatePlans.push(plans[i]);
                    }
                }
                // カレンダー表示用配列に結合
                displayPlans = learningPlans.concat(privatePlans);
                // カレンダーセット
                modules.calenderItemSet.set(displayPlans, $);
                // 合計学習時間の算出
                calcTotalLearningTime();
            }
        })
        // Ajaxリクエストが失敗した時発動
        .fail( (data) => {
        })
    }
    // カレンダーセット
    modules.calenderItemSet.set(displayPlans, $);
}

/**
 * 参考データ状態設定
 */
function referenceDataStateSet(){
    if(flag.learningSettingWindowShowFlag){
        // 参考データ非表示
        $('.plan-reference-button').removeClass('show');
    }else{
        // 学習リストと学習計画参考データを表示
        $('.plan-reference-button').addClass('show');
    }

    // 学習計画参考データの表示初期化
    if(flag.planReferenceOpenFlag){
        flag.planReferenceOpenFlag = false;
        flag.planReferenceChartSetFlag = false;
        $('.plan-reference-item').css('display', 'none');
    }

}

/**
 * ヘッダメニュー状態設定
 */
function headerMenuStateSet(){
    // 学習の設定画面が表示中なら
    if(flag.learningSettingWindowShowFlag){
        $('#learning-setting-content').addClass('show');    // 学習の設定画面を表示状態にする
        $('.learning-setting-button').removeClass('unselected');  // 学習の設定ボタンを選択状態にする
    }else{
        $('#learning-setting-content').removeClass('show');    // 学習の設定画面を非表示状態にする
        $('.learning-setting-button').addClass('unselected');  // 学習の設定ボタンを非選択状態にする
    } 
    
    // 計画の作成画面が表示中なら
    if(flag.planCreateWindowShowFlag){
        $('#plan-create-content').addClass('show');  // 計画の作成画面を表示状態にする
        $('.plan-create-button').removeClass('unselected');    // 計画の作成ボタンを選択状態にする
    }else{
        $('#plan-create-content').removeClass('show');  // 計画の作成画面を非表示状態にする
        $('.plan-create-button').addClass('unselected');    // 計画の作成ボタンを非選択状態にする
    }
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
    $('.learning-add-button').one("click", function() {

        let plan = {};
        plan.time = {};

        //  入力内容の取得
        plan.content = $('#learningContent').val();
        plan.date = $('#learningDate').val();
        plan.time.start = $('#learningTimeStart').val();
        plan.time.end = $('#learningTimeEnd').val();
        plan.memo = $('#learningMemo').val();
        plan.learningFlag = true;

        // idの設定
        plan.id = 'L' + new Date().getTime();

        // フォームの値チェック
        let errorMessage = modules.formValueCheck.check(plan);

        // ダブルブッキングチェック
        let doubleBookingFlag = planDoubleBookingCheck(plan, plan.id);
        if(doubleBookingFlag){
            errorMessage.push('既に追加された予定と被ります．空いている時間に変更しましょう．');
        }

        // エラーがあれば表示、なければ登録処理
        if(errorMessage.length !== 0){
            for(let i in errorMessage){
                $('.modal-error').append(errorMessage[i] + '<br>');
            }
            // モーダルを1秒後に閉じる
            $('.learning-plan-create-modal-wrapper').delay(2000).queue(function(){
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
    $('.private-add-button').click(function () {
        $('.private-plan-create-modal-wrapper').removeClass('is-visible');    //モーダル閉じる

        let plan = {};
        plan.time = {};

        //  入力内容の取得
        plan.content = "";
        plan.date = $('#privateDate').val();
        plan.time.start = $('#privateTimeStart').val();
        plan.time.end = $('#privateTimeEnd').val();
        plan.tag = selectTag;
        plan.memo = $('#privateMemo').val();
        plan.learningFlag = false;

        // idの設定
        plan.id = 'P' + new Date().getTime();  

        // フォームの値チェック
        let errorMessage = modules.formValueCheck.check(plan);

        // ダブルブッキングチェック
        let doubleBookingFlag = planDoubleBookingCheck(plan, plan.id);
        if(doubleBookingFlag){
            errorMessage.push('既に追加された予定と被ります．空いている時間に変更しましょう．');
        }

        // エラーがあれば表示、なければ登録処理
        if(errorMessage.length !== 0){
            for(let i in errorMessage){
                $('.modal-error').append(errorMessage[i] + '<br>');
            }
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

/**
 * 学習計画詳細表示
 */
function learningPlanDetail(id){
    for(var i=0; i<learningPlans.length; i++){
        if(learningPlans[i].id == id){ //選択した計画データ一致
            let selectPlan = learningPlans[i];
            $('.learning-plan-detail-modal-wrapper').addClass('is-visible');    //学習計画詳細モーダル表示

            // 日付が過ぎた計画は編集・削除ができないようにする
            let today = new Date().getTime();   // 現在の日時を取得
            let planDate = selectPlan.date.split('-');    // 選択した計画の年、月、日を取得
            let planTime = selectPlan.time.start.split(':');  // 時、分を取得
            planDate = new Date(planDate[0], planDate[1]-1, planDate[2], planTime[0], planTime[1], 0,0).getTime();

            if(today >= planDate){  // 選択した計画が現在の日時を過ぎている場合は編集・削除ボタンをdisabledする
                $('.detail-modal-footer-button button').prop('disabled', true);
            }else{
                $('.detail-modal-footer-button button').prop('disabled', false);
            }

            // キャンセルボタン押されたら
            $('.header-cansel-button').click(function () {
                $('.learning-plan-detail-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
            });

            // フォームの値セット
            $('#detailLearningContent').val(selectPlan.content);
            $('#detailLearningDate').val(selectPlan.date);
            $('#detailLearningTimeStart').val(selectPlan.time.start);
            $('#detailLearningTimeEnd').val(selectPlan.time.end);
            $('#detailLearningMemo').val(selectPlan.memo);

            // TODO: 予定編集処理
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

/**
 * プライベートの予定詳細表示
 */
function privatePlanDetail(id){
    for(var i=0; i<privatePlans.length; i++){
        if(privatePlans[i].id == id){ //選択した計画データ一致
            let selectPlan = privatePlans[i];
            $('.private-plan-detail-modal-wrapper').addClass('is-visible');    //プライベートの予定詳細モーダル表示

            // キャンセルボタン押されたら
            $('.header-cansel-button').click(function () {
                 // タグ初期化
                 $('.tag').removeClass('active');// タグ選択状態を全解除
                $('.private-plan-detail-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
            });

            // フォームの値セット
            $('#detailPrivateDate').val(selectPlan.date);
            $('#detailPrivateTimeStart').val(selectPlan.time.start);
            $('#detailPrivateTimeEnd').val(selectPlan.time.end);
            $('#detailPrivateMemo').val(selectPlan.memo);

            // タグボタンを押されたら
            $('.tag').click(function (){
                selectTag =  $(this).attr("id");    //選択されたタグ色取得
                $('.tag').removeClass('active');// タグ選択状態を全解除
                $(this).addClass('active'); //選択したタグを選択状態にセット
            });

            // TODO: 予定編集処理
            // 編集ボタン押されたら
            $('.private-edit-button').one("click", function () {
                $('.private-plan-detail-modal-wrapper').removeClass('is-visible');    //モーダル閉じる

                let editPlan = {};
                editPlan.time = {};

                //  入力内容の取得
                editPlan.date = $('#detailPrivateDate').val();
                editPlan.time.start = $('#detailPrivateTimeStart').val();
                editPlan.time.end = $('#detailPrivateTimeEnd').val();
                editPlan.memo = $('#detailPrivateMemo').val();
                editPlan.tag = selectTag;
                editPlan.learningFlag = false;

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
            $('.private-delete-button').one("click", function () {
                deletePlan(selectPlan, id, i);
            });
            break;
        }
    }
}

function planDoubleBookingCheck(plan, id){

    var doubleBookingFlag = false;

    for(var learningIndex = 0; learningIndex < displayPlans.length; learningIndex++){
        if(id !== displayPlans[learningIndex].id){
            if(displayPlans[learningIndex].date == plan.date){
                // 開始時間が既に作成された予定とダブる または　終了時間が既に作成された予定とダブる
                if((displayPlans[learningIndex].time.start < plan.time.start && displayPlans[learningIndex].time.end > plan.time.start)
                || (displayPlans[learningIndex].time.start < plan.time.end && displayPlans[learningIndex].time.end > plan.time.end)
                || (displayPlans[learningIndex].time.start > plan.time.start && displayPlans[learningIndex].time.end < plan.time.end)
                || (displayPlans[learningIndex].time.start == plan.time.start && displayPlans[learningIndex].time.end == plan.time.end)){
                    doubleBookingFlag = true;
                    break;
                }
            }
        }
    } 

    return doubleBookingFlag;
}

function planDataSet(plan, learningFlag, editFlag, deleteFlag){
    if(learningFlag){
        
        modules.initCalenderHtml.init($);

        var afterLearningPlans = JSON.parse(JSON.stringify(learningPlans));
        if(editFlag !== false){
            afterLearningPlans.splice(Number(editFlag),1);
        }

        if(deleteFlag !== false){
            afterLearningPlans.splice(Number(deleteFlag),1);
        }else{
            afterLearningPlans.push(plan);
        }

        displayPlans = afterLearningPlans.concat(privatePlans);
        
        // カレンダーセット
        modules.calenderItemSet.set(displayPlans, $);

        learningPlans = JSON.parse(JSON.stringify(afterLearningPlans));
        calcTotalLearningTime();    // 合計学習時間の算出

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

        displayPlans = afterPrivatePlans.concat(learningPlans);

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
 * ajax postPlan
 */
function postPlan(plan){
    $.ajax({
        url:'./../../php/planCreate/postPlan.php',
        type:'POST',
        data:{
            'userId': window.sessionStorage.getItem(['userId']),
            'planId': plan.id,
            'settingId': window.sessionStorage.getItem(['settingId']),
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
        planDataSet(plan, plan.learningFlag, false, false);
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
            'settingId': window.sessionStorage.getItem(['settingId']),
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


function calcTotalLearningTime(){
    totalTime = 0;
    for(let i in learningPlans){
        let start = learningPlans[i].time.start.split(':') // 開始時の取得
        let end = learningPlans[i].time.end.split(':') // 最後時の取得
        totalTime += (Number(end[0]) * 60 + Number(end[1])) - (Number(start[0]) * 60 + Number(start[1]));
    }
    $('.totalLearningTime').text('学習時間: ' + totalTime + '分');
}


function calcExecuting(plans, records){
    let sum = 0;
    let matchCount = 0;
    records.push({content: "スライド作成", recordDate: "2019-05-21", recordTime: '{\"start\":\"13:00\",\"end\":\"18:00\"}'});
    records.push({content: "スライド作成", recordDate: "2019-05-24", recordTime: "{\"start\":\"09:00\",\"end\":\"12:00\"}"});
    // 計画進捗率の計算
    for(let plan in plans){
        sum++;
        let matchFlag = false;
        for(let record in records){
            if(plans[plan].content == records[record].content && plans[plan].planDate == records[record].recordDate && plans[plan].planTime == records[record].recordTime){
                matchFlag = true;
                break;
            }
        }
        if(matchFlag){
            matchCount++;
        }
    }

    return Math.round(matchCount / sum * 100);
}

function calcReferenceData(data){
    let minTime = 10000;
    let maxTime = 0;
    for(let i of Object.keys(data)){
        let records = data[i].record;
        let totalTime = 0;

        // 記録データごとに合計学習時間を算出する
        for(let record of records){
            // 学習時間
            let start = JSON.parse(record.recordTime).start.split(':') // 開始時の取得
            let end = JSON.parse(record.recordTime).end.split(':') // 最後時の取得
            totalTime += Math.round(((Number(end[0]) * 60 + Number(end[1])) - (Number(start[0]) * 60 + Number(start[1]))) / 10) * 10;
        }
        data[i].totalTime = totalTime;   
        if(minTime > totalTime) minTime = totalTime;
        if(maxTime < totalTime) maxTime = totalTime;
    }

    // 合計学習時間を6分割する
    maxTime = 1000; //テストデータ
    let deffTime = maxTime - minTime;
    let separateTime = Math.round((deffTime / 6) / 10) * 10;
    
    // 分割した学習時間ごとにデータ分け
    let baseTime = minTime;
    let timeChartData = {};
    for(let i=1; i<=6; i++){
        let count = 0;
        let executing = 0;
        let achievement = 0;
        let satisfaction = 0;
        for(let key of Object.keys(data)){
            timeChartData[baseTime] = [];
            if(data[key].totalTime < baseTime + separateTime && data[key].totalTime >= baseTime){
                executing += Number(data[key].reference.executing);
                achievement += Number(data[key].reference.achievement);
                satisfaction += Number(data[key].reference.satisfaction);
                count++;
            }
        }
        if(count !== 0){
            timeChartData[baseTime].push(executing / count);
            timeChartData[baseTime].push(achievement / count);
            timeChartData[baseTime].push(satisfaction / count);
        }else{
            timeChartData[baseTime].push(0);
            timeChartData[baseTime].push(0);
            timeChartData[baseTime].push(0);
        }

        baseTime += separateTime;
    }

    return timeChartData;

}