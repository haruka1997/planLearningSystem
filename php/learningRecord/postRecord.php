<?php 
    header("Content-Type: application/json; charset=UTF-8");

    //エラー処理
    try {
        $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system', 'localhost', 'localhost');

        $stmt = $dbh->prepare('INSERT INTO record (recordId, userId, settingId, content, recordDate, recordTime, memo) VALUES(:recordId, :userId, :settingId, :content, :recordDate, :recordTime, :memo)'); 
        $stmt->bindParam(':userId', $_POST['userId'], PDO::PARAM_STR);
        $stmt->bindParam(':recordId', $_POST['recordId'] , PDO::PARAM_STR);
        $stmt->bindParam(':settingId', $_POST['settingId'] , PDO::PARAM_STR);
        $stmt->bindParam(':content', $_POST['content'] , PDO::PARAM_STR);
        $stmt->bindParam(':recordDate', $_POST['recordDate'] , PDO::PARAM_STR);
        $stmt->bindParam(':recordTime', $_POST['recordTime'] , PDO::PARAM_STR);
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