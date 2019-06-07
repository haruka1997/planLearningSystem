<?php 
    header("Content-Type: application/json; charset=UTF-8");

    //エラー処理
    try {
        // $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system', 'localhost', 'localhost');
        $dbh = new PDO('mysql:host=localhost; dbname=g031o008; charset=utf8;', 'g031o008', 'GRwd44v7');

        $stmt = $dbh->prepare('UPDATE history SET coverage = :coverage, prepareDate = :prepareDate, understanding = :understanding, goal = :goal, satisfaction = :satisfaction, testScore = :testScore, achievement = :achievement WHERE settingId = :settingId'); 
        $stmt->bindParam(':coverage', $_POST['coverage'] , PDO::PARAM_STR);
        $stmt->bindParam(':understanding', $_POST['understanding'], PDO::PARAM_STR);
        $stmt->bindParam(':goal', $_POST['goal'], PDO::PARAM_STR);
        $stmt->bindParam(':prepareDate', $_POST['prepareDate'] , PDO::PARAM_STR);
        $stmt->bindParam(':satisfaction', $_POST['satisfaction'], PDO::PARAM_STR);
        $stmt->bindParam(':testScore', $_POST['testScore'], PDO::PARAM_STR);
        $stmt->bindParam(':achievement', $_POST['achievement'], PDO::PARAM_STR);
        $stmt->bindParam(':settingId', $_POST['settingId'], PDO::PARAM_STR);

        $flag = $stmt->execute();

        if ($flag) { 
            echo json_encode($flag);
            exit();  // 処理終了
        }else{
            echo json_encode($stmt->execute());
        }
    } catch (PDOException $e) {
        echo json_encode($e);
    }
?>