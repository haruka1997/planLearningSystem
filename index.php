<?php 
    session_start();    // セッション開始

    //userIdがセッションに保存されていたら
    if($_SESSION['userId'] !== undefined){
        header('Location: ./view/learningHistory/index.php');
    }else{
        header('Location: /view/login.php');
    }

?>
