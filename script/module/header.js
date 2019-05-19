module.exports.init = function($){
    $(function(){
        $(window).on('load',function(){
            init();
        });
    });

    function init(){
        let pathName = location.pathname.split('/');
        var headerTitle = '';
        if(pathName[3] == 'planCreate'){
            headerTitle = '学習計画の作成';
        }else if(pathName[3] == 'learningRecord'){
            headerTitle = '学習記録の追加';
        }else{
            headerTitle = '学習履歴の参照';
        }

        // ヘッダータイトルの書き換え
        $('.header-title-text').text(headerTitle);
    }
}
