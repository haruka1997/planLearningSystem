module.exports.init = function($, calenderDateArray){
    if($(".calender-display-content").find('.calender')){
        $(".calender").remove();
    }
    var calender = require('./../../view/common/calender.html');

    $(".calender-display-content").append(calender);

    // カレンダーの縦幅設定
    var wH = $(window).height() - 50;  // 現在の画面の縦幅を取得
    $('.calender-table tbody').css('height', wH);

    let day = ['(月)', '(火)', '(水)', '(木)', '(金)', '(土)', '(日)'];
    $('.calender-table tr .calender-date').each(function(i){
        $(this).text(calenderDateArray[i] + '日' + day[i]);
    });

}