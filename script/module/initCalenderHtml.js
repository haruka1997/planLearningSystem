module.exports.init = function($){
    if($("#plan-create-content").find('.calender')){
        $(".calender").remove();
    }
    var calender = require('./../../view/common/calender.html');

    $("#plan-create-content").append(calender);

    // カレンダーの縦幅設定
    var wH = $(window).height() - 50;  // 現在の画面の縦幅を取得
    $('.calender-table tbody').css('height', wH);
}