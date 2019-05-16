<?php 
    header("Content-Type: application/json; charset=UTF-8");

    //エラー処理
    try {
        $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system', 'localhost', 'localhost');

        $stmt = $dbh->prepare('UPDATE plan SET editFlag = "true", editId = :editId WHERE planId = :planId'); 
        $stmt->bindParam(':planId', $_POST['planId'] , PDO::PARAM_STR);
        $stmt->bindParam(':editId', $_POST['editId'], PDO::PARAM_STR);

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