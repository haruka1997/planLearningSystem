$(function(){

    // ユーザ情報があれば廃棄
    if(window.sessionStorage.getItem(['userId']) !== null){
        window.sessionStorage.clear();
    }

    // ログインボタンが押されたら
    $('.sign-button').click(function (){
        
        // ユーザ情報セッション保存
        window.sessionStorage.setItem(['userId'], $('#userId'));

        // 学習記録の作成ページに遷移
        window.location.href = './../view/planCreate/index.php';


    });
});