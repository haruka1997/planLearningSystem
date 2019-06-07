<?php 
    header("Content-Type: application/json; charset=UTF-8");

    //エラー処理
    try {
        // $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system', 'localhost', 'localhost');
        $dbh = new PDO('mysql:host=localhost; dbname=g031o008; charset=utf8;', 'g031o008', 'GRwd44v7');
        

        $stmt = $dbh->prepare('INSERT INTO history (settingId, userId, coverage, prepareDate, understanding, goal, insertTime) VALUES(:settingId, :userId, :coverage, :prepareDate, :understanding, :goal, :insertTime)'); 
        $stmt->bindParam(':settingId', $_POST['settingId'], PDO::PARAM_STR);
        $stmt->bindParam(':userId', $_POST['userId'], PDO::PARAM_STR);
        $stmt->bindParam(':coverage', $_POST['coverage'], PDO::PARAM_STR);
        $stmt->bindParam(':prepareDate', $_POST['prepareDate'], PDO::PARAM_STR);
        $stmt->bindParam(':understanding', $_POST['understanding'], PDO::PARAM_STR);
        $stmt->bindParam(':goal', $_POST['goal'], PDO::PARAM_STR);
        $stmt->bindParam(':insertTime', $_POST['insertTime'], PDO::PARAM_STR);

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