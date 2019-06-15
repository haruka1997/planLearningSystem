module.exports.init = function($, calenderDateArray, selectButton, escape){

    let scrollTop = $('.calender tbody').scrollTop();   // 現在のカレンダーのスクロール位置を取得

    // カレンダーがセットされていたら一度削除する
    if($(".calender-display-content").find('.calender')){
        $(".calender").remove();
    }

    // カレンダーモジュール
    if(selectButton !== '計画と記録'){
        var calender = require('./../../view/common/singleCalender.html');
    }else{
        var calender = require('./../../view/common/doubleCalender.html');
    }

    // カレンダーをセットする
    $(".calender-display-content").append(calender);

    // カレンダーの縦幅設定
    var wH = $(window).height() - 100;  // 現在の画面の縦幅を取得
    $('.calender-table tbody').css('height', wH);

    $('.calender tbody').scrollTop(scrollTop);  // 前回のスクロール位置に設定

    // カレンダーの日付表示設定
    if(calenderDateArray.length>0){
        $('.calender-table tr .calender-date').each(function(i){
            $(this).text(calenderDateArray[i].date + '日' + calenderDateArray[i].day);
            if(calenderDateArray[i].day == '(土)'){
                $(this).css('color', '#0288D1');
            }
            if(calenderDateArray[i].day == '(日)'){
                $(this).css('color', '#F44336');
            }
        });
    }
}