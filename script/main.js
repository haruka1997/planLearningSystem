// モジュール設定
var modules = require('./module/moduleInit.js');
modules = modules.mainSet();

const escape = modules.htmlescape.escape;   //htmlエスケープモジュール

let selectButton = '計画と記録';
let displayItems = {
    plans: [],
    records: []
};
let historyData = [];
let selectHistoryData = {};
let selectSettingId = undefined;
let displayCalenderDate = '';
let calenderDate = [];
let chartData = {};

$(function(){

    // テーブルに表示するデータの取得
    getHistoryData();
    // グラフ表示
    displayChartHistory();

    // DOMの初期設定
    initDOM();
});

/**
 * DOMの初期設定
 */
function initDOM(){

    // テーブル内を選択されたら
    $(document).on("click", ".learning-history-tbody tr", function () {
        if(selectSettingId !== $(this).attr('id') && $(this).attr('id') !== undefined){
            selectSettingId = $(this).attr('id'); // 選択した項目のsettingIdを取得
            for(let data of historyData){
                if(data.settingId == selectSettingId){
                    selectHistoryData = data;
                    displayCalenderDate = selectHistoryData.classDate;
                }
            }
            changeTableColor(); // 選択した項目の背景色変更
            getCalenderItem();  // カレンダーに表示するアイテムの取得
        }
    });

    // テーブルの登録するボタンをクリックされたら
    // $(document).on("click", ".learning-history-tbody td .history-regist-button", function () {
    //     displayHistoryDetail($(this).attr('id'));  // 学習履歴の詳細表示
    // });

    // 計画の振り返りの登録ボタンをクリックされたら
     $(document).on("click", ".learning-history-tbody td .regist-reflection-button", function () {
        displayReflection($(this).attr('id'));  // 計画の振り返り画面表示
    });

    // 計画の振り返りの履歴ボタンをクリックされたら
    $(document).on("click", ".learning-history-tbody td .reflection-history-button", function () {
        displayReflectionDetail($(this).attr('id'));　// 振り返り履歴画面に遷移
    });

    // 学習の振り返りの登録ボタンをクリックされたら
    $(document).on("click", ".learning-history-tbody td .history-chatbot-button", function () {
        displayChatbotSystem($(this).attr('id'));  // 学習履歴の詳細表示
    });

    // テーブルのTAコメントボタンが押されたら
    // $(document).on("click", ".learning-history-tbody td .display-comment-button", function () {
    //     displayComment($(this).attr('id'));  // コメントの表示
    // });

    // 学習の振り返りの履歴をクリックされたら
    $(document).on("click", ".learning-history-tbody td .chatbot-history-comp-button", function () {
        window.open('https://tkg-lab.tk/chatbot/page/lesson/2020b/history/index.php');　// 振り返り履歴画面に遷移
    });


    // テーブルの詳細ボタンをクリックされたら
    $(document).on("click", ".learning-history-tbody .history-detail-button", function () {
        displayHistoryDetail($(this).attr('id'));  // 学習履歴の詳細表示
    });

    // ラジオボタン切り替え
    // TODO: DOM要素の見直し(クラスで指定するなど)
    $( 'input[name="options"]:radio' ).change( function() {
        selectButton = $(this).val(); // 選択したボタンの取得
        displayCalender(); // カレンダー表示
    });

    // カレンダー内を押されたら
    $(document).on("click", ".calender-content", function () {
        let id = $(this).attr("id"); // 選択されたアイテムのIDを取得
        if(id !== undefined){
            let category = id.slice(0,1);   // IDの先頭文字を取得(L:学習計画, R:学習記録)
            if(category === 'L'){   // 学習記録詳細表示
                displayLearningPlanDetail(id);
            }else{
                displayLearningRecordDetail(id);   // 学習記録詳細表示
            }
        }else{
            if(selectButton == '計画'){
                displayLearningPlanAdd();
            }else if(selectButton == '記録'){
                displayLearningRecordAdd();
            }else{
                // 計画の列が選択されたら
                if($(this).hasClass('plan-col')){
                    displayLearningPlanAdd();
                }else{ // 記録の列が選択されたら
                    displayLearningRecordAdd();
                }
            }
        }
    });

    // 授業回の登録ボタンを押されたら
    // TODO: クラス名見直し
    $('.new-plan-create-button').click(function (){
        displayLearningSetting(); // 目標の設定表示
    });

    // 右下の学習計画作成ボタンをクリックされたら
    $(document).on("click", "#add-learning-plan", function () {
        displayLearningPlanAdd();
    });

    //右下の学習記録作成ボタンをクリックされたら
    $(document).on("click", "#add-learning-record", function () {
        displayLearningRecordAdd();
    });

    //テーブルの学習計画登録ボタンをクリックされたら
    $(document).on("click", ".regist-plan-button", function () {
        displayCalenderDate = $(this).attr('id'); // 選択した項目のsettingIdを取得
        calcCalenderDate();
        displayLearningPlanAdd();
    });

     //テーブルの学習記録登録ボタンをクリックされたら
     $(document).on("click", ".regist-record-button", function () {
        displayCalenderDate = $(this).attr('id'); // 選択した項目のsettingIdを取得
        calcCalenderDate();
        displayLearningRecordAdd();
    });
    
    // 次週のボタンを押されたら
    $('#select-next-week').click(function (){
        changeCalenderWeek('next');
    });

    // 先週のボタンを押されたら
    $('#select-last-week').click(function (){
        changeCalenderWeek('last');
    });

    // 振り返り画面を開くボタンを押されたら
    $('.reflection-open-button').click(function (){
        let settingId = historyData[historyData.length-1].settingId;
        displayReflection(settingId);
    });

}

/**
 * 学習履歴テーブルの表示
 */
function displayHistoryTable(){

    // テーブル内容の初期化
    $('.learning-history-tbody').html(''); 

    // 第1回の列の生成と初期化
    $('.learning-history-tbody').append(
        '<tr><td class="coverage">1回(10/1)</td><td colspan="5"></td>'
        + '</td></tr>'
    );

    // 取得した学習履歴をにテーブルに表示
    for(var i in historyData){

        let tableText = {
            settingId: historyData[i].settingId,
            coverage: historyData[i].coverage + '回  (' + Number(new Date(Number(historyData[i].classDate)).getMonth()+1) + '/' + new Date(Number(historyData[i].classDate)).getDate() + ')',
            understanding: historyData[i].understanding,
            plan: '',
            record: '',
            history: ''
        }

        // 学習計画の項目
        if(historyData[i].planFlag == 'true'){
            tableText.plan = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"/></svg>'
        }else{
            tableText.plan = '<button id="' + historyData[i].classDate + '" class="regist-plan-button mdl-button mdl-js-button">登録</button>'
        }

        // 学習記録の項目
        if(historyData[i].recordFlag == 'true'){
            tableText.record = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"/></svg>'
        }else{
            tableText.record = '<button id="' + historyData[i].classDate + '" class="regist-record-button mdl-button mdl-js-button">登録</button>'
        }

        // 計画の振り返りの項目
        if(historyData[i].reflectionFlag == 'true'){
            tableText.reflection = '<button id="' + historyData[i].settingId + '" class="reflection-history-button mdl-button mdl-js-button">履歴</button>'
        }else{
            tableText.reflection = '<button id="' + historyData[i].settingId + '" class="regist-reflection-button mdl-button mdl-js-button">登録</button>'
        }

        // 学習の振り返りの項目
        if(historyData[i].chatbotFlag){
            tableText.chatbot = '<button class="chatbot-history-comp-button mdl-button mdl-js-button">履歴</button>'
        }else{
            tableText.chatbot = '<button id="' + historyData[i].coverage + '" class="history-chatbot-button mdl-button mdl-js-button">登録</button>'
        }

        // テーブル内容の表示
        $('.learning-history-tbody').append(
            '<tr id=' + tableText.settingId + '><td class="coverage">' + tableText.coverage + '</td><td>' + tableText.understanding + '</td>'
            + '<td>' + tableText.plan
            + '<td>' + tableText.record
            + '<td>' + tableText.reflection
            + '<td>' + tableText.chatbot 
            + '<td class="history-detail-button" id=' + tableText.settingId + '>' + '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>'
            + '</td></tr>'
        );  

    }

    changeTableColor();
}


/**
 * テーブル色の変更
 */
function changeTableColor(){
    let selectTr = $('.learning-history-tbody').find('#' + selectSettingId);
    $('.learning-history-tbody tr').removeClass('select');
    $(selectTr).addClass('select');
}

/**
 * グラフ表示
 */
function displayChartHistory(){
    // グラフがすでにセットされているか確認
    if(chartData.chartSetting){
        if(chartData.chartSetting.executingAndCompliting || chartData.chartSetting.achievement || chartData.chartSetting.satisfaction || chartData.chartSetting.recordTime){
            chartData.chartSetting.executingAndCompliting.destroy();
            chartData.chartSetting.achievement.destroy();
            chartData.chartSetting.satisfaction.destroy();
            chartData.chartSetting.recordTime.destroy();
        }
    }

    // グラフ用のデータセット
    chartData = {
        executingAndCompliting :{
            executing: [],
            compliting: []
        },
        achievement: {
            goal: [],
            testScore: []
        }, 
        satisfaction: [],
        recordTime: [],
        chartSetting: {}
    };

    // 配列初期化
    for(let index=0; index<14; index++){
        chartData.executingAndCompliting.executing[index] = 0;
        chartData.executingAndCompliting.compliting[index] = 0;
        chartData.achievement.goal[index] = 0;
        chartData.achievement.testScore[index] = 0;
        chartData.satisfaction[index] = 0;
        chartData.recordTime[index] = 0;
    }

    // 
    for(let i in historyData){
        let coverage = Number(historyData[i].coverage);
        chartData.executingAndCompliting.executing[coverage-2] = Number(historyData[i].executing);
        chartData.executingAndCompliting.compliting[coverage-2] = Number(historyData[i].compliting);
        chartData.achievement.goal[coverage-2] = Number(historyData[i].goal);
        chartData.achievement.testScore[coverage-2] = Number(historyData[i].testScore);
        chartData.satisfaction[coverage-2] = Number(historyData[i].satisfaction);
        // 合計学習時間の算出
        chartData.recordTime[coverage-2] = Number(historyData[i].recordTime);
    }

    let chartSetting = modules.setChartItem.set(modules, chartData);
    chartData.chartSetting = chartSetting;
}


/**
 * カレンダーの表示
 */
function displayCalender(){

    // スイッチを表示
    $('.calender-display-content').addClass('active');

    calcCalenderDate();

    modules.initCalenderHtml.init(calenderDate, selectButton, escape); // カレンダーの内容初期化
    // fabボタンを非表示化
    $('.add-plan-button').css('display', 'none');
    $('.add-record-button').css('display', 'none');

    let startDate = calenderDate[0];  // カレンダーの起点日を取得

    // カレンダーに表示するアイテムの検査
    let displayItemCheck = function(items){
        let lastDate = calenderDate[6]; // カレンダーの最終日を取得
        let checkedItems = [];
        let prepareUnixTime = new Date(startDate.year, Number(startDate.month), Number(startDate.date)).getTime();
        let lastUnixTime = new Date(lastDate.year, Number(lastDate.month), Number(lastDate.date)).getTime();

        for(item of items){
            let itemDateArray = item.date.split('-');
            let itemUnixTime = new Date(Number(itemDateArray[0]), Number(itemDateArray[1]), Number(itemDateArray[2])).getTime();
            // カレンダーの表示日時範囲内のアイテムのみ抽出
            if(itemUnixTime >= prepareUnixTime && itemUnixTime <= lastUnixTime){
                checkedItems.push(item);
            }
        }
        return checkedItems;
    }

    // 授業の予定が既に格納されているかチェック
    let isClassFlag = false;
    for(let item of displayItems.plans){
        if(!item.id.indexOf('C')){  //授業の予定が格納されている
            isClassFlag = true;
            break;
        }
    }
    // 授業の予定が格納されていなければ授業の予定を登録
    if(!isClassFlag){
        let classDate = new Date(Number(selectHistoryData.classDate));
        classDate = classDate.getFullYear() + '-' + Number(classDate.getMonth()+1) + '-' + classDate.getDate();
        displayItems.plans.push({
            content: "第" + selectHistoryData.coverage + "回 基礎数B",
            date: classDate,
            time: {
                start: "14:40",
                end: "16:10"
            },
            id: "C" + new Date().getTime()
        });
    }
    
    let displayItem = [];
    if(selectButton == '計画'){ //計画のラジオボタンが押されていたら
        displayItem = displayItemCheck(displayItems.plans);
        $('.add-plan-button').css('display', '');
    }else if(selectButton == '記録'){
        displayItem = displayItemCheck(displayItems.records);
        $('.add-record-button').css('display', '');
    }else{   // 計画と記録をカレンダーにセット
        displayItem = displayItems.plans.concat(displayItems.records);
        displayItem = displayItemCheck(displayItem);
        $('.add-plan-button').css('display', '');
        $('.add-record-button').css('display', '');
    }

    modules.calenderItemSet.set(displayItem, selectHistoryData, selectButton, escape);
}

/**
 * 新規学習計画の作成
 */
function displayLearningSetting(){

    // MEMO[1203]: 前回の振り返りが登録されているかを確認し、
    // 登録されていなければ振り返り確認モーダルを表示する
    $('.reflection-confirm-modal-wrapper').addClass('is-visible'); // 振り返り確認モーダルの表示

    // $('.learning-setting-modal-wrapper').addClass('is-visible'); // 目標の設定モーダルの表示

    $(".learning-setting-modal-wrapper #classDate").datepicker({
        dateFormat: 'yy-mm-dd',
    });

    // モーダルを閉じる処理
    let exit = function(){
        $('.learning-setting-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
    }

    // キャンセルボタンが押されたら
    $('.header-cansel-button').click(function () {
        exit();
    });

    // 登録ボタンが押されたら
    $('.learning-setting-regist-button').off('click').on('click', function(){
        let settingId = new Date().getTime().toString(16)  + Math.floor(1000*Math.random()).toString(16);   // settingIdの生成
        // 授業回,授業日の取得
        let coverageInfo = $('#coverage').val().split(',');

        // 既に登録された授業回ではないかチェック
        let duplicateFlag = false;
        for(let data of historyData){
            if(Number(data.coverage) === Number(coverageInfo[0])){
            duplicateFlag = true
            }
        }
        if(!duplicateFlag){ //既に登録された授業と重複しなければ登録処理する
            // POSTデータの生成
            let data = {
                'settingId': settingId,
                'coverage': coverageInfo[0],
                'classDate': coverageInfo[1],
                'understanding': $('#understanding').val(),
                'goal': $('#goal').val(),
                'insertTime': new Date().getTime(),
                'recordTime': 0,
                'subjects': '2020年基礎数学B' //前期用固定値[要検討]
            };
            // Ajax通信
            $.ajax({
                url:'./../../php/main/postSetting.php',
                type:'POST',
                data: data,
                dataType: 'json'       
            })
            // Ajaxリクエストが成功した時発動
            .done( () => {
                // 作成した授業回をテーブルに表示
                selectSettingId = settingId;
                // グラフ表示のため計画実施率などを初期化
                data.executing = null;
                data.achievement = null;
                data.satisfaction = null;
                historyData.push(data);
                selectHistoryData = data;
                displayCalenderDate = selectHistoryData.classDate;
                displayItems = {
                    plans: [],
                    records: []
                };
                displayChartHistory();
                displayHistoryTable();
                displayCalender();
                // 学習計画作成モーダルの表示
                displayLearningPlanAdd();
                
                exit();
            })
            // Ajaxリクエストが失敗した時発動
            .fail( (data) => {
            alert('学習の設定情報の登録に失敗しました');
            });
        }else{　//既に登録された授業と重複したらアラートを表示
            alert('既に該当する授業が登録されています');
        }
    });
}

/**
 * 学習計画の振り返り表示
 */
function displayReflection(settingId){
    // 振り返り確認モーダルを閉じる
    $('.reflection-confirm-modal-wrapper').removeClass('is-visible');

    // 前回の授業の計画実施率を取得
    let lastExecting = historyData[historyData.length-1].executing;
    let win;
    // settingIdをsessionに保存(別タブからDBに登録データをPOSTする際のキーに使うため)
    sessionStorage.setItem('settingId', settingId);
    if(lastExecting == 100){ // 計画実施率が100%だったら
        // 新規ウィンドウで学習計画の振り返り画面を表示
        win = window.open('./reflectionCompExecting.php', null, 'top=10,left=10,width=500,height=300');
    }else if(lastExecting < 100){
        // 新規ウィンドウで学習計画の振り返り画面を表示
        win = window.open('./reflectionNonExecting.php', null, 'top=10,left=10,width=500,height=300');
    }
}

/**
 * 計画の振り返り履歴画面の表示
 */
function displayReflectionDetail(settingId){
    // 振り返りモーダルの表示
    $('.reflection-detail-modal-wrapper').addClass('is-visible');    //学習履歴詳細モーダル表示

    // キャンセルボタンが押されたら
    $('.header-cansel-button').click(function () {
        $('.reflection-detail-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
    });

    // 振り返りデータの取得
    $.ajax({
        url:'./../../php/main/getReflectionData.php',
        type:'POST',
        data:{
            'settingId': settingId
        },
        dataType: 'json'       
    })
    // Ajaxリクエストが成功した時発動
    .done( (data) => {
        if(data) {
            let reflectionData = data[0];

            if(reflectionData.category == 'comp-execting'){ // 計画実施率が100%の振り返りの場合
                $('#non-execting').hide();  // 100%未満の振り返り内容を非表示
                let Q2 = reflectionData.Q2.split(/\s+/);
                $('.Q1').text(reflectionData.Q1);
                for(let item of Q2){
                    $('.Q2').append('<div>' + item +  '</div>');
                }
                $('.Q3').text(reflectionData.Q3);
            }else{
                $('#comp-execting').hide();  // 100%の振り返り内容を非表示
                let Q1 = reflectionData.Q1.split(/\s+/);
                for(let item of Q1){
                    $('.Q1').append('<div>' + item +  '</div>');
                }
                $('.Q2').text(reflectionData.Q2);
                $('.Q3').text(reflectionData.Q3);
                $('.Q4').text(reflectionData.Q4);
            }
        }
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
       alert('計画の振り返りの取得を失敗しました');
    });
}

/**
 * チャットボットの表示
 * @param {*} settingId 
 */
function displayChatbotSystem(coverage){
    // 選択した授業回を取得
    let selectCoverage = coverage;

    // 別タブでリンク表示
    window.open('https://tkg-lab.tk/chatbot/page/lesson/2020b/bot/' + Number(selectCoverage) + '.php');
}

/**
 * コメントの表示
 * @param {*} settingId 
 */
// function displayComment(settingId){
//     for(let data of historyData){
//         if(data.settingId == settingId){
//             if(data.comment !== null){
//                 alert(data.comment);
//             }else{
//                 alert('コメントは届いていません');
//             }
//         }
//     }
// }

/**
 * 学習履歴の詳細
 */
function displayHistoryDetail(settingId){
    $('.history-detail-modal-wrapper').addClass('is-visible');    //学習履歴詳細モーダル表示

    let exit = function(){
        $('.history-detail-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
        $('.history-detail-modal-wrapper .history-edit-button').attr('disabled', false);
        $('.history-detail-modal-wrapper').find('input').val("");
    };

    // キャンセルボタンが押されたら
    $('.header-cansel-button').click(function () {
        exit();
    });

    // フォームの値セット
    let selectData = {};
    for(let data=0; data<historyData.length; data++){
        if(historyData[data].settingId == settingId){
            selectData = historyData[data];

            // フォームに値をセット
            let setCoverage = selectData.coverage + ',' + selectData.classDate;
            $('.history-detail-modal-wrapper #coverage').val(setCoverage);
            $('.history-detail-modal-wrapper #understanding').val(selectData.understanding);
            $('.history-detail-modal-wrapper #goal').val(selectData.goal);
            $('.history-detail-modal-wrapper #learningSatisfaction').val(selectData.satisfaction);
            $('.history-detail-modal-wrapper #testScore').val(selectData.testScore);

            // 編集ボタンが押されたら
            $('.history-detail-modal-wrapper .history-edit-button').off('click').on('click', function(){
                let editData = {};
                // 授業回,授業日の取得
                let coverageInfo = $('.history-detail-modal-wrapper #coverage').val().split(',');
                editData.coverage = coverageInfo[0];
                editData.classDate = coverageInfo[1];
                editData.understanding = $('.history-detail-modal-wrapper #understanding').val();
                editData.goal = $('.history-detail-modal-wrapper #goal').val();
                editData.satisfaction = $('.history-detail-modal-wrapper #learningSatisfaction').val();
                editData.testScore = $('.history-detail-modal-wrapper #testScore').val();
                editData.settingId = settingId;
                editData.recordTime = selectData.recordTime;
                editData.planFlag = selectData.planFlag;
                editData.recordFlag = selectData.recordFlag;

                // 事前テストの点数が入力されたら
                if(editData.testScore !== null && editData.testScore !== "なし" && selectData.goal !== "なし"){
                    // 目標達成度の算出
                    if(Number(selectData.goal) <= Number(editData.testScore)){
                        editData.achievement = 100;
                    }else{
                        editData.achievement = 0;
                    }
                }

                // 学習履歴の編集
                // Ajax通信
                $.ajax({
                    url:'./../../php/main/updateSetting.php',
                    type:'POST',
                    data: editData,
                    dataType: 'json'       
                })
                // Ajaxリクエストが成功した時発動
                .done( () => {
                    historyData[data] =  editData;
                    historyData[data].executing = selectData.executing;
                    selectHistoryData = historyData[data];
                    displayHistoryTable();
                    displayChartHistory();

                    exit();
                })
                // Ajaxリクエストが失敗した時発動
                .fail( (data) => {
                    alert('学習履歴の更新に失敗しました');
                });
            });

            // 削除ボタンが押されたら
            $('.history-detail-modal-wrapper .history-delete-button').off('click').on('click', function(){
                $.ajax({
                    url:'./../../php/main/deleteSetting.php',
                    type:'POST',
                    data: selectData,
                    dataType: 'json'       
                })
                // Ajaxリクエストが成功した時発動
                .done( () => {
                    if(historyData.length > 1){
                        historyData.splice(data, 1);
                        selectSettingId = historyData[historyData.length-1].settingId;
                        selectHistoryData = historyData[historyData.length-1];
                        displayCalenderDate = selectHistoryData.classDate;
                    }else{
                        historyData = [];
                        // カレンダー非表示

                    }
                    displayHistoryTable();
                    displayChartHistory();
                    getCalenderItem();

                    exit();
                })
                // Ajaxリクエストが失敗した時発動
                .fail( (data) => {
                    alert('学習履歴の削除に失敗しました');
                });
            });

            break;
        }
    }
}

/**
 * 学習の計画追加処理
 */
function displayLearningPlanAdd(){
    $('.learning-plan-create-modal-wrapper').addClass('is-visible');    //学習計画作成モーダル表示

    let exit = function(){
        $('.learning-plan-create-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
        $('.learning-plan-create-modal-wrapper .learning-add-button').attr('disabled', true);
        $('.learning-plan-create-modal-wrapper').find('input').val("");
        $('.modal-error').text('');
    }

    // キャンセルボタン押されたら
    $('.header-cansel-button').click(function () {
        exit();
    });

    // 学習日のリスト表示
    $('.learning-plan-create-modal-wrapper #learningDate').html('');
    for(let date of calenderDate){
        let value = date.year + '-' + date.month + '-' + date.date;
        $('<option value="' + escape(value) + '">' + escape(value) + escape(date.day) + '</option>').appendTo('.learning-plan-create-modal-wrapper #learningDate');
    }

    // フォームの必須項目が入力されたら
    $('.learning-plan-create-modal-wrapper input.required').on('input', function(){
        let disabled = false;
        $('.learning-plan-create-modal-wrapper input.required').each(function() {
            if($(this).val() === ''){
                disabled = true;
            }

            $('.learning-plan-create-modal-wrapper .learning-add-button').attr('disabled', disabled);
        });
    });

    // 追加ボタン押されたら
    $('.learning-plan-create-modal-wrapper .learning-add-button').off("click").one("click", function() {

        let plan = {};
        plan.time = {};

        //  入力内容の取得
        plan.content = $('.learning-plan-create-modal-wrapper #learningContent').val();
        plan.date = $('.learning-plan-create-modal-wrapper #learningDate').val();
        // 開始時間のフォーマット形成
        plan.time.start = $('.learning-plan-create-modal-wrapper #learningTimeStartHour').val() + ':' + $('.learning-plan-create-modal-wrapper #learningTimeStartTime').val();
        // 終了時間のフォーマット形成
        plan.time.end = $('.learning-plan-create-modal-wrapper #learningTimeEndHour').val() + ':' + $('.learning-plan-create-modal-wrapper #learningTimeEndTime').val(); 
        plan.memo = $('.learning-plan-create-modal-wrapper #learningMemo').val();
        plan.learningFlag = true;

        // idの設定
        plan.id = 'L' + new Date().getTime();

        // ダブルブッキングチェック
        let doubleBookingFlag = calenderDoubleBookingCheck(plan, plan.id);
        // 無効値のチェック
        let invalidPlanFlag = invalidPlanCheck(plan);

        // エラーがあれば表示、なければ登録処理
        if(doubleBookingFlag){
            alert('既に追加された予定と被ります．空いている時間に変更しましょう．');
        }else if(invalidPlanFlag){
            alert('学習時間が無効値です．再度確認してください．日をまたぐ場合は分割して登録してください．');
        }else{
            // Ajax通信 計画情報をDBに追加
            postPlan(plan);
        }

        exit();
    });
}

/**
 * 学習の記録追加処理
 */
function displayLearningRecordAdd(){

    $('.learning-record-create-modal-wrapper').addClass('is-visible');    //学習記録作成モーダル表示
    setLearningContentList();

    let exit = function(){
        $('.learning-record-create-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
        $('.learning-record-create-modal-wrapper .learning-add-button').attr('disabled', true);
        $('.learning-record-create-modal-wrapper').find('input').val("");
        $('.modal-error').text('');     
        $('.input-learning-content').css('display', 'none'); 
    }

    // キャンセルボタン押されたら
    $('.header-cansel-button').click(function () {
        exit();
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
    for(let date of calenderDate){
        let value = date.year + '-' + date.month + '-' + date.date;
        $('<option value="' + escape(value) + '">' + escape(value) + escape(date.day) + '</option>').appendTo('.learning-record-create-modal-wrapper #learningDate');
    }

    let formErrorCheck = function(value){
        let disabled = false;
        let selectContent = $('.learning-record-create-modal-wrapper select.select-learning-content.required').val();
        let inputContent = $('.learning-record-create-modal-wrapper #inputLearningContent').val();
        if(selectContent == '学習内容を選択' || (selectContent == 'その他' && inputContent == '')){
            disabled = true;
        }

        $('.learning-record-create-modal-wrapper .learning-add-button').attr('disabled', disabled);

    };

    // フォームの必須項目が入力されたら
    $('.learning-record-create-modal-wrapper input.required').on('input', function(){
        $('.learning-record-create-modal-wrapper input.required').each(function() {
           formErrorCheck($(this).val());
        });
    });

    $('.learning-record-create-modal-wrapper select.required').on('input', function(){
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
        // 開始時間のフォーマット形成
        record.time.start = $('.learning-record-create-modal-wrapper #learningTimeStartHour').val() + ':' + $('.learning-record-create-modal-wrapper #learningTimeStartTime').val();
        // 終了時間のフォーマット形成
        record.time.end = $('.learning-record-create-modal-wrapper #learningTimeEndHour').val() + ':' + $('.learning-record-create-modal-wrapper #learningTimeEndTime').val(); 
        record.memo = $('.learning-record-create-modal-wrapper #learningMemo').val();

        // idの設定
        record.id = 'R' + new Date().getTime();

        // 無効な学習記録のチェック
        let invalidRecordFlag = invalidRecordCheck(record);
        // ダブルブッキングチェック
        let doubleBookingFlag = calenderDoubleBookingCheck(record, record.id);
        

        // エラーがあれば表示、なければ登録処理
        if(doubleBookingFlag || invalidRecordFlag){
            if(doubleBookingFlag){
                alert('既に追加された記録と被ります．');
            }else if(invalidRecordFlag){
                alert('学習日時の値が無効です．再度確認してください．将来の学習記録や日付をまたいだ学習記録は登録できません．');
            }
        }else{

            // 学習時間の加算
            let start = record.time.start.split(':') // 開始時の取得
            let end = record.time.end.split(':') // 最後時の取得
            let addRecordTime = (Number(end[0]) * 60 + Number(end[1])) - (Number(start[0]) * 60 + Number(start[1]));
            selectHistoryData.recordTime += addRecordTime;

            $.ajax({
                url:'./../../php/main/updateSetting.php',
                type:'POST',
                data: selectHistoryData,
                dataType: 'json'       
            })
            // Ajaxリクエストが成功した時発動
            .done( (data) => {
                postRecord(record);
            })
            // Ajaxリクエストが失敗した時発動
            .fail( (data) => {
            });
            
        }

        exit();

    });
}

/**
 * 計画の詳細表示
 * @param {String} id 
 */
function displayLearningPlanDetail(id){
    for(var i=0; i<displayItems.plans.length; i++){
        if(displayItems.plans[i].id == id){ //選択した計画データ一致
            let selectPlan = displayItems.plans[i];

            $('.learning-plan-detail-modal-wrapper').addClass('is-visible');    //学習計画詳細モーダル表示

            let exit = function(){
                $('.learning-plan-detail-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
                $('.learning-plan-detail-modal-wrapper .learning-edit-button').attr('disabled', false); 
                $('.modal-error').text('');       
            }

            // キャンセルボタン押されたら
            $('.header-cansel-button').click(function () {
                exit();
            });

            // 学習日のリスト表示
            $('.learning-plan-detail-modal-wrapper #detailLearningDate').html('');
            for(let date of calenderDate){
                let value = date.year + '-' + date.month + '-' + date.date;
                $('<option value="' + escape(value) + '">' + escape(value) + escape(date.day) + '</option>').appendTo('.learning-plan-detail-modal-wrapper #detailLearningDate');
            }
        
            // フォームの必須項目が入力されたら
            $('.learning-plan-detail-modal-wrapper input.required').on('input', function(){
                let disabled = false;
                $('.learning-plan-detail-modal-wrapper input.required').each(function() {
                    if($(this).val() === ''){
                        disabled = true;
                    }

                    $('.learning-plan-detail-modal-wrapper .learning-edit-button').attr('disabled', disabled);
                });
            });

            // フォームの値セット
            $('.learning-plan-detail-modal-wrapper #detailLearningContent').val(selectPlan.content);
            $('.learning-plan-detail-modal-wrapper #detailLearningDate').val(selectPlan.date);
            $('.learning-plan-detail-modal-wrapper #detailLearningTimeStart').val(selectPlan.time.start);
            $('.learning-plan-detail-modal-wrapper #detailLearningTimeEnd').val(selectPlan.time.end);
            $('.learning-plan-detail-modal-wrapper #detailLearningMemo').val(selectPlan.memo);

            // 完了ボタンが押されたら
            $('.learning-plan-detail-modal-wrapper .learning-complete-button').off("click").one("click", function () {
                let record = JSON.parse(JSON.stringify(selectPlan));
                record.id = 'R' + new Date().getTime();

                // 無効な学習記録のチェック
                let invalidRecordFlag = invalidRecordCheck(record);
                // ダブルブッキングチェック
                let doubleBookingFlag = calenderDoubleBookingCheck(record, record.id);

                if(doubleBookingFlag || invalidRecordFlag){
                    if(doubleBookingFlag){
                        alert('既に追加された記録と被ります．');
                    }else if(invalidRecordFlag){
                        alert('学習日時の値が無効です．再度確認してください．将来の学習記録や日付をまたいだ学習記録は登録できません．');
                    }
                }else{

                    // 学習時間の算出
                    let selectStart = selectPlan.time.start.split(':') // 開始時の取得
                    let selectEnd = selectPlan.time.end.split(':') // 最後時の取得
                    let selectRecordTime = (Number(selectEnd[0]) * 60 + Number(selectEnd[1])) - (Number(selectStart[0]) * 60 + Number(selectStart[1]));
                    selectHistoryData.recordTime = Number(selectHistoryData.recordTime) + selectRecordTime;

                    $.ajax({
                        url:'./../../php/main/updateSetting.php',
                        type:'POST',
                        data: selectHistoryData,
                        dataType: 'json'       
                    })
                    // Ajaxリクエストが成功した時発動
                    .done( (data) => {
                        postRecord(record);
                    })
                    // Ajaxリクエストが失敗した時発動
                    .fail( (data) => {
                    });
                    
                }
                exit();
            });

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
                // 無効値のチェック
                let invalidPlanFlag = invalidPlanCheck(editPlan);

                // エラーがあれば表示、なければ登録処理
                if(doubleBookingFlag){
                    alert('既に追加された予定と被ります．空いている時間に変更しましょう．');
                }else if(invalidPlanFlag){
                    alert('学習時間が無効値です．再度確認してください．日をまたぐ場合は分割して登録してください．');
                }else{
                    editPlan.id = 'L' + new Date().getTime();
                    updatePlan(editPlan, id, i);
                }
                exit();      
            });

            // 学習計画の削除ボタンを押されたら
            $('.learning-plan-detail-modal-wrapper .learning-delete-button').off('click').one("click", function () {
                deletePlan(selectPlan, id, i);
                exit();
            });

            break;
        }
    }
}

function displayLearningRecordDetail(id){
    for(var i=0; i<displayItems.records.length; i++){
        if(displayItems.records[i].id == id){ //選択した計画データ一致
            let selectRecord = displayItems.records[i];
            $('.learning-record-detail-modal-wrapper').addClass('is-visible');    //学習記録詳細モーダル表示

            let exit = function(){
                $('.learning-record-detail-modal-wrapper .learning-edit-button').attr('disabled', false);
                $('.learning-record-detail-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
                $('.modal-error').text('');
            }

            // キャンセルボタン押されたら
            $('.header-cansel-button').click(function () {
                exit();
            });

             // 学習日のリスト表示
             $('.learning-record-detail-modal-wrapper #detailLearningDate').html('');
             for(let date of calenderDate){
                let value = date.year + '-' + date.month + '-' + date.date;
                $('<option value="' + escape(value) + '">' + escape(value) + escape(date.day) + '</option>').appendTo('.learning-record-detail-modal-wrapper #detailLearningDate');
            }

            // フォームの必須項目が入力されたら
            $('.learning-record-detail-modal-wrapper input.required').on('input', function(){
                let disabled = false;
                $('.learning-record-detail-modal-wrapper input.required').each(function() {
                    if($(this).val() === ''){
                        disabled = true;
                    }
                    
                    $('.learning-record-detail-modal-wrapper .learning-edit-button').attr('disabled', disabled);

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


                // 無効な学習記録のチェック
                let invalidRecordFlag = invalidRecordCheck(editRecord);
                // ダブルブッキングチェック
                let doubleBookingFlag = calenderDoubleBookingCheck(editRecord, id);
                

                // エラーがあれば表示、なければ登録処理
                if(doubleBookingFlag || invalidRecordFlag){
                    if(doubleBookingFlag){
                        alert('既に追加された記録と被ります．');
                    }else if(invalidRecordFlag){
                        alert('学習日時の値が無効です．再度確認してください．将来の学習記録や日付をまたいだ学習記録は登録できません．');
                    }
                }else{                    
                    $.ajax({
                        url:'./../../php/main/updateRecord.php',
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
                        // 合計学習時間の編集
                        // 選択した学習時間の算出
                        let selectStart = selectRecord.time.start.split(':') // 開始時の取得
                        let selectEnd = selectRecord.time.end.split(':') // 最後時の取得
                        let selectRecordTime = (Number(selectEnd[0]) * 60 + Number(selectEnd[1])) - (Number(selectStart[0]) * 60 + Number(selectStart[1]));
                        // 編集した学習時間の算出
                        let editStart = editRecord.time.start.split(':') // 開始時の取得
                        let editEnd = editRecord.time.end.split(':') // 最後時の取得
                        let editRecordTime = (Number(editEnd[0]) * 60 + Number(editEnd[1])) - (Number(editStart[0]) * 60 + Number(editStart[1]));
                        // 選択した学習時間と編集した学習時間の差分を算出
                        let diffRecordTime = selectRecordTime - editRecordTime;
                        selectHistoryData.recordTime = Number(selectHistoryData.recordTime) - diffRecordTime;
                        
                        $.ajax({
                            url:'./../../php/main/updateSetting.php',
                            type:'POST',
                            data: selectHistoryData,
                            dataType: 'json'       
                        })
                        // Ajaxリクエストが成功した時発動
                        .done( (data) => {
                            calenderDataSet(editRecord, i, false);
                        })
                        // Ajaxリクエストが失敗した時発動
                        .fail( (data) => {
                        });
                    })
                    // Ajaxリクエストが失敗した時発動
                    .fail( (data) => {
                        alert('編集に失敗しました');
                    })
                }

                exit();
            });

            // 削除ボタン押されたら
            $('.learning-record-detail-modal-wrapper .learning-delete-button').off('click').one("click", function () {
                $.ajax({
                    url:'./../../php/main/deleteRecord.php',
                    type:'POST',
                    data:{
                        'recordId': id
                    },
                    dataType: 'json'       
                })
                // Ajaxリクエストが成功した時発動
                .done( (data) => {
                    if(displayItems.records.length == 1){
                        // Ajax通信
                        $.ajax({
                            url:'./../../php/main/updateRecordFlag.php',
                            type:'POST',
                            data:{
                                'settingId': selectSettingId,
                                'recordFlag': 'false'
                            },
                            dataType: 'json'       
                        })
                        // Ajaxリクエストが成功した時発動
                        .done( (data) => {
                            selectHistoryData.recordFlag = 'false';
                            displayHistoryTable();
                        })
                        // Ajaxリクエストが失敗した時発動
                        .fail( (data) => {
            
                        })
                    }
                    // 削除した分の学習時間を算出
                    let selectStart = selectRecord.time.start.split(':') // 開始時の取得
                    let selectEnd = selectRecord.time.end.split(':') // 最後時の取得
                    let selectRecordTime = (Number(selectEnd[0]) * 60 + Number(selectEnd[1])) - (Number(selectStart[0]) * 60 + Number(selectStart[1]));
                    selectHistoryData.recordTime = Number(selectHistoryData.recordTime) - selectRecordTime;

                    $.ajax({
                        url:'./../../php/main/updateSetting.php',
                        type:'POST',
                        data: selectHistoryData,
                        dataType: 'json'       
                    })
                    // Ajaxリクエストが成功した時発動
                    .done( (data) => {
                        calenderDataSet(selectRecord, false, i);
                    })
                    // Ajaxリクエストが失敗した時発動
                    .fail( (data) => {
                    });
                    
                })
                // Ajaxリクエストが失敗した時発動
                .fail( (data) => {
                    alert('削除に失敗しました');
                })
                exit();
            });

            break;

        }
    }
}

function calenderDataSet(item, editFlag, deleteFlag){
    let id = item.id.slice(0,1);

    if(id == 'L'){  // 計画データ

        var afterPlans = JSON.parse(JSON.stringify(displayItems.plans));
        if(editFlag !== false){
            afterPlans.splice(Number(editFlag),1);
        }

        if(deleteFlag !== false){
            afterPlans.splice(Number(deleteFlag),1);
        }else{
            afterPlans.push(item);
        }

        displayItems.plans = JSON.parse(JSON.stringify(afterPlans));

        if(editFlag === false && deleteFlag === false){
            $('.learning-plan-create-modal-wrapper').removeClass('is-visible');
        }else{
            $('.learning-plan-detail-modal-wrapper').removeClass('is-visible');
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
        
        displayItems.records = JSON.parse(JSON.stringify(afterRecords));

        if(editFlag === false && deleteFlag === false){
            $('.learning-record-create-modal-wrapper').removeClass('is-visible');
            $('.learning-plan-detail-modal-wrapper').removeClass('is-visible');
        }else{
            $('.learning-record-detail-modal-wrapper').removeClass('is-visible');
        }
    }

    displayCalender();
    updateExecuting();
}

/**
 * カレンダーの日付計算
 */
function calcCalenderDate(){
    let calenderDateArray = [];
    let dayText = ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)'];
    // 授業日までの1週間の日付を取得
    for(let beforeDate=6; beforeDate>=0; beforeDate--){
        let classDate = new Date(Number(displayCalenderDate)); // 授業日を取得
        classDate.setDate(classDate.getDate() - beforeDate);
        let month = classDate.getMonth()+1;
        let date = classDate.getDate();
        if(month<10) month = '0' + month;
        if(date<10) date = '0' + date;
       
        calenderDateArray.push({
            year: classDate.getFullYear(),
            month: month,
            date: date,
            day: dayText[classDate.getDay()]
        })
    }
    calenderDate =  calenderDateArray;
}

function calenderDoubleBookingCheck(item, id){
    let checkId = id.slice(0,1);
    let doubleBookingFlag = false;

    if(checkId == 'L'){
        
        if(displayItems.plans.length>0){
            for(var learningIndex = 0; learningIndex < displayItems.plans.length; learningIndex++){
                if(id !== displayItems.plans[learningIndex].id){
                    if(displayItems.plans[learningIndex].date == item.date){
                        if(!((displayItems.plans[learningIndex].time.start >= item.time.start) && (displayItems.plans[learningIndex].time.start >= item.time.end)
                        || (displayItems.plans[learningIndex].time.end <= item.time.start) && (displayItems.plans[learningIndex].time.end <= item.time.end))){
                            doubleBookingFlag = true;
                            break;
                        }
                    }
                }
            } 
        }
        
    }else{

        if(displayItems.records.length>0){
            for(var learningIndex = 0; learningIndex < displayItems.records.length; learningIndex++){
                if(id !== displayItems.records[learningIndex].id){
                    if(displayItems.records[learningIndex].date == item.date){
                        // 開始時間が既に作成された予定とダブる または　終了時間が既に作成された予定とダブる
                        if(!((displayItems.records[learningIndex].time.start >= item.time.start) && (displayItems.records[learningIndex].time.start >= item.time.end)
                        || (displayItems.records[learningIndex].time.end <= item.time.start) && (displayItems.records[learningIndex].time.end <= item.time.end))){
                            doubleBookingFlag = true;
                            break;
                        }
                    }
                }
            } 
        }
    }

    return doubleBookingFlag;
}

/**
 * 無効な学習計画の登録チェック(不適切な時間)
 * @param {*} plan 
 */
function invalidPlanCheck(plan){
    let invalidPlanFlag = false;

    let planTimeStartArray = plan.time.start.split(":").map(Number); // 開始時間[時, 分]
    let planTimeEndArray = plan.time.end.split(":").map(Number); //終了時間[時,分]

    // 終了時間が開始時間よりも前であれば無効とする
    if(planTimeStartArray[0] > planTimeEndArray[0]){
        invalidPlanFlag = true;
    }else if(planTimeStartArray[0] == planTimeEndArray[0] && planTimeStartArray[1] >= planTimeEndArray[1]){
        invalidPlanFlag = true;
    }

    return invalidPlanFlag;
}

/**
 * 無効な学習記録の登録チェック(不適切な時間、将来の記録)
 */
function invalidRecordCheck(record){
    let currentTime = new Date().getTime();
    let invalidRecordFlag = false;

    let recordDateArray = record.date.split("-").map(Number);
    let recordTimeStartArray = record.time.start.split(":").map(Number);
    let recordTimeEndArray = record.time.end.split(":").map(Number);
    let recordTime = new Date(recordDateArray[0], recordDateArray[1]-1, recordDateArray[2], recordTimeEndArray[0], recordTimeEndArray[1]).getTime();

    // 現在と学習記録の日時比較
    // 現在よりも将来の学習記録の場合は無効とする
    if(currentTime < recordTime){
        invalidRecordFlag = true;
    }

    // 終了時間が開始時間よりも前であれば無効とする
    if(recordTimeStartArray[0] > recordTimeEndArray[0]){
        invalidRecordFlag = true;
    }else if(recordTimeStartArray[0] == recordTimeEndArray[0] && recordTimeStartArray[1] >= recordTimeEndArray[1]){
        invalidRecordFlag = true;
    }

    return invalidRecordFlag;

}

function updateExecuting(){
    let sum = 0;
    let matchCount = 0;
    let executing = 0;

    if(displayItems.plans.length > 0){
        for(let plan of displayItems.plans){
            if(plan.learningFlag){
                sum++;
                let matchFlag = false;
                if(displayItems.records.length > 0){
                    for(let record of displayItems.records){
                        if(plan.content == record.content && plan.date == record.date && plan.time.start == record.time.start && plan.time.end == record.time.end){
                            matchFlag = true;
                            break;
                        }
                    }
                    if(matchFlag){
                        matchCount++;
                    }
                }
            }
        }
    }

    if(displayItems.records.length > sum){
        sum = displayItems.records.length;
    }

    if(sum !== 0){
        executing = Math.round(matchCount / sum * 100);
    }

    // 学習完了率の算出
    updateCompliting(executing);

}

/**
 * 学習完了率の算出
 */
function updateCompliting(executing){
    if(displayItems.plans.length > 0){
        let match = 0;
        // 重複無し学習計画の内容リストの作成
        let planContent = [];
        for(let plan of displayItems.plans){
            if(plan.learningFlag){
                planContent.push(plan.content);
            }
        }
        let noDeplicateContent = Array.from(new Set(planContent));

        // 学習計画と学習記録の学習内容が一致しているかどうか
        for(let content of noDeplicateContent){
            for(let record of displayItems.records){
                if(content == record.content){
                    match++;
                    break;
                }
            }
        }
        let compliting = Math.round(match / noDeplicateContent.length * 100);

        // Ajax通信
        $.ajax({
            url:'./../../php/main/updateExecutingAndCompliting.php',
            type:'POST',
            data:{
                'settingId': selectSettingId,
                'executing': executing,
                'compliting': compliting
            },
            dataType: 'json'       
        })
        // Ajaxリクエストが成功した時発動
        .done( (data) => {
            selectHistoryData.executing = executing;
            selectHistoryData.compliting = compliting;
            displayHistoryTable();
            displayChartHistory();
        })
        // Ajaxリクエストが失敗した時発動
        .fail( (data) => {
        
        })

    }
}

/**
 * 学習内容リストのセット
 */
function setLearningContentList(){
    $('#selectLearningContent').html('<option>学習内容を選択</option>');
    // 学習内容重複無しのリスト作成
    let planContent = [];
    for(let plan of displayItems.plans){
        if(plan.learningFlag){
            planContent.push(plan.content);
        }
    }
    let noDeplicateContent = Array.from(new Set(planContent));

    // 学習内容リストのセット
    for(let content of noDeplicateContent){
        $('<option value="' + escape(content) + '">' + escape(content) + '</option>').appendTo('#selectLearningContent');
    }
    $('<option value="その他">その他</option>').appendTo('#selectLearningContent');
}

/**
 * カレンダーの週表示変更
 */
function changeCalenderWeek(select){
    let classDate = new Date(Number(displayCalenderDate));
    if(select == 'last'){   // もし左ボタン(先週)が押されたら
        // 1週間前の日付に設定する
        classDate.setDate(classDate.getDate() - 7);
    }else{  // 右ボタン(次週)が押されたら
        // 1週間後の日付に設定する
        classDate.setDate(classDate.getDate() + 7);
    }

    displayCalenderDate = classDate;
    displayCalender();
}


// Ajax通信

function getHistoryData(){
    $.ajax({
        url:'./../../php/main/getHistoryData.php',
        type:'POST',
        data:{},
        dataType: 'json'       
    })
    // Ajaxリクエストが成功した時発動
    .done( (data) => {
        if(data) {
            historyData = data.history;

            // 授業回昇順にソート
            for(let history of historyData){
                history.coverage = Number(history.coverage);
            }
            historyData.sort(function (a, b) {
                return a.coverage - b.coverage;
            });
            
            // chatbotのテスト点数を格納
            if(data.chatbot){
                // // 第1回のデータを取得
                // for(let chatbot of data.chatbot){
                //     if(chatbot.classDate == "1601478000000"){  //第1回のデータ
                //         historyData.unshift({
                //             coverage: "1",
                //             classDate: chatbot.classDate,
                //             goal: chatbot.goal,
                //             testScore: chatbot.testScore,
                //             satisfaction: chatbot.satisfaction
                //         });
                //     }
                // }
                for(let i=0; i<historyData.length; i++){
                    historyData[i].chatbotFlag = false;
                    for(let j=0; j<data.chatbot.length; j++){
                        if(Number(historyData[i].classDate) == data.chatbot[j].classDate){
                            historyData[i].chatbotFlag = true;
                            // 目標達成度がNULLだったらチャットボットから点数を持ってくる
                            if(historyData[i].achievement == null || historyData[i].achievement == ''){
                                // historyData[i].goal = data.chatbot[j].goal;
                                historyData[i].testScore = data.chatbot[j].testScore;
                                if(historyData[i].goal <= historyData[i].testScore){
                                    historyData[i].achievement = 100;
                                }else{
                                    historyData[i].achievement = 0;
                                }
                                updateSetting(historyData[i]);
                            }
                            // 学習満足度がNULLだったら...
                            if(historyData[i].satisfaction == null || historyData[i].satisfaction == ''){
                                historyData[i].satisfaction = data.chatbot[j].satisfaction;
                                updateSetting(historyData[i]);
                            }
                        }
                    }
                }

                // 振り返り内容の表示
                let reflection = data.chatbot.slice(-1)[0].reflection;
                $('.learning-history-reflection #reflection').text(reflection);
            } 
        }
        selectSettingId = data.history.slice(-1)[0].settingId;
        selectHistoryData = data.history.slice(-1)[0];
        displayCalenderDate = selectHistoryData.classDate;
        displayHistoryTable();
        displayChartHistory();
        getCalenderItem();
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
        // 学習履歴がない（初めてのログイン）の時
        $('.learning-history-tbody').append(
            '<tr><td class="coverage">1回(10/1)</td><td colspan="5"></td>'
            + '</td></tr>'
        ); 
        alert('「新規学習計画の作成」ボタンから学習計画を作成しましょう')
    });
}

/**
 * カレンダーに表示する計画と記録のデータを取得(Ajax)
 */
function getCalenderItem(){
    // 表示アイテムの初期化
    displayItems.plans = [];
    displayItems.records = [];

    $('#selectLearningContent').html('<option>学習内容を選択</option>');

    $.ajax({
        url:'./../../php/main/getCalenderItem.php',
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
                if(displayItems.plans[plan].learningFlag == "true"){
                    displayItems.plans[plan].learningFlag = true;
                }else{
                    displayItems.plans[plan].learningFlag = false;
                }
            }

            for(let record in displayItems.records){
                displayItems.records[record].id = displayItems.records[record].recordId;
                displayItems.records[record].date = displayItems.records[record].recordDate;
                displayItems.records[record].time = JSON.parse(displayItems.records[record].recordTime);
            }

            // カレンダー表示
            displayCalender();

        }
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
       
    });
}

// 目標設定の更新
function updateSetting(historyData){
    $.ajax({
        url:'./../../php/main/updateSetting.php',
        type:'POST',
        data: historyData,
        dataType: 'json'       
    })
    // Ajaxリクエストが成功した時発動
    .done( (data) => {
        console.log('更新完了');
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
        alert('更新に失敗しました');
    })
}


/**
 * ajax postPlan
 * @param {*} plan 
 */
function postPlan(plan){
    $.ajax({
        url:'./../../php/main/postPlan.php',
        type:'POST',
        data:{
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
        if(displayItems.plans.length == 1){
            // Ajax通信
            $.ajax({
                url:'./../../php/main/updatePlanFlag.php',
                type:'POST',
                data:{
                    'settingId': selectSettingId,
                    'planFlag': 'true'
                },
                dataType: 'json'       
            })
            // Ajaxリクエストが成功した時発動
            .done( (data) => {
                selectHistoryData.planFlag = 'true';
                displayHistoryTable();
            })
            // Ajaxリクエストが失敗した時発動
            .fail( (data) => {

            })
        }
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
        url:'./../../php/main/postPlan.php',
        type:'POST',
        data:{
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
            url:'./../../php/main/updatePlan.php',
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
        url:'./../../php/main/deletePlan.php',
        type:'POST',
        data:{
            'planId': id
        },
        dataType: 'json'       
    })
    // Ajaxリクエストが成功した時発動
    .done( (data) => {
        if(displayItems.plans.length == 2){ //授業と削除対象の学習計画しか登録されていなかった場合、学習計画欄の「登録」ボタンを復活
            // Ajax通信
            $.ajax({
                url:'./../../php/main/updatePlanFlag.php',
                type:'POST',
                data:{
                    'settingId': selectSettingId,
                    'planFlag': 'false'
                },
                dataType: 'json'       
            })
            // Ajaxリクエストが成功した時発動
            .done( (data) => {
                console.log(data)
                selectHistoryData.planFlag = 'false';
                displayHistoryTable();
            })
            // Ajaxリクエストが失敗した時発動
            .fail( (data) => {

            })
        }
        calenderDataSet(deletePlan, false, i);

        return true;
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
        alert('削除に失敗しました');
        return false;
    })
}

function postRecord(record){
    // Ajax通信
    $.ajax({
        url:'./../../php/main/postRecord.php',
        type:'POST',
        data:{
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
        if(displayItems.records.length == 0){
            // Ajax通信
            $.ajax({
                url:'./../../php/main/updateRecordFlag.php',
                type:'POST',
                data:{
                    'settingId': selectSettingId,
                    'recordFlag': 'true'
                },
                dataType: 'json'       
            })
            // Ajaxリクエストが成功した時発動
            .done( (data) => {
                selectHistoryData.recordFlag = 'true';
                displayHistoryTable();
            })
            // Ajaxリクエストが失敗した時発動
            .fail( (data) => {

            })
        }
        calenderDataSet(record, false, false);
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
        alert('登録に失敗しました');
    })
}