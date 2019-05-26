<?php 
    header("Content-Type: application/json; charset=UTF-8");

    //エラー処理
    // UPDATE処理
    try {
        $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system', 'localhost', 'localhost');

        $stmt = $dbh->prepare('UPDATE reference SET satisfaction = :satisfaction, executing = :executing, achievement = :achievement WHERE settingId = :settingId'); 
        $stmt->bindParam(':settingId', $_POST['settingId'], PDO::PARAM_STR);
        $stmt->bindParam(':satisfaction', $_POST['satisfaction'], PDO::PARAM_STR);
        $stmt->bindParam(':executing', $_POST['executing'], PDO::PARAM_STR);
        $stmt->bindParam(':achievement', $_POST['achievement'], PDO::PARAM_STR);

        $flag = $stmt->execute();

        if ($flag) { 
            echo json_encode($flag);
            exit();  // 処理終了
        }
    } catch (PDOException $e) {
    }
?>