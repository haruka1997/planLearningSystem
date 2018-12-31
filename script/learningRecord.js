var testPlan = {
        id: 1546229496324,
        studyContent: "三角関数",
        studyDate: "2018-12-25",
        studyTime: {
            start: '09:00',
            end: '10:30'
        },
        memo: "全て正解するまで解く"
};

$(function(){
    
    $(window).on('load',function(){
        calenderPlanSet(testPlan);  //テストデータの配置
    });

    // カレンダー内を押されたら
    $('.calender-content').click(function () {
        var id = $(this).attr("id");
        if(id == undefined){    //記録追加の場合
            recordAdd();  //記録追加表示
        }else{                  //記録詳細表示の場合
            recordDetail(id);   //記録詳細表示
        }
    });
});


function calenderPlanSet(plan){
    var startHour = Number(plan.studyTime.start.slice(0, plan.studyTime.start.indexOf(":"))); //開始時
    var startMinute = Number(plan.studyTime.start.slice(plan.studyTime.start.indexOf(":")+1, 5)); //開始分
    startMinute = Math.floor(startMinute / 15) * 15; //開始分を15分刻みで切り捨て
    var tdNthChild = ''; //どの曜日に予定を追加するかを設定 (例：nth-child(2) => 月曜日)
    var trNthChild = ''; //どの時間に予定を追加するかを設定(例：nth-child(1) => 0時)
    var rowspan = ''; //結合するマス数 (例：15分間 => 1)


    /**
     * どの列に予定を追加するか調整
     */
    var nthDay = new Date(plan.studyDate).getDay(); //曜日(0:日曜, 1:月曜...)
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
    var endHour = Number(plan.studyTime.end.slice(0, plan.studyTime.end.indexOf(":")));
    var endMinute = Number(plan.studyTime.end.slice(plan.studyTime.end.indexOf(":")+1, 5));
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
    $('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).html(plan.studyTime.start + ' ' +plan.studyContent);
    $('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).addClass('add-plan'); //classを付与
    $('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).attr('id', plan.id); //idを付与
    $('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).attr('rowspan', rowspan);  //rowspanの設定
    //行の削除
    for(var j=0; j<deletetrNthChild.length; j++){ //削除する行分
        $('.calender-table tbody tr:' + deletetrNthChild[j] + ' td:' + tdNthChild).remove(); //対象要素を削除
    }

    // plans.push(plan);   //テストデータに追加

    // 入力内容の削除
    // $('#studyContent').val('');
    // $('#studyDate').val('');
    // $('#studyTimeStart').val('');
    // $('#studyTimeEnd').val('');
    // $('#memo').val('');
}

function recordAdd(){

};

function recordDetail(id){

}