<?php 
    header("Content-Type: application/json; charset=UTF-8");

    //エラー処理
    try {
        $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system', 'localhost', 'localhost');

        $stmt = $dbh->prepare('SELECT planId, content, planDate, planTime, memo, tag, learningFlag FROM plan WHERE userId = :userId AND editFlag = "false" AND deleteFlag = "false" AND planDate BETWEEN :startDate AND :endDate'); 
        $stmt->bindParam(':userId', $_POST['userId'], PDO::PARAM_STR);
        $stmt->bindParam(':startDate', $_POST['startDate'], PDO::PARAM_STR);
        $stmt->bindParam(':endDate', $_POST['endDate'], PDO::PARAM_STR);

        $stmt->execute();
    
        if ($row = $stmt->fetchAll(PDO::FETCH_ASSOC)) { 
            echo json_encode($row);
            exit();  // 処理終了
        }else{
            // echo $stmt->execute();
        }
    } catch (PDOException $e) {
    }
?>