<?php 
    session_start();    // セッション開始

    //userIdがセッションに保存されていたら
    if($_SESSION['userId'] !== undefined){
        header('Location: ./main/index.php');
    }else{
        header('Location: https://takagi-lab.tk/chatbot/page/Login.php');
    }

?>
