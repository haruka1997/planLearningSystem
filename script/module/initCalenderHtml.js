module.exports.init = function($, calenderDateArray){
    let scrollTop = $('.calender tbody').scrollTop();   // 現在のカレンダーのスクロール位置を取得

    // カレンダーがセットされていたら一度削除する
    if($(".calender-display-content").find('.calender')){
        $(".calender").remove();
    }

    // カレンダーモジュール
    var calender = require('./../../view/common/calender.html');

    // カレンダーをセットする
    $(".calender-display-content").append(calender);

    $('.calender tbody').scrollTop(scrollTop);  // 前回のスクロール位置に設定

    // カレンダーの縦幅設定
    // var wH = $(window).height() - 50;  // 現在の画面の縦幅を取得
    // $('.calender-table tbody').css('height', wH);

    // カレンダーの日付表示設定
    $('.calender-table tr .calender-date').each(function(i){
        $(this).text(calenderDateArray[i].date + '日' + calenderDateArray[i].day);
    });

}