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
let statisticsData = {};
let setStatisticsFlag = false;

$(function(){

    // テーブルに表示するデータの取得
    getHistoryData();

    // DOMの初期設定
    initDOM();
});

/**
 * DOMの初期設定
 */
function initDOM(){

    // テーブル内を選択されたら
    $(document).on("click", ".learning-history-tbody tr", function () {
        if(selectSettingId !== $(this).attr('id')){
            selectSettingId = $(this).attr('id'); // 選択した項目のsettingIdを取得
            for(let data of historyData){
                if(data.settingId == selectSettingId){
                    selectHistoryData = data;
                    displayCalenderDate = selectHistoryData.classDate;
                }
            }
            changeTableColor(); // 選択した項目の背景色変更
            getCalenderItem();  // カレンダーに表示するアイテムの取得
        }else{
            setStatistics();
        }
    });

    // テーブルの登録するボタンをクリックされたら
    $(document).on("click", ".learning-history-tbody td .history-regist-button", function () {
        displayHistoryDetail($(this).attr('id'));  // 学習履歴の詳細表示
    });

    // テーブルの振り返りボタンをクリックされたら
    $(document).on("click", ".learning-history-tbody td .history-chatbot-button", function () {
        displayChatbotSystem($(this).attr('id'));  // 学習履歴の詳細表示
    });


    // テーブルの詳細ボタンをクリックされたら
    $(document).on("click", ".learning-history-tbody td .history-detail-button", function () {
        displayHistoryDetail($(this).attr('id'));  // 学習履歴の詳細表示
    });

    // テーブルの統計ボタンをクリックされたら
    $(document).on("click", ".learning-history-tbody td .history-statistics-button", function () {
        if(setStatisticsFlag){
            displayStatistics();
        }
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
            let category = id.slice(0,1);   // IDの先頭文字を取得(L:学習計画, P:プライベートの予定, R:学習記録)
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

    // 学習の計画追加ボタンを押されたら
    // TODO: クラス名見直し
    $('#add-learning-plan').click(function (){
        displayLearningPlanAdd();
    });

    // 学習の記録追加ボタンを押されたら
    // TODO: クラス名見直し
    $('#add-learning-record').click(function (){
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
}

/**
 * 学習履歴テーブルの表示
 */
function displayHistoryTable(){

    $('.learning-history-tbody').html(''); // テーブル内容の初期化

    // 取得した学習履歴をにテーブルに表示
    for(var i in historyData){

        // 計画実施率の表示
        if(historyData[i].executing == null){
            historyData[i].executingText = '未計算';
        }else{
            historyData[i].executingText = historyData[i].executing + '%';
        }

        // 目標達成率の表示
        if(historyData[i].achievement == 100){
            historyData[i].achievementText = '達成 (' + historyData[i].testScore + '/' + historyData[i].goal + ')';
        }else if(historyData[i].achievement == 0){
            historyData[i].achievementText = '未達成 (' + historyData[i].testScore + '/' + historyData[i].goal + ')';
        }else{
            historyData[i].achievementText = '<button id="' + historyData[i].settingId + '" class="history-regist-button mdl-button mdl-js-button">登録する</button>';
        }

        // 学習満足度の表示
        switch(historyData[i].satisfaction){
            case '0': historyData[i].satisfactionText = '満足していない'; break;
            case '25': historyData[i].satisfactionText = 'あまり満足していない'; break;
            case '50': historyData[i].satisfactionText = 'どちらともいえない'; break;
            case '75': historyData[i].satisfactionText = 'まあ満足している'; break;
            case '100': historyData[i].satisfactionText = '満足している'; break;
            default: historyData[i].satisfactionText = '<button id="' + historyData[i].settingId + '" class="history-regist-button mdl-button mdl-js-button">登録する</button>';                         
        }

        let tableText = {
            settingId: historyData[i].settingId,
            coverage: historyData[i].coverage + '回  (' + Number(new Date(Number(historyData[i].classDate)).getMonth()+1) + '/' + new Date(Number(historyData[i].classDate)).getDate() + ')',
            understanding: historyData[i].understanding,
            executing: historyData[i].executingText,
            achievement: historyData[i].achievementText,
            satisfaction: historyData[i].satisfactionText
        }

        // テーブル内容の表示
        $('.learning-history-tbody').append(
            '<tr id=' + tableText.settingId + '><td class="coverage">' + tableText.coverage + '</td><td>' + tableText.understanding + '</td><td>' + tableText.executing + '</td><td>' + tableText.achievement + '</td><td>' + tableText.satisfaction + '</td><td><button id=' + historyData[i].coverage + ' class="history-chatbot-button mdl-button mdl-js-button">第'+ historyData[i].coverage + '回振り返り</button><td><button id="' + tableText.settingId + '" class="history-detail-button mdl-button mdl-js-button">詳細</button><button class="history-statistics-button mdl-button mdl-js-button">統計</button></td></tr>'
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

    // 授業の予定を登録
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
    setStatistics();
}

/**
 * 新規学習計画の作成
 */
function displayLearningSetting(){

    $('.learning-setting-modal-wrapper').addClass('is-visible'); // 目標の設定モーダルの表示

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

    // フォームの入力項目チェック
    // 必須項目が入力されていたら「登録」ボタンのdisable化を解除
    $('.learning-setting-modal-wrapper input.required').on('change', function(){
        let disabled = false;
        $('.learning-setting-modal-wrapper input.required').each(function() {
            if($(this).val() === ''){
                disabled = true;
            }
            $('.learning-setting-modal-wrapper .learning-setting-regist-button').attr('disabled', disabled);
        });
    });


    // 登録ボタンが押されたら
    $('.learning-setting-regist-button').off('click').on('click', function(){
        let settingId = new Date().getTime().toString(16)  + Math.floor(1000*Math.random()).toString(16);   // settingIdの生成
        // 予習開始日の入力値をunixTimeに変換
        let prepareDateArray = $('#classDate').val().split('-');
        let classDate = new Date(Number(prepareDateArray[0]), Number(prepareDateArray[1])-1, Number(prepareDateArray[2]), 0,0,0,0).getTime();
        // POSTデータの生成
        let data = {
            'settingId': settingId,
            'coverage': $('#coverage').val(),
            'classDate': classDate,
            'understanding': $('#understanding').val(),
            'insertTime': new Date().getTime()
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
            historyData.push(data);
            selectHistoryData = data;
            displayCalenderDate = selectHistoryData.classDate;
            displayItems = {
                plans: [],
                records: []
            };
            displayHistoryTable();
            displayCalender();
            
            exit();
        })
        // Ajaxリクエストが失敗した時発動
        .fail( (data) => {
           alert('学習の設定情報の登録に失敗しました');
        });
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
    window.open('https://takagi-lab.tk/chatbot/page/lesson/2019b/bot_page/' + Number(selectCoverage) + '.php');
}

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

    // フォームの入力項目チェック
    $('.history-detail-modal-wrapper input.required').on('input', function(){
        let disabled = false;
        $('.history-detail-modal-wrapper input.required').each(function() {
            if($(this).val() === ''){
                disabled = true;
            }

            $('.history-detail-modal-wrapper .history-edit-button').attr('disabled', disabled);
        });
    });

    // フォームの値セット
    let selectData = {};
    for(let data=0; data<historyData.length; data++){
        if(historyData[data].settingId == settingId){
            selectData = historyData[data];

            // 予習日入力値用に変換
            let today = new Date(Number(selectData.classDate));
            let month = today.getMonth()+1;
            month = (month < 10) ? '0'+month : month;
            let date = (today.getDate() < 10) ? '0'+today.getDate() : today.getDate();
            classDate = today.getFullYear() + '-' + month + '-' + date;

            // フォームに値をセット
            $('.history-detail-modal-wrapper #coverage').val(selectData.coverage);
            $('.history-detail-modal-wrapper #classDate').val(classDate);
            $('.history-detail-modal-wrapper #understanding').val(selectData.understanding);
            $('.history-detail-modal-wrapper #goal').val(selectData.goal);
            $('.history-detail-modal-wrapper #learningSatisfaction').val(selectData.satisfaction);
            $('.history-detail-modal-wrapper #testScore').val(selectData.testScore);

            // 編集ボタンが押されたら
            $('.history-detail-modal-wrapper .history-edit-button').off('click').on('click', function(){
                let editData = {};
                editData.coverage = $('.history-detail-modal-wrapper #coverage').val();
                let prepareDateArray = $('.history-detail-modal-wrapper #classDate').val().split('-');
                editData.classDate = new Date(Number(prepareDateArray[0]), Number(prepareDateArray[1])-1, Number(prepareDateArray[2]), 0,0,0,0).getTime();
                editData.understanding = $('.history-detail-modal-wrapper #understanding').val();
                editData.goal = $('.history-detail-modal-wrapper #goal').val();
                editData.satisfaction = $('.history-detail-modal-wrapper #learningSatisfaction').val();
                editData.testScore = $('.history-detail-modal-wrapper #testScore').val();
                editData.settingId = settingId;

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

                    if(selectData.classDate != editData.classDate){
                        updateExecuting();
                        getCalenderItem();
                    }

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
 * 統計情報の表示
 */
function displayStatistics(){
    $('.statistics-modal-wrapper').addClass('is-visible');    //統計情報モーダルの表示

    let exit = function(){
        $('.statistics-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
        displayStatisticsFlag = false;
    }

    // キャンセルボタン押されたら
    $('.header-cansel-button').click(function () {
        exit();
    });
}

/**
 * 統計情報の設定
 */
function setStatistics(){

    if(statisticsData.timeChart){
        statisticsData.timeChart.destroy();
    }
    statisticsData = {};

    // 計画学習時間の合計算出
    let totalPlanTime = 0;
    for(let plan of displayItems.plans){
        if(plan.learningFlag){
            let start = plan.time.start.split(':') // 開始時の取得
            let end = plan.time.end.split(':') // 最後時の取得
            totalPlanTime += (Number(end[0]) * 60 + Number(end[1])) - (Number(start[0]) * 60 + Number(start[1]));
        }
    }

    // 実際学習時間と学習時間帯の分布の算出
    let totalRecordTime = 0;
    let timezone = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0};
    for(let record of displayItems.records){
        let start = record.time.start.split(':') // 開始時の取得
        let end = record.time.end.split(':') // 最後時の取得
        let startTimeHour = Number(start[0]);
        let startTimeMinute = Number(start[1]);
        let endTimeHour = Number(end[0]);
        let endTimeMinute = Number(end[1]);
    
        // 実際学習時間の合計算出
        let diffTime = (endTimeHour * 60 + endTimeMinute) - (startTimeHour * 60 + startTimeMinute);
        totalRecordTime += diffTime;

        // 学習時間帯の分布を算出
        // 開始時と終了時が同一の場合は処理の流れを別にする
        if (startTimeHour === endTimeHour) {
            timezone[startTimeHour] += endTimeMinute - startTimeMinute;
        }

        // 開始時と終了時が異なる場合は以下の通り計算する
        for (let currentHour = startTimeHour; currentHour <= endTimeHour; currentHour++) {
            if (currentHour === startTimeHour) {
                timezone[currentHour] += 60 - startTimeMinute;
            } 
            else if (currentHour === endTimeHour) { 
                timezone[currentHour] += endTimeMinute;
            }
            else {
                timezone[currentHour] += 60;
            }
        }
    }

    // 1回あたりの平均学習時間
    let averageRecordTime = 0;
    if(totalRecordTime !== 0){
        averageRecordTime = Math.round(totalRecordTime / displayItems.records.length);
    }

    // テーブル内容のセット
    $('#totalPlanTime td').text(escape(totalPlanTime) + '分');
    $('#totalRecordTime td').text(escape(totalRecordTime) + '分');
    $('#averageRecordTime td').text(escape(averageRecordTime) + '分');
    
    // グラフのセット
    let timeChart = modules.setChartItem.set(modules, timezone);

    statisticsData = {
        totalPlanTime: totalPlanTime,
        totalRecordTime: totalRecordTime,
        averageRecordTime: averageRecordTime,
        timeChart: timeChart
    };

    statisticsData.timeChart.update();

    setStatisticsFlag = true;

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
            alert('既に追加された予定と被ります．空いている時間に変更しましょう．');
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
        let selectContent = $('.learning-record-create-modal-wrapper select.required').val();
        let inputContent = $('.learning-record-create-modal-wrapper #inputLearningContent').val();
        if(value === '' || selectContent == '学習内容を選択' || (selectContent == 'その他' && inputContent == '')){
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
        record.time.start = $('.learning-record-create-modal-wrapper #learningTimeStart').val();
        record.time.end = $('.learning-record-create-modal-wrapper #learningTimeEnd').val();
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
                alert('将来の学習記録は登録できません．日時を確認してください．');
            }
        }else{
            postRecord(record);
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
                        alert('将来の学習記録は登録できません．日時を確認してください．');
                    }
                }else{
                    postRecord(record);
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

                // エラーがあれば表示、なければ登録処理
                if(doubleBookingFlag){
                    alert('既に追加された予定と被ります．空いている時間に変更しましょう')
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
                        alert('将来の学習記録は登録できません．日時を確認してください．');
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
                        calenderDataSet(editRecord, i, false);
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
                    calenderDataSet(selectRecord, false, i);
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
 * 無効な学習記録の登録チェック(将来の記録)
 */
function invalidRecordCheck(record){
    let currentTime = new Date().getTime();
    let invalidRecordFlag = false;

    let recordDateArray = record.date.split("-").map(Number);
    let recordTimeArray = record.time.end.split(":").map(Number);
    let recordTime = new Date(recordDateArray[0], recordDateArray[1]-1, recordDateArray[2], recordTimeArray[0], recordTimeArray[1]).getTime();

    // 現在と学習記録の日時比較
    // 現在よりも将来の学習記録の場合は無効とする
    if(currentTime < recordTime){
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

    // Ajax通信
    $.ajax({
        url:'./../../php/main/updateExecuting.php',
        type:'POST',
        data:{
            'settingId': selectSettingId,
            'executing': executing
        },
        dataType: 'json'       
    })
    // Ajaxリクエストが成功した時発動
    .done( (data) => {
        selectHistoryData.executing = executing;
        displayHistoryTable();
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
       
    })
}

/**
 * 学習内容リストのセット
 */
function setLearningContentList(){
    $('#selectLearningContent').html('<option>学習内容を選択</option>');
    // 学習内容リストのセット
    for(let plan of displayItems.plans){
        if(plan.learningFlag){
            $('<option value="' + escape(plan.content) + '">' + escape(plan.content) + '</option>').appendTo('#selectLearningContent');
        }
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
            // chatbotのテスト点数を格納
            if(data.chatbot){
                for(let i=0; i<historyData.length; i++){
                    for(let j=0; j<data.chatbot.length; j++){
                        if(historyData[i].settingId == data.chatbot[j].settingId){
                            // 目標達成度がNULLだったらチャットボットから点数を持ってくる
                            if(historyData[i].achievement == null || historyData[i].achievement == ''){
                                historyData[i].goal = data.chatbot[j].goal;
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
            } 
        }
        selectSettingId = data.history.slice(-1)[0].settingId;
        selectHistoryData = data.history.slice(-1)[0];
        displayCalenderDate = selectHistoryData.classDate;
        displayHistoryTable();
        getCalenderItem();
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
       
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
        calenderDataSet(record, false, false);
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
        alert('登録に失敗しました');
    })
}