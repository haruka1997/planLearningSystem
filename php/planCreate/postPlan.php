<?php 
    header("Content-Type: application/json; charset=UTF-8");
    //エラー処理
    try {
        $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system', 'localhost', 'localhost');

        $stmt = $dbh->prepare('INSERT INTO plan (planId, userId, content, planDate, planTime, memo, tag, learningFlag, insertTime) VALUES(:planId, :userId, :content, :planDate, :planTime, :memo, :tag, :learningFlag, :insertTime)'); 
        $stmt->bindParam(':userId', $_POST['userId'], PDO::PARAM_STR);
        $stmt->bindParam(':planId', $_POST['planId'] , PDO::PARAM_INT);
        $stmt->bindParam(':content', $_POST['content'] , PDO::PARAM_STR);
        $stmt->bindParam(':planDate', $_POST['planDate'] , PDO::PARAM_STR);
        $stmt->bindParam(':planTime', $_POST['planTime'] , PDO::PARAM_STR);
        $stmt->bindParam(':memo', $_POST['memo'] , PDO::PARAM_STR);
        $stmt->bindParam(':tag', $_POST['tag'] , PDO::PARAM_STR);
        $stmt->bindParam(':learningFlag', $_POST['learningFlag'] , PDO::PARAM_BOOL);
        $stmt->bindParam(':insertTime',  $_SERVER['REQUEST_TIME'], PDO::PARAM_STR);

        $flag = $stmt->execute();

        if ($flag) { 
            exit();  // 処理終了
        }else{
            echo $stmt->execute();
        }
    } catch (PDOException $e) {
    }
?>