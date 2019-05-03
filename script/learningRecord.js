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

// カレンダーセットモジュール
var calenderItemSet = require(`./module/calenderItemSet.js`);

$(function(){

    initCalenderHtml();

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
            // モーダルを1秒後に閉じる
            $('.learning-record-create-modal-wrapper').delay(2000).queue(function(){
                $(this).removeClass('is-visible');
                // モーダル初期化
                initModalForm(record.learningFlag);
            });
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
    $('.2000').text('');
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

                // ダブルブッキングチェック
                var doubleBookingFlag = recordDubleBookingCheck(editRecord, id);

                if(doubleBookingFlag){
                    $('.2000').text('既に追加された予定と被ります．空いている時間に変更しましょう．');
                    // モーダルを1秒後に閉じる
                    $('.learning-record-detail-modal-wrapper').delay(2000).queue(function(){
                        $(this).removeClass('is-visible');
                        // モーダル初期化
                        initModalForm(editRecord.learningFlag);
                    });
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

function initCalenderHtml(){
    if($("#record-create-content").find('.calender')){
        $(".calender").remove();
    }
    var calender = require('./../view/common/calender.html');
    $("#record-create-content").append(calender);
}

function recordDataSet(record, editFlag){
    initCalenderHtml();

    var afterLearningRecords = JSON.parse(JSON.stringify(learningRecords));
    if(editFlag !== false){
        afterLearningRecords.splice(Number(editFlag),1);
    }
    afterLearningRecords.push(record);

    // カレンダーセット
    calenderItemSet.set(afterLearningRecords);
    learningRecords = JSON.parse(JSON.stringify(afterLearningRecords));

    if(editFlag === false){
        $('.learning-record-create-modal-wrapper').removeClass('is-visible');
    }else{
        $('.learning-record-detail-modal-wrapper').removeClass('is-visible');
    }
}