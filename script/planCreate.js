var plan = {
    id: 0,
    content: "",
    date: "",
    time: {
        start: 0,
        end: 0
    },
    tag: "",
    memo: "",
    studyFlag: true
};

var learningListData = [
    {learningList: '三角関数の問題を解く', time: '30分'},
    {learningList: '弧度法の問題を解く', time: '60分'}
];

var learningListOpenFlag = false,   // 学習リスト開閉フラグ
    learningListDataSetFlag = false,    // 学習リストデータセットフラグ
    planReferenceOpenFlag = false,  // 学習計画参考データ開閉フラグ
    planReferenceChartSetFlag = false;  // 学習計画参考データグラフセット
    learningListDataModalSetFlag = false,   // 学習計画の作成モーダルの学習リストデータセット
    learningSettingWindowShowFlag = true, // 学習の設定画面表示フラグ
    learningListCreateWindowShowFlag = false,   // 学習リストの作成画面表示フラグ
    planCreateWindowShowFlag = false;   // 計画の作成画面表示フラグ


// 選択されたタグ色
var selectTag = '';

$(function(){

    $('#learning-setting-content').addClass('show');    // 学習の設定画面を表示状態にする

    // 学習の設定画面の登録ボタンが押されたら
    $('.learning-setting-regist-button').click(function (){
        // DB登録処理

        // 学習リストの作成画面に遷移
        learningListCreate();
    });

    // 学習リストの作成画面の登録ボタンが押されたら
    $('.learning-list-regist-button').click(function (){
        // DB登録処理

        // 学習リストの作成画面に遷移
        planCreate();
    });

    // 学習の設定ボタンが押されたら
    $('.learning-setting-button').click(function (){
        learningSetting();
    });

    // 学習リストの作成ボタンが押されたら
    $('.learning-list-create-button').click(function (){
        learningListCreate();
    });

    // 計画の作成ボタンが押されたら
    $('.plan-create-button').click(function (){
        planCreate();
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
    $('.calender-content').click(function () {
        var id = $(this).attr("id");
        if(id !== undefined){   //計画詳細表示の場合
            planDetail(id);   //計画詳細表示
        }
    });

    // 学習リストボタンが押されたら
    $('.learning-list-button').click(function(){
        learningListOpenFlag = !learningListOpenFlag;
        
        if(learningListOpenFlag){   //学習リスト開
            $('.learning-list-button i').text('keyboard_arrow_down');
            if(!learningListDataSetFlag){
                // 学習リストデータ出力
                for(var i=0; i<learningListData.length; i++){
                    $('<p>・' + learningListData[i].learningList + '(' + learningListData[i].time + ')</p>').appendTo('.learning-list-item');
                }
                learningListDataSetFlag = true;
            }
        }else{  //学習リスト閉
            $('.learning-list-button i').text('keyboard_arrow_right');
        }

        $('.learning-list-item').slideToggle();
    });
    
    // 学習計画参考データボタンが押されたら
    $('.plan-reference-button').click(function(){
        planReferenceOpenFlag = !planReferenceOpenFlag;
        $('.plan-reference-item').slideToggle();
        
        if(planReferenceOpenFlag){   //学習リスト開
            $('.plan-reference-button i').text('keyboard_arrow_down');
            if(!planReferenceChartSetFlag){
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
                                fill: false
                            },
                            {
                                label: '目標達成率',
                                data: [90, 80, 50, 40, 80, 90],
                                backgroundColor: "#D81B60",
                                borderColor: '#F06292',
                                fill: false
                            },
                            {
                                label: '学習満足率',
                                data: [80, 70, 50, 30, 20, 90],
                                backgroundColor: "#C0CA33",
                                borderColor: '#DCE775',
                                fill: false
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
                planReferenceChartSetFlag = true;
            }
        }else{  //学習リスト閉
            $('.plan-reference-button i').text('keyboard_arrow_right');
        }
	});
});

function learningSetting(){
    if(!learningSettingWindowShowFlag){   // 学習の設定画面が表示中でなければ
        $('#learning-setting-content').addClass('show');    // 学習の設定画面を表示状態にする
        $('.learning-setting-button').removeClass('unselected');  // 学習の設定ボタンを選択状態にする
        if(learningListCreateWindowShowFlag){ // 学習リストの作成画面が表示中なら
            $('#learning-list-create-content').removeClass('show'); // 学習リストの作成画面を非表示状態にする
            $('.learning-list-create-button').addClass('unselected');   // 学習リストの作成ボタンを非選択状態にする
            learningListCreateWindowShowFlag = false;
        }jk
        if(planCreateWindowShowFlag){ // 計画の作成画面が表示中なら
            $('#plan-create-content').removeClass('show');  // 計画の作成画面を非表示状態にする
            $('.plan-create-button').addClass('unselected');    // 計画の作成ボタンを非選択状態にする
            planCreateWindowShowFlag = false;
        }
        learningSettingWindowShowFlag = true;
    }
}

function learningListCreate(){
    if(!learningListCreateWindowShowFlag){   // 学習リストの作成画面が表示中でなければ
        $('#learning-list-create-content').addClass('show');    // 学習の設定画面を表示状態にする
        $('.learning-list-create-button').removeClass('unselected');  // 学習の設定ボタンを選択状態にする
        $('.plan-reference-button').addClass('show'); //学習計画参考データボタンを表示する
        if(learningSettingWindowShowFlag){ // 学習リストの作成画面が表示中なら
            $('#learning-setting-content').removeClass('show'); // 学習リストの作成画面を非表示状態にする
            $('.learning-setting-button').addClass('unselected');   // 学習リストの作成ボタンを非選択状態にする
            learningSettingWindowShowFlag = false;
        }
        if(planCreateWindowShowFlag){ // 計画の作成画面が表示中なら
            $('#plan-create-content').removeClass('show');  // 計画の作成画面を非表示状態にする
            $('.plan-create-button').addClass('unselected');    // 計画の作成ボタンを非選択状態にする
            planCreateWindowShowFlag = false;
        }
        learningListCreateWindowShowFlag = true;
    }
}

function planCreate(){
    if(!planCreateWindowShowFlag){   // 学習の設定画面が表示中でなければ
        $('#plan-create-content').addClass('show');    // 学習の設定画面を表示状態にする
        $('.plan-create-button').removeClass('unselected');  // 学習の設定ボタンを選択状態にする
        $('.learning-list-button').addClass('show'); //学習リストボタンを非表示にする

        // 学習計画参考データの表示初期化
        if(planReferenceOpenFlag){
            planReferenceOpenFlag = false;
            planReferenceChartSetFlag = false;
            $('.plan-reference-button i').text('keyboard_arrow_right');
            $('.plan-reference-item').css('display', 'none');
        }

        if(learningListCreateWindowShowFlag){ // 学習リストの作成画面が表示中なら
            $('#learning-list-create-content').removeClass('show'); // 学習リストの作成画面を非表示状態にする
            $('.learning-list-create-button').addClass('unselected');   // 学習リストの作成ボタンを非選択状態にする
            learningListCreateWindowShowFlag = false;
        }
        if(learningSettingWindowShowFlag){ // 計画の作成画面が表示中なら
            $('#learning-setting-content').removeClass('show');  // 計画の作成画面を非表示状態にする
            $('.learning-setting-button').addClass('unselected');    // 計画の作成ボタンを非選択状態にする
            learningSettingWindowShowFlag = false;
        }
        planCreateWindowShowFlag = true;
    }
}

/**
 * 学習の計画追加処理
 */
function learningPlanAdd(){
    $('.learning-plan-create-modal-wrapper').addClass('is-visible');    //学習計画作成モーダル表示

    // 学習内容のリスト表示
    if(!learningListDataModalSetFlag){
        for(var i=0; i<learningListData.length; i++){
            $('<option>' + learningListData[i].learningList + '</option>').appendTo('.learning-content');
        }
        learningListDataModalSetFlag = true;
    }

    // キャンセルボタン押されたら
    $('.header-cansel-button').click(function () {
        $('.learning-plan-create-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
    });

    // 追加ボタン押されたら
    $('.learning-add-button').click(function () {
        $('.learning-plan-create-modal-wrapper').removeClass('is-visible');    //モーダル閉じる

        //  入力内容の取得
        plan.content = $('#content').val();
        plan.date = $('#studyDate').val();
        plan.time.start = $('#studyTimeStart').val();
        plan.time.end = $('#studyTimeEnd').val();
        plan.memo = $('#memo').val();
        plan.studyFlag = true;

        // idの設定
        plan.id = new Date().getTime();

        calenderPlanSet(plan);

        // TODO: DBに予定追加

    });
}

/**
 * 学習の計画追加処理
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
        plan.date = $('#privateDate').val();
        plan.time.start = $('#privateTimeStart').val();
        plan.time.end = $('#privateTimeEnd').val();
        plan.tag = selectTag;
        plan.memo = $('#memo').val();
        plan.studyFlag = false;

        // idの設定
        plan.id = new Date().getTime();

        calenderPlanSet(plan);

        // TODO: DBに予定追加

    });
}

/**
 * モーダルフォームの初期化
 * @param {array} plan 
 */
function initModalForm(plan){
    if(plan.studyFlag){
        $('#content').val('');
        $('#studyDate').val('');
        $('#studyTimeStart').val('');
        $('#studyTimeEnd').val('');
        $('#memo').val('');
    }else{
        $('#privateDate').val('');
        $('#privateTimeStart').val('');
        $('#privateTimeEnd').val('');
        $('#privateTimeEnd').val('');
        $('.tag').removeClass('active');
        $('#memo').val('');
    }
}

/**
 * カレンダーに予定追加
 * @param {*} plan 
 */
function calenderPlanSet(plan){
    var startHour = Number(plan.time.start.slice(0, plan.time.start.indexOf(":"))); //開始時
    var startMinute = Number(plan.time.start.slice(plan.time.start.indexOf(":")+1, 5)); //開始分
    startMinute = Math.floor(startMinute / 15) * 15; //開始分を15分刻みで切り捨て
    var tdNthChild = ''; //どの曜日に予定を追加するかを設定 (例：nth-child(2) => 月曜日)
    var trNthChild = ''; //どの時間に予定を追加するかを設定(例：nth-child(1) => 0時)
    var rowspan = ''; //結合するマス数 (例：15分間 => 1)

    /**
     * どの列に予定を追加するか調整
     */
    var nthDay = new Date(plan.date).getDay(); //曜日(0:日曜, 1:月曜...)
    if(nthDay == 0){ //日曜日の場合
        tdNthChild = 'nth-child(' + 8 + ')'; //8列目(日曜日の列)に設定
    }else{          //その他
        tdNthChild = 'nth-child(' + Number(nthDay+1) + ')'; //曜日値 + 1列目に設定(例：月曜 => 1+1=2列目)
    }

    /**
     * どの行に予定を追加するか調整 
     */
    var nthHour = (startHour-6) * 4 + 1; //例6時 => 1行目
    nthHour += startMinute / 15; //例：30分 => +2行目
    trNthChild = 'nth-child(' + nthHour + ')'; //例：0時30分 => 4行目 から予定を追加する

    /**
     * rowspanの設定
     */ 
    //終了時間 - 開始時間の分を取得(例：00:30〜01:00 => 30)
    var endHour = Number(plan.time.end.slice(0, plan.time.end.indexOf(":")));
    var endMinute = Number(plan.time.end.slice(plan.time.end.indexOf(":")+1, 5));
    var gapMinute = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
    rowspan = gapMinute / 15; //例：30分間 => 2行分結合する

    /**
     * 削除する行の設定(結合した分だけ行を削除する)
     */
    var deletetrNthChild = []; //削除する行の配列
    for(var i=1; i<rowspan; i++){ //rowspanした分だけ
        deletetrNthChild.push('nth-child(' + Number(nthHour+i) + ')'); //削除する行の情報を配列に格納
    }

    /**
     * 時間の表示形式の設定(10以下は0埋め処理)
     */ 
    if(startHour < 10){
        startHour = '0' + startHour;
    }
    if(startMinute < 10){
        startMinute = '0' + startMinute;
    }

    //予定を追加する対象行列に時間と予定名を追加
    $('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).html(plan.time.start + '<br>' + plan.content);   //学習内容を設定
    $('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).addClass('add-plan'); //classを付与
    
    if(!plan.studyFlag){ //プライベートの予定の追加の場合
        $('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).addClass(plan.tag); //classを付与(タグ色)
    }
    $('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).attr('id', plan.id); //idを付与
    $('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).attr('rowspan', rowspan);  //rowspanの設定
    //行の削除
    for(var j=0; j<deletetrNthChild.length; j++){ //削除する行分
        $('.calender-table tbody tr:' + deletetrNthChild[j] + ' td:' + tdNthChild).remove(); //対象要素を削除
    }

    initModalForm(plan);

}


/**
 * 計画詳細表示
 */
function planDetail(id){
    for(var i=0; i<plans.length; i++){
        if(plans[i].id == id){ //選択した計画データ一致
            var plan = plans[i];
            $('.plan-detail-modal-wrapper').addClass('is-visible');    //計画作成モーダル表示

            // キャンセルボタン押されたら
            $('.header-cansel-button').click(function () {
                $('.plan-detail-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
            });

            // フォームの値セット
            $('#detailcontent').val(plan.content);
            $('#detaildate').val(plan.date);
            $('#detailtimeStart').val(plan.time.start);
            $('#detailtimeEnd').val(plan.time.end);
            $('#detailMemo').val(plan.memo);

            // TODO: 予定編集処理
            // 編集ボタン押されたら
            // $('.edit-button').click(function () {
            //     $('.plan-detail-modal-wrapper').removeClass('is-visible');    //モーダル閉じる

            //     //  入力内容の取得
            //     editPlan.content = $('#detailcontent').val();
            //     editPlan.date = $('#detaildate').val();
            //     editPlan.time.start = $('#detailtimeStart').val();
            //     editPlan.time.end = $('#detailtimeEnd').val();
            //     editPlan.memo = $('#detailMemo').val();
            //     // editPlan.id = id;

            //     // カレンダーに編集前の予定を削除
            //     calenderPlanSet(plan);
            //     // カレンダーに編集後の予定を追加
            //     // calenderPlanSet(editPlan);

            //     // TODO: DBに変更内容の編集
            // });
        }
    }
    
}