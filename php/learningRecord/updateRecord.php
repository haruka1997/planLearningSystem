<?php 
    header("Content-Type: application/json; charset=UTF-8");

    //エラー処理
    try {
        $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system;charset=utf8', 'localhost', 'localhost');
        // $dbh = new PDO('mysql:host=localhost; dbname=g031o008; charset=utf8;', 'g031o008', 'GRwd44v7');

        $stmt = $dbh->prepare('UPDATE record SET content = :content, recordDate = :recordDate, recordTime = :recordTime, memo = :memo WHERE recordId = :recordId'); 
        $stmt->bindParam(':recordId', $_POST['recordId'] , PDO::PARAM_STR);
        $stmt->bindParam(':content', $_POST['content'], PDO::PARAM_STR);
        $stmt->bindParam(':recordDate', $_POST['recordDate'] , PDO::PARAM_STR);
        $stmt->bindParam(':recordTime', $_POST['recordTime'], PDO::PARAM_STR);
        $stmt->bindParam(':memo', $_POST['memo'] , PDO::PARAM_STR);

        $flag = $stmt->execute();

        if ($flag) { 
            echo json_encode($flag);
            exit();  // 処理終了
        }else{
            // echo $stmt->execute();
        }
    } catch (PDOException $e) {
    }
?>