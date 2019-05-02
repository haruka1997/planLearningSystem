var record = {
    id: 0,
    content: "",
    date: "",
    time: {
        start: 0,
        end: 0
    },
    tag: "",
    memo: "",
    learningFlag: true
};
var editRecord = {
    id: 0,
    content: "",
    date: "",
    time: {
        start: 0,
        end: 0
    },
    tag: "",
    memo: "",
    learningFlag: true
};

var learningRecords = []; // 登録された学習記録

$(function(){

    // 学習の記録追加ボタンを押されたら
    $('#add-learning-record').click(function (){
        learningRecordAdd();
    });

    // カレンダー内を押されたら
    $('.calender-content').click(function () {
        var id = $(this).attr("id");
        if(id !== undefined){   //計画詳細表示の場合
            var category = id.slice(0,1);
            if(category === 'R'){
                learningRecordDetail(id);   //学習記録詳細表示
            }
        }
    });
    
});

/**
 * 学習の記録追加処理
 */
function learningRecordAdd(){
    $('.learning-record-create-modal-wrapper').addClass('is-visible');    //学習記録作成モーダル表示

    // キャンセルボタン押されたら
    $('.header-cansel-button').click(function () {
        $('.learning-record-create-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
        initModalForm(true)
    });

    // 追加ボタン押されたら
    $('.learning-add-button').one("click", function() {

        //  入力内容の取得
        record.content = $('#learningContent').val();
        record.date = $('#learningDate').val();
        record.time.start = $('#learningTimeStart').val();
        record.time.end = $('#learningTimeEnd').val();
        record.memo = $('#learningMemo').val();

        // idの設定
        record.id = 'R' + new Date().getTime();

        // ダブルブッキングチェック
        var doubleBookingFlag = recordDubleBookingCheck(editRecord, record.id);

        if(doubleBookingFlag){
            $('.modal-error').text('既に追加された予定と被ります．空いている時間に変更しましょう．');
        }else{
            recordDataSet(record, false);
        }

    });
}

/**
 * モーダルフォームの初期化
 */
function initModalForm(){
    $('#learningContent').val('');
    $('#learningDate').val('');
    $('#learningTimeStart').val('');
    $('#learningTimeEnd').val('');
    $('#learningMemo').val('');
    $('.modal-error').text('');
}

/**
 * カレンダーに予定追加
 * @param {*} plan 
 */
function calenderItemSet(items){
    for(var itemsIndex=0; itemsIndex<items.length; itemsIndex++){
        var startHour = Number(items[itemsIndex].time.start.slice(0, items[itemsIndex].time.start.indexOf(":"))); //開始時
        var startMinute = Number(items[itemsIndex].time.start.slice(items[itemsIndex].time.start.indexOf(":")+1, 5)); //開始分
        startMinute = Math.floor(startMinute / 15) * 15; //開始分を15分刻みで切り捨て
        var tdNthChild = ''; //どの曜日に予定を追加するかを設定 (例：nth-child(2) => 月曜日)
        var trNthChild = ''; //どの時間に予定を追加するかを設定(例：nth-child(1) => 0時)
        var rowspan = ''; //結合するマス数 (例：15分間 => 1)

        /**
         * どの列に予定を追加するか調整
         */
        var nthDay = new Date(items[itemsIndex].date).getDay(); //曜日(0:日曜, 1:月曜...)
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
        var endHour = Number(items[itemsIndex].time.end.slice(0, items[itemsIndex].time.end.indexOf(":")));
        var endMinute = Number(items[itemsIndex].time.end.slice(items[itemsIndex].time.end.indexOf(":")+1, 5));
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
        $('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).html(items[itemsIndex].time.start + '<br>' + items[itemsIndex].content);   //学習内容を設定
        $('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).addClass('add-plan'); //classを付与
        $('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).attr('id', items[itemsIndex].id); //idを付与
        $('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).attr('rowspan', rowspan);  //rowspanの設定
        //行の削除
        for(var j=0; j<deletetrNthChild.length; j++){ //削除する行分
            $('.calender-table tbody tr:' + deletetrNthChild[j] + ' td:' + tdNthChild).remove(); //対象要素を追加
        }

        if(!items[itemsIndex].learningFlag){ //プライベートの予定の追加の場合
            $('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).addClass(items[itemsIndex].tag); //classを付与(タグ色)
        }else{
        }

        initModalForm();
    }

}

function calenderItemRemove(items){
    for(var itemsIndex=0; itemsIndex<items.length; itemsIndex++){
        var startHour = Number(items[itemsIndex].time.start.slice(0, items[itemsIndex].time.start.indexOf(":"))); //開始時
        var startMinute = Number(items[itemsIndex].time.start.slice(items[itemsIndex].time.start.indexOf(":")+1, 5)); //開始分
        startMinute = Math.floor(startMinute / 15) * 15; //開始分を15分刻みで切り捨て
        var tdNthChild = ''; //どの曜日に予定を追加するかを設定 (例：nth-child(2) => 月曜日)
        var trNthChild = ''; //どの時間に予定を追加するかを設定(例：nth-child(1) => 0時)
        var rowspan = ''; //結合するマス数 (例：15分間 => 1)

        /**
         * どの列の予定を削除するか調整
         */
        var nthDay = new Date(items[itemsIndex].date).getDay(); //曜日(0:日曜, 1:月曜...)
        if(nthDay == 0){ //日曜日の場合
            tdNthChild = 'nth-child(' + 8 + ')'; //8列目(日曜日の列)に設定
        }else{          //その他
            tdNthChild = 'nth-child(' + Number(nthDay+1) + ')'; //曜日値 + 1列目に設定(例：月曜 => 1+1=2列目)
        }

        /**
         * どの行の予定を削除するか調整 
         */
        var nthHour = (startHour-6) * 4 + 1; //例6時 => 1行目
        nthHour += startMinute / 15; //例：30分 => +2行目
        trNthChild = 'nth-child(' + nthHour + ')'; //例：0時30分 => 4行目 から予定を追加する

        /**
         * rowspanの設定
         */ 
        //終了時間 - 開始時間の分を取得(例：00:30〜01:00 => 30)
        var endHour = Number(items[itemsIndex].time.end.slice(0, items[itemsIndex].time.end.indexOf(":")));
        var endMinute = Number(items[itemsIndex].time.end.slice(items[itemsIndex].time.end.indexOf(":")+1, 5));
        var gapMinute = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
        rowspan = gapMinute / 15; //例：30分間 => 2行分結合する

        /**
         * 追加する行の設定(結合した分だけ行を追加する)
         */
        var addtrNthChild = []; //削除する行の配列
        for(var i=1; i<rowspan; i++){ //rowspanした分だけ
            addtrNthChild.push('nth-child(' + Number(nthHour+i) + ')'); //削除する行の情報を配列に格納
        }

        //予定を追加する対象行列に時間と予定名を追加
        $('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).html("");   //学習内容を設定
        $('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).removeClass('add-plan'); //classを付与
        $('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).attr('id', ''); //idを付与
        $('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).attr('rowspan', '');  //rowspanの設定

        //行の追加
        for(var j=0; j<addtrNthChild.length; j++){ //削除する行分
            $('.calender-table tbody tr:' + addtrNthChild[j] + ' td:' + tdNthChild).after('<td class="calender-content">'); //対象要素を追加
        }

        if(!items[itemsIndex].learningFlag){ //プライベートの予定の追加の場合
            $('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).removeClass(items[itemsIndex].tag); //classを付与(タグ色)
        }

    }
}

/**
 * 学習記録詳細表示
 */
function learningRecordDetail(id){
    for(var i=0; i<learningRecords.length; i++){
        if(learningRecords[i].id == id){ //選択した計画データ一致
            var record = learningRecords[i];

            $('.learning-record-detail-modal-wrapper').addClass('is-visible');    //学習記録詳細モーダル表示

            // キャンセルボタン押されたら
            $('.header-cansel-button').click(function () {
                $('.learning-record-detail-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
            });

            // フォームの値セット
            $('#detailLearningContent').val(record.content);
            $('#detailLearningDate').val(record.date);
            $('#detailLearningTimeStart').val(record.time.start);
            $('#detailLearningTimeEnd').val(record.time.end);
            $('#detailLearningMemo').val(record.memo);

            // TODO: 予定編集処理
            // 編集ボタン押されたら
            $('.learning-edit-button').one("click", function () {

                //  入力内容の取得
                editRecord.content = $('#detailLearningContent').val();
                editRecord.date = $('#detailLearningDate').val();
                editRecord.time.start = $('#detailLearningTimeStart').val();
                editRecord.time.end = $('#detailLearningTimeEnd').val();
                editRecord.memo = $('#detailLearningMemo').val();
                editRecord.learningFlag = true;
<<<<<<< HEAD
                editRecord.id = 'R' + new Date().getTime();
=======
>>>>>>> fix/double-booking-check

                // ダブルブッキングチェック
                var doubleBookingFlag = recordDubleBookingCheck(editRecord, id);

                if(doubleBookingFlag){
                    $('.modal-error').text('既に追加された予定と被ります．空いている時間に変更しましょう．');
                }else{
                    editRecord.id = 'R' + new Date().getTime();
                    recordDataSet(editRecord, i);
                }
            });
            break;
        }
    }
}


function recordDubleBookingCheck(record, id){
    var doubleBookingFlag = false;
    // 学習計画とのダブりチェック
    for(var learningIndex = 0; learningIndex < learningRecords.length; learningIndex++){
        if(id !== learningRecords[learningIndex].id){
            if(learningRecords[learningIndex].date == record.date){
                // 開始時間が既に作成された予定とダブる または　終了時間が既に作成された予定とダブる
                if((learningRecords[learningIndex].time.start < record.time.start && learningRecords[learningIndex].time.end > record.time.start)
                || (learningRecords[learningIndex].time.start < record.time.end && learningRecords[learningIndex].time.end > record.time.end)){
                    doubleBookingFlag = true;
                    break;
                }
            }
        }
    }
    return doubleBookingFlag; 
}

function recordDataSet(record, editFlag){
    var beforelearningRecords = JSON.parse(JSON.stringify(learningRecords));
    calenderItemRemove(beforelearningRecords);

    var afterlearningRecords = JSON.parse(JSON.stringify(beforelearningRecords));
    if(editFlag !== false){
        afterlearningRecords.splice(Number(editFlag),1);
    }
    afterlearningRecords.push(record);

    // カレンダーセット
    calenderItemSet(afterlearningRecords);
    learningRecords = JSON.parse(JSON.stringify(afterlearningRecords));

    if(editFlag === false){
        $('.learning-record-create-modal-wrapper').removeClass('is-visible');
    }else{
        $('.learning-record-detail-modal-wrapper').removeClass('is-visible');
    }
}