<?php 
    session_start();    // セッション開始

    //userIdがセッションに保存されていたら
    if($_SESSION['userId'] !== undefined){
        header('Location: ./main/index.php');
    }else{
        header('Location: ./login.php');
    }

?>
