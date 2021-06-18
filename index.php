<?php 
    session_start();    // セッション開始

    //userIdがセッションに保存されていたら
    if($_SESSION['userId'] !== undefined){
        header('Location: ./view/main/index.php');
    }else{
        header('Location: http://153.126.193.128/chatbot/page/Login.php');
    }

?>
