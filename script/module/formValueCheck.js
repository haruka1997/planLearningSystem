module.exports.check = function(item){
    let errorMessage = [];

    let today = new Date();
    let month = today.getMonth();
    let this_date = today.getDay();  // 今日の曜日
    if(this_date == 0) this_date =  7;  // 日曜日なら
    let this_monday = today.getDate() - this_date + 1;
    let this_sunday = this_monday + 6;
    let this_monday_date = new Date(today.getFullYear(), month, this_monday, 0,0,0,0).getTime();
    let this_sunday_date = new Date(today.getFullYear(), month, this_sunday, 23,59,59,59).getTime();

    let itemDate = item.date.split('-');
    let itemTimeStart = item.time.start.split(':');
    let itemTimeEnd = item.time.end.split(':');

    if(item.date == "") errorMessage.push('学習日が未入力です');
    if(this_monday_date > itemDate ||  itemDate > this_sunday_date) errorMessage.push('今週の日付を入力してください');
    if(item.time.start == "" || item.time.end == "") errorMessage.push('時間が未入力です');

    // 学習計画なら
    if(item.learningFlag || item.learningFlag == "true" || item.learningFlag == undefined){
        if(item.content == "") errorMessage.push('学習内容が未入力です');
    }else{
        if(item.tag == "") errorMessage.push('タグ色を選択してください');
    }

    return errorMessage;
}