<?php 
    session_start();    // セッション開始

    //userIdがセッションに保存されていたら
    if($_SESSION['userId'] !== undefined){
        header('Location: ./view/main/index.php');
    }else{
        header('Location: https://tkg-lab.tk/chatbot/page/Login.php');
    }

?>
