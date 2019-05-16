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
            'planId': plan.id,
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
module.exports.updatePlan = function(plan, id){
    // Ajax通信
    $.ajax({
        url:'./../../php/planCreate/updatePlan.php',
        type:'POST',
        data:{
            'planId': id,
            'editId': plan.id
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
module.exports.deletePlan = function(id){
    // Ajax通信
    $.ajax({
        url:'./../../php/planCreate/deletePlan.php',
        type:'POST',
        data:{
            'planId': id
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