<?php 
    header("Content-Type: application/json; charset=UTF-8");

    //エラー処理
    try {
        $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system', 'localhost', 'localhost');

        $stmt = $dbh->prepare('SELECT * FROM record WHERE userId = :userId AND settingId = :settingId'); 
        $stmt->bindParam(':userId', $_POST['userId'], PDO::PARAM_STR);
        $stmt->bindParam(':settingId', $_POST['settingId'], PDO::PARAM_STR);

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