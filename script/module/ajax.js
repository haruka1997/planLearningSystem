/**
 * 計画をDBに追加
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