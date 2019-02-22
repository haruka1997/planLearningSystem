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

var editPlan = {
    id: 0,
    content: "",
    date: "",
    time: {
        start: 0,
        end: 0
    },
    memo: ""
};
// テストデータ
var plans =  [];

// 選択されたタグ色
var selectTag = '';

$(function(){
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

    // 分析ボタンが押されたら
    $('.analysis-button button').click(function () {
        analysis(); //分析処理
    });
});

/**
 * 学習の計画追加処理
 */
function learningPlanAdd(){
    $('.learning-plan-create-modal-wrapper').addClass('is-visible');    //学習計画作成モーダル表示

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

        // 入力内容の削除
        $('#content').val('');
        $('#studyDate').val('');
        $('#studyTimeStart').val('');
        $('#studyTimeEnd').val('');
        $('#memo').val('');


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

        // 入力内容の削除
        $('#privateDate').val('');
        $('#privateTimeStart').val('');
        $('#privateTimeEnd').val('');
        $('#studyTimeEnd').val('');
        $('.tag').removeClass('active');
        $('#memo').val('');

        // TODO: DBに予定追加

    });
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
    $('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).html(plan.time.start + ' ' + plan.content);   //学習内容を設定
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

    plans.push(plan);   //テストデータに追加

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

// 分析処理
function analysis(){

    // キャンセルボタン押されたら
    $('.header-cansel-button').click(function () {
        $('.analysis-result-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
    });

    // 分析結果モーダル表示
    $('.analysis-result-modal-wrapper').addClass('is-visible');
    // 分析中...表示
    $('.analysis-roading').css('display', '');
    // 分析結果コンテンツ非表示
    $('.plan-modal').css('display', 'none');

    // TODO: 分析結果をDBから取得したら分析結果コンテンツを表示する
    $(function(){
        setTimeout(function(){
            // 分析中...非表示
            $('.analysis-roading').css('display', 'none');
            // 分析結果コンテンツ表示
            $('.plan-modal').css('display', 'block');
        },1000);
    });

}