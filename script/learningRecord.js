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

var learningListData = [];
var learningRecords = []; // 登録された学習記録

// カレンダーセットモジュール
var calenderItemSet = require(`./module/calenderItemSet.js`);

$(function(){

    initCalenderHtml();
    // 学習記録の取得
    if(learningRecords.length == 0){
        // Ajax通信
        $.ajax({
            url:'./../../php/learningRecord/getRecord.php',
            type:'POST',
            data:{
                'userId': window.sessionStorage.getItem(['userId']),
                'settingId': window.sessionStorage.getItem(['settingId'])
            },
            dataType: 'json'       
        })
        // Ajaxリクエストが成功した時発動
        .done( (records) => {
            if(records.length > 0){
                for(let i in records){
                    records[i].id = records[i].recordId; 
                    records[i].date = records[i].recordDate;
                    records[i].time = JSON.parse(records[i].recordTime);
                    learningRecords.push(records[i]);
                }
                // カレンダーセット
                calenderItemSet.set(learningRecords);
            }
        })
        // Ajaxリクエストが失敗した時発動
        .fail( (data) => {
        })
    }

    // 学習内容の取得
    // Ajax通信
    $.ajax({
        url:'./../../php/learningRecord/getPlanContent.php',
        type:'POST',
        data:{
            'userId': window.sessionStorage.getItem(['userId']),
            'settingId': window.sessionStorage.getItem(['settingId'])
        },
        dataType: 'json'       
    })
    // Ajaxリクエストが成功した時発動
    .done( (data) => {
        if(data) {
            // 取得した学習内容を配列に格納
            for(item in data){
                learningListData.push(data[item].content);
            }
            // 学習内容リストのセット
            for(var i=0; i<learningListData.length; i++){
                $('<option value="' + learningListData[i] + '">' + learningListData[i] + '</option>').appendTo('#selectLearningContent');
            }
            $('<option value="その他">その他</option>').appendTo('#selectLearningContent');
        }
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
       
    })

    // 学習の記録追加ボタンを押されたら
    $('#add-learning-record').click(function (){
        learningRecordAdd();
    });

    // カレンダー内を押されたら
    $(document).on("click", ".calender-content", function () {
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

    // 学習内容で「その他」を選択されたら
    $('.select-learning-content').change(function() {
        if($('#selectLearningContent').val() == "その他"){
            $('.input-learning-content').css('display', 'inline');
        }else{
            $('.input-learning-content').css('display', 'none');
        }
    });

    // 追加ボタン押されたら
    $('.learning-add-button').one("click", function() {

        //  入力内容の取得
        if($('#selectLearningContent').val() !== "その他"){
            record.content = $('#selectLearningContent').val();
        }else{
            record.content = $('#inputLearningContent').val();
        }
        record.date = $('#learningDate').val();
        record.time.start = $('#learningTimeStart').val();
        record.time.end = $('#learningTimeEnd').val();
        record.memo = $('#learningMemo').val();

        // idの設定
        record.id = 'R' + new Date().getTime();

        // ダブルブッキングチェック
        var doubleBookingFlag = recordDubleBookingCheck(record, record.id);

        if(doubleBookingFlag){
            $('.modal-error').text('既に追加された予定と被ります．空いている時間に変更しましょう．');
            // モーダルを1秒後に閉じる
            $('.learning-record-create-modal-wrapper').delay(2000).queue(function(){
                $(this).removeClass('is-visible').dequeue();
                // モーダル初期化
                initModalForm(record.learningFlag);
            });
        }else{
            // Ajax通信
            $.ajax({
                url:'./../../php/learningRecord/postRecord.php',
                type:'POST',
                data:{
                    'userId': window.sessionStorage.getItem(['userId']),
                    'recordId': record.id,
                    'settingId': window.sessionStorage.getItem(['settingId']),
                    'content': record.content,
                    'recordDate': record.date,
                    'recordTime': JSON.stringify(record.time),
                    'memo': record.memo
                },
                dataType: 'json'       
            })
            // Ajaxリクエストが成功した時発動
            .done( (data) => {
                recordDataSet(record, false, false);
            })
            // Ajaxリクエストが失敗した時発動
            .fail( (data) => {
                alert('登録に失敗しました');
            })
        }

    });
}

/**
 * モーダルフォームの初期化
 */
function initModalForm(){
    $('#selectLearningContent').val('学習内容を選択');
    $('.input-learning-content').css('display', 'none');
    $('#inputLearningContent').val('');
    $('#learningDate').val('');
    $('#learningTimeStart').val('');
    $('#learningTimeEnd').val('');
    $('#learningMemo').val('');
    $('.modal-error').text('');
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

                // ダブルブッキングチェック
                var doubleBookingFlag = recordDubleBookingCheck(editRecord, id);

                if(doubleBookingFlag){
                    $('.modal-error').text('既に追加された予定と被ります．空いている時間に変更しましょう．');
                    // モーダルを1秒後に閉じる
                    $('.learning-record-detail-modal-wrapper').delay(2000).queue(function(){
                        $(this).removeClass('is-visible').dequeue();
                        // モーダル初期化
                        initModalForm(editRecord.learningFlag);
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
                        recordDataSet(editRecord, i, false);
                    })
                    // Ajaxリクエストが失敗した時発動
                    .fail( (data) => {
                        alert('編集に失敗しました');
                        return data;
                    })
                }
            });

            // 削除ボタン押されたら
            $('.learning-delete-button').one("click", function () {
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
                    recordDataSet(editRecord, false, i);
                })
                // Ajaxリクエストが失敗した時発動
                .fail( (data) => {
                    alert('編集に失敗しました');
                    return data;
                })
            });
            break;
        }
    }
}


function recordDubleBookingCheck(record, id){
    var doubleBookingFlag = false;
    console.log(record);
    // 学習計画とのダブりチェック
    for(var learningIndex = 0; learningIndex < learningRecords.length; learningIndex++){
        if(id !== learningRecords[learningIndex].id){
            if(learningRecords[learningIndex].date == record.date){
                // 開始時間が既に作成された予定とダブる または　終了時間が既に作成された予定とダブる
                if((learningRecords[learningIndex].time.start < record.time.start && learningRecords[learningIndex].time.end > record.time.start)
                || (learningRecords[learningIndex].time.start < record.time.end && learningRecords[learningIndex].time.end > record.time.end)
                || (learningRecords[learningIndex].time.start > record.time.start && learningRecords[learningIndex].time.end < record.time.end)
                || (learningRecords[learningIndex].time.start == record.time.start && learningRecords[learningIndex].time.end == record.time.end)){
                    doubleBookingFlag = true;
                    break;
                }
            }
        }
    }
    return doubleBookingFlag; 
}

function initCalenderHtml(){
    if($("#record-create-content").find('.calender')){
        $(".calender").remove();
    }
    var calender = require('./../view/common/calender.html');
    $("#record-create-content").append(calender);
}

function recordDataSet(record, editFlag, deleteFlag){
    initCalenderHtml();
    
    var afterLearningRecords = JSON.parse(JSON.stringify(learningRecords));
    if(editFlag !== false){
        afterLearningRecords.splice(Number(editFlag),1);
    }
    if(deleteFlag !== false){
        afterLearningRecords.splice(Number(deleteFlag),1);
    }else{
        afterLearningRecords.push(record);
    }

    // カレンダーセット
    calenderItemSet.set(afterLearningRecords);
    learningRecords = JSON.parse(JSON.stringify(afterLearningRecords));

    if(editFlag === false && deleteFlag === false){
        $('.learning-record-create-modal-wrapper').removeClass('is-visible');
    }else{
        $('.learning-record-detail-modal-wrapper').removeClass('is-visible');
    }
}