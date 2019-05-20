<?php 
    header("Content-Type: application/json; charset=UTF-8");

    //エラー処理
    try {
        // $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system', 'localhost', 'localhost');
        $dbh = new PDO('mysql:host=153.126.193.128; dbname=g031o008', 'g031o008', 'GRwd44v7');

        $stmt = $dbh->prepare('UPDATE plan SET deleteFlag = "true" WHERE planId = :planId'); 
        $stmt->bindParam(':planId', $_POST['planId'] , PDO::PARAM_STR);

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