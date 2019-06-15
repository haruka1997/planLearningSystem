// モジュール設定
var modules = require('./module/moduleInit.js');
modules = modules.loginSet();

$(function(){

    // ユーザ情報があれば廃棄
    if(window.sessionStorage.getItem(['userId']) !== null){
        window.sessionStorage.clear();
    }

    // ログインボタンが押されたら
    $('.sign-button').click(function (){

        // ユーザ情報の認証
        $.ajax({
            url:'./../php/login.php',
            type:'POST',
            data:{
                "userId":$("#userId").val(),
                "password":$("#password").val()
            },
            dataType: 'json'       
        })
        // Ajaxリクエストが成功した時発動
        .done( (data) => {
            // ユーザ情報セッション保存
            window.sessionStorage.setItem(['userId'], data.userId);
            window.location.href = './../view/main/index.php';

        })
        // Ajaxリクエストが失敗した時発動
        .fail( (XMLHttpRequest, textStatus, errorThrown) => {
            alert('ログインに失敗しました');
            console.log(data);
            console.log("ajax通信に失敗しました");
            console.log("XMLHttpRequest : " + XMLHttpRequest.status);
            console.log("textStatus     : " + textStatus);
            console.log("errorThrown    : " + errorThrown.message);
        })

    });
});