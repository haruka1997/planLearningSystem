<?php 
    session_start();    // セッション開始

    //userIdがセッションに保存されていたら
    if($_SESSION['userId'] !== undefined){
        header('Location: ./learningHistory/index.php');
    }else{
        header('Location: ./login.php');
    }

?>
