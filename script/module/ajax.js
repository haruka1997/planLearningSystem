/**
 * 計画の追加
 */
module.exports.postPlan = function(plan){
    // Ajax通信
    $.ajax({
        url:'./../../php/planCreate/postPlan.php',
        type:'POST',
        data:{
            'userId': window.sessionStorage.getItem(['userId']),
            'planId': plan.planId,
            'settingId': window.sessionStorage.getItem(['settingId']),
            'content': plan.content,
            'planDate': plan.planDate,
            'planTime': JSON.stringify(plan.planTime),
            'memo': plan.memo,
            'tag': plan.tag,
            'learningFlag': plan.learningFlag
        },
        dataType: 'json'       
    })
    // Ajaxリクエストが成功した時発動
    .done( (data) => {
        return data;
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
        alert('登録に失敗しました');
    })
}

/**
 * 計画の編集
 */
module.exports.updatePlan = function(plan, planId){
    // Ajax通信
    $.ajax({
        url:'./../../php/planCreate/updatePlan.php',
        type:'POST',
        data:{
            'planId': planId,
            'editId': plan.planId
        },
        dataType: 'json'       
    })
    // Ajaxリクエストが成功した時発動
    .done( (data) => {
        return data;
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
        alert('編集に失敗しました');
        return data;
    })
}

/**
 * 計画の削除
 */
module.exports.deletePlan = function(planId){
    // Ajax通信
    $.ajax({
        url:'./../../php/planCreate/deletePlan.php',
        type:'POST',
        data:{
            'planId': planId
        },
        dataType: 'json'       
    })
    // Ajaxリクエストが成功した時発動
    .done( (data) => {
        return data;
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
        alert('削除に失敗しました');
        return data;
    })
}

module.exports.getPlan = function(){
    let today = new Date();
    let month = today.getMonth()+1;
    if(month<10) month = '0' + month;
    let this_monday = today.getDate() - today.getDay() + 1;
    let this_sunday = this_monday + 6;

    // 月曜日の日時
    let start_date = today.getFullYear() + "-"  + month + "-" + this_monday;
    // 日曜日の日時
    let end_date = today.getFullYear() + "-"  + month + "-" + this_sunday;

    // Ajax通信
    $.ajax({
        url:'./../../php/planCreate/getPlan.php',
        type:'POST',
        data:{
            'userId': window.sessionStorage.getItem(['userId']),
            'startDate': start_date,
            'endDate': end_date
        },
        dataType: 'json'       
    })
    // Ajaxリクエストが成功した時発動
    .done( (data) => {
        return data;
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
        alert('取得に失敗しました');
        return data;
    })

}
