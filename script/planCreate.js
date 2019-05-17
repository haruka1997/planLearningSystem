var plan = {
    planId: 0,
    content: "",
    planDate: "",
    planTime: {
        start: 0,
        end: 0
    },
    tag: "",
    memo: "",
    learningFlag: true
};
var editPlan = {
    planId: 0,
    content: "",
    planDate: "",
    planTime: {
        start: 0,
        end: 0
    },
    tag: "",
    memo: "",
    learningFlag: true
};

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
    }


// 選択されたタグ色
var selectTag = '';

// カレンダーセットモジュール
var calenderItemSet = require(`./module/calenderItemSet.js`);
// Ajaxモジュール
var ajax = require(`./module/ajax.js`);

$(function(){

    // html読み込み
    initCalenderHtml();

    // 学習の設定情報の取得
    // 今週月曜日の日時取得
    let today = new Date();
    let month = today.getMonth()+1;
    let this_monday = today.getDate() - today.getDay() + 1;
    let start_date = new Date(today.getFullYear(), month, this_monday, 0,0,0,0).getTime();
    // Ajax通信
    $.ajax({
        url:'./../../php/planCreate/getSetting.php',
        type:'POST',
        data:{
            'userId': window.sessionStorage.getItem(['userId']),
            'startDate': start_date
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
        // 学習の振り返りモーダル表示
        learningSatisfactionModal();

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
        var planId = $(this).attr("id");
        if(planId !== undefined){   //計画詳細表示の場合
            var category = planId.slice(0,1);
            if(category === 'L'){
                learningPlanDetail(planId);   //学習計画詳細表示
            }else{
                privatePlanDetail(planId);  // プライベートの予定詳細表示
            }
        }
    });
    
    // 学習計画参考データボタンが押されたら
    $('.plan-reference-button').click(function(){
        flag.planReferenceOpenFlag = !flag.planReferenceOpenFlag;
        $('.plan-reference-item').slideToggle();
        
        if(flag.planReferenceOpenFlag){   //学習リスト開
            $('.plan-reference-button i').text('keyboard_arrow_down');
            if(!flag.planReferenceChartSetFlag){
                var ctx = document.getElementById("planReferenceLine").getContext('2d');
                var planReferenceLine = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ["10分", "20分", "30分", "40分", "50分", "60分"],
                        datasets: [
                            {
                                label: '計画実施率',
                                data: [100, 90, 60, 70, 80, 100],
                                backgroundColor: "#1E88E5",
                                borderColor: '#64B5F6',
                                fill: false,
                                lineTension: 0
                            },
                            {
                                label: '目標達成率',
                                data: [90, 80, 50, 40, 80, 90],
                                backgroundColor: "#D81B60",
                                borderColor: '#F06292',
                                fill: false,
                                lineTension: 0
                            },
                            {
                                label: '学習満足率',
                                data: [80, 70, 50, 30, 20, 90],
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
                                    labelString: '学習時間',    // ラベル
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
                var planReferenceBar = new Chart(ctx, {
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
            }
        }else{  //学習リスト閉
            $('.plan-reference-button i').text('keyboard_arrow_right');
        }
	});
});

/**
 * 学習満足度の登録
 */
function learningSatisfactionModal(){

    $('.learning-satisfaction-modal-wrapper').addClass('is-visible');    // 学習満足度モーダルの表示

    // キャンセルボタン押されたら
    $('.header-cansel-button').click(function () {
        $('.learning-satisfaction-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
    });

    // 完了ボタンが押されたら
    $('.learning-satisfaction-complete-button').click(function (){
         // 学習満足度モーダルを閉じる
        $('.learning-satisfaction-modal-wrapper').removeClass('is-visible');
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
                    plans[i].planTime = JSON.parse(plans[i].planTime);
                    if(plans[i].learningFlag){
                        learningPlans.push(plans[i]);
                    }else{
                        privatePlans.push(plans[i]);
                    }
                }
                // カレンダー表示用配列に結合
                displayPlans = learningPlans.concat(privatePlans);
                // カレンダーセット
                calenderItemSet.set(displayPlans);
            }
        })
        // Ajaxリクエストが失敗した時発動
        .fail( (data) => {
        })
    }
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
        $('.plan-reference-button i').text('keyboard_arrow_right');
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
        initModalForm(true);
    });

    // 追加ボタン押されたら
    $('.learning-add-button').one("click", function() {

        //  入力内容の取得
        plan.content = $('#learningContent').val();
        plan.planDate = $('#learningDate').val();
        plan.planTime.start = $('#learningTimeStart').val();
        plan.planTime.end = $('#learningTimeEnd').val();
        plan.memo = $('#learningMemo').val();
        plan.learningFlag = true;

        // idの設定
        plan.planId = 'L' + new Date().getTime();

        // ダブルブッキングチェック
        var doubleBookingFlag = planDubleBookingCheck(plan, plan.planId);

        if(doubleBookingFlag){
            $('.modal-error').text('既に追加された予定と被ります．空いている時間に変更しましょう．');
            // モーダルを1秒後に閉じる
            $('.learning-plan-create-modal-wrapper').delay(2000).queue(function(){
                $(this).removeClass('is-visible').dequeue();
                 // モーダル初期化
                initModalForm(plan.learningFlag);
            });
        }else{
            // Ajax通信 計画情報をDBに追加
            var flag = new Promise(function(resolve){
                resolve(ajax.postPlan(plan));
            })
            if(flag){
                planDataSet(plan, plan.learningFlag, false, false);
            }
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

        //  入力内容の取得
        plan.content = "";
        plan.planDate = $('#privateDate').val();
        plan.planTime.start = $('#privateTimeStart').val();
        plan.planTime.end = $('#privateTimeEnd').val();
        plan.tag = selectTag;
        plan.memo = $('#privateMemo').val();
        plan.learningFlag = false;

        // idの設定
        plan.planId = 'P' + new Date().getTime();

        // ダブルブッキングチェック
        var doubleBookingFlag = planDubleBookingCheck(plan, plan.planId);

        if(doubleBookingFlag){
            $('.modal-error').text('既に追加された予定と被ります．空いている時間に変更しましょう．');
             // モーダルを1秒後に閉じる
             $('.private-plan-create-modal-wrapper').delay(2000).queue(function(){
                $(this).removeClass('is-visible').dequeue();
                // モーダル初期化
                initModalForm(plan.learningFlag);
            });
        }else{
            var flag = new Promise(function(resolve){
                resolve(ajax.postPlan(plan));
            })
            if(flag){
                planDataSet(plan, plan.learningFlag, false, false);
            }
        }

    });
}

/**
 * モーダルフォームの初期化
 * @param {array} plan 
 */
function initModalForm(learningFlag){
    if(learningFlag){
        $('#learningContent').val('');
        $('#learningDate').val('');
        $('#learningTimeStart').val('');
        $('#learningTimeEnd').val('');
        $('#learningMemo').val('');
    }else{
        $('#privateDate').val('');
        $('#privateTimeStart').val('');
        $('#privateTimeEnd').val('');
        $('#privateTimeEnd').val('');
        $('.tag').removeClass('active');
        $('#privateMemo').val('');
    }
    $('.modal-error').text('');
}

function initCalenderHtml(){
    if($("#plan-create-content").find('.calender')){
        $(".calender").remove();
    }
    var calender = require('./../view/common/calender.html');
    $("#plan-create-content").append(calender);
}


/**
 * 学習計画詳細表示
 */
function learningPlanDetail(planId){
    for(var i=0; i<learningPlans.length; i++){
        if(learningPlans[i].planId == planId){ //選択した計画データ一致
            var plan = learningPlans[i];
            $('.learning-plan-detail-modal-wrapper').addClass('is-visible');    //学習計画詳細モーダル表示

            // キャンセルボタン押されたら
            $('.header-cansel-button').click(function () {
                $('.learning-plan-detail-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
            });

            // フォームの値セット
            $('#detailLearningContent').val(plan.content);
            $('#detailLearningDate').val(plan.planDate);
            $('#detailLearningTimeStart').val(plan.planTime.start);
            $('#detailLearningTimeEnd').val(plan.planTime.end);
            $('#detailLearningMemo').val(plan.memo);

            // TODO: 予定編集処理
            // 編集ボタン押されたら
            $('.learning-edit-button').one("click", function () {

                //  入力内容の取得
                editPlan.content = $('#detailLearningContent').val();
                editPlan.planDate = $('#detailLearningDate').val();
                editPlan.planTime.start = $('#detailLearningTimeStart').val();
                editPlan.planTime.end = $('#detailLearningTimeEnd').val();
                editPlan.memo = $('#detailLearningMemo').val();
                editPlan.learningFlag = true;

                // ダブルブッキングチェック
                var doubleBookingFlag = planDubleBookingCheck(editPlan, planId);

                if(doubleBookingFlag){
                    $('.modal-error').text('既に追加された予定と被ります．空いている時間に変更しましょう．');
                    // モーダルを1秒後に閉じる
                    $('.learning-plan-detail-modal-wrapper').delay(2000).queue(function(){
                        $(this).removeClass('is-visible').dequeue();
                        // モーダル初期化
                        initModalForm(editPlan.learningFlag);
                    });
                }else{
                    editPlan.planId = 'L' + new Date().getTime();
                    // 編集後の計画を追加
                    var insertFlag = new Promise(function(resolve){
                        resolve(ajax.postPlan(editPlan));
                    })
                    // 編集された計画に編集フラグを立てる
                    var updateFlag = new Promise(function(resolve){
                        resolve(ajax.updatePlan(editPlan, planId));
                    })
                    if(insertFlag && updateFlag){
                        planDataSet(editPlan, editPlan.learningFlag, i, false, false);
                    }
                }
                
            });

            // 学習計画の削除ボタンを押されたら
            $('.learning-delete-button').one("click", function () {
                var deleteFlag = new Promise(function(resolve){
                    resolve(ajax.deletePlan(planId));
                })
                if(deleteFlag){
                    planDataSet(editPlan, true, false, i);
                }
            });

            break;
        }
    }
}

/**
 * プライベートの予定詳細表示
 */
function privatePlanDetail(planId){
    for(var i=0; i<privatePlans.length; i++){
        if(privatePlans[i].planId == planId){ //選択した計画データ一致
            var plan = privatePlans[i];
            $('.private-plan-detail-modal-wrapper').addClass('is-visible');    //プライベートの予定詳細モーダル表示

            // キャンセルボタン押されたら
            $('.header-cansel-button').click(function () {
                $('.private-plan-detail-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
            });

            // フォームの値セット
            $('#detailPrivateDate').val(plan.planDate);
            $('#detailPrivateTimeStart').val(plan.planTime.start);
            $('#detailPrivateTimeEnd').val(plan.planTime.end);
            $('#detailPrivateMemo').val(plan.memo);
            $('#' + plan.tag).addClass('active');

            // TODO: 予定編集処理
            // 編集ボタン押されたら
            $('.private-edit-button').one("click", function () {
                $('.private-plan-detail-modal-wrapper').removeClass('is-visible');    //モーダル閉じる

                //  入力内容の取得
                editPlan.planDate = $('#detailPrivateDate').val();
                editPlan.planTime.start = $('#detailPrivateTimeStart').val();
                editPlan.planTime.end = $('#detailPrivateTimeEnd').val();
                editPlan.memo = $('#detailPrivateMemo').val();
                editPlan.tag = selectTag;
                editPlan.learningFlag = false;

                // ダブルブッキングチェック
                var doubleBookingFlag = planDubleBookingCheck(editPlan, planId);

                if(doubleBookingFlag){
                    $('.modal-error').text('既に追加された予定と被ります．空いている時間に変更しましょう．');
                    // モーダルを1秒後に閉じる
                    $('.private-plan-detail-modal-wrapper').delay(2000).queue(function(){
                        $(this).removeClass('is-visible').dequeue();
                        // モーダル初期化
                        initModalForm(editPlan.learningFlag);
                    });
                }else{
                    editPlan.planId = 'P' + new Date().getTime();
                    planDataSet(editPlan, editPlan.learningFlag, i, false);
                }

            });

            // プライベートの予定の削除ボタンを押されたら
            $('.private-delete-button').one("click", function () {
                var deleteFlag = new Promise(function(resolve){
                    resolve(ajax.deletePlan(planId));
                })
                if(deleteFlag){
                    planDataSet(editPlan, false, false, i);
                }
            });
            break;
        }
    }
}

function planDubleBookingCheck(plan, planId){
    var doubleBookingFlag = false;
    // 学習計画とのダブりチェック
    for(var learningIndex = 0; learningIndex < learningPlans.length; learningIndex++){
        if(planId !== learningPlans[learningIndex].planId){
            if(learningPlans[learningIndex].planDate == plan.planDate){
                // 開始時間が既に作成された予定とダブる または　終了時間が既に作成された予定とダブる
                if((learningPlans[learningIndex].planTime.start < plan.planTime.start && learningPlans[learningIndex].planTime.end > plan.planTime.start)
                || (learningPlans[learningIndex].planTime.start < plan.planTime.end && learningPlans[learningIndex].planTime.end > plan.planTime.end)
                || (learningPlans[learningIndex].planTime.start == plan.planTime.start && learningPlans[learningIndex].planTime.end == plan.planTime.end)){
                    doubleBookingFlag = true;
                    break;
                }
            }
        }
    } 

    // プライベートの予定とのダブりチェック
    for(var privateIndex = 0; privateIndex < privatePlans.length; privateIndex++){
        if(planId !== privatePlans[privateIndex].planId){
            if(privatePlans[privateIndex].planDate == plan.planDate){
                // 開始時間が既に作成された予定とダブる または　終了時間が既に作成された予定とダブる
                if((privatePlans[privateIndex].planTime.start < plan.planTime.start && privatePlans[privateIndex].planTime.end > plan.planTime.start)
                || (privatePlans[privateIndex].planTime.start < plan.planTime.end && privatePlans[privateIndex].planTime.end > plan.planTime.end)
                || (privatePlans[privateIndex].planTime.start == plan.planTime.start && privatePlans[privateIndex].planTime.end == plan.planTime.end)){
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
        
        initCalenderHtml();

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
        calenderItemSet.set(displayPlans);

        learningPlans = JSON.parse(JSON.stringify(afterLearningPlans));

        if(editFlag === false && deleteFlag === false){
            $('.learning-plan-create-modal-wrapper').removeClass('is-visible');
        }else{
            $('.learning-plan-detail-modal-wrapper').removeClass('is-visible');
        }

    }else{

        initCalenderHtml();

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
        calenderItemSet.set(displayPlans);
        
        privatePlans = JSON.parse(JSON.stringify(afterPrivatePlans));

        if(editFlag === false && deleteFlag === false){
            $('.private-plan-create-modal-wrapper').removeClass('is-visible');
        }else{
            $('.private-plan-detail-modal-wrapper').removeClass('is-visible');
        }
    }
}
