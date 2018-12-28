$(function(){
    // 分析ボタンが押されたら
    $('.analysis-button button').click(function () {
        analysis(); //分析処理
    });
});

// 分析処理
function analysis(){

    // キャンセルボタン押されたら
    $('.header-cansel-button').click(function () {
        $('.analysis-result-modal-wrapper').removeClass('is-visible');    //モーダル閉じる
    });

    // 分析結果モーダル表示
    $('.analysis-result-modal-wrapper').addClass('is-visible');
    // 分析結果コンテンツ非表示
    $('.plan-modal').css('display', 'none');

    // TODO: 分析結果をDBから取得したら分析結果コンテンツを表示する
    $(function(){
        setTimeout(function(){
            // 分析中...非表示
            $('.analysis-roading').css('display', 'none');
            // 分析結果コンテンツ表示
            $('.plan-modal').css('display', 'block');
        },2000);
    });


}