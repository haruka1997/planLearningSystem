<?php 
    header("Content-Type: application/json; charset=UTF-8");

    //エラー処理
    try {
        // $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system;charset=utf8', 'localhost', 'localhost');
        $dbh = new PDO('mysql:host=localhost; dbname=g031o008; charset=utf8;', 'g031o008', 'GRwd44v7');

        $stmt = $dbh->prepare('DELETE FROM history WHERE settingId = :settingId'); 
        $stmt->bindParam(':settingId', $_POST['settingId'] , PDO::PARAM_STR);

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