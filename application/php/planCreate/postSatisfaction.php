<?php 
    header("Content-Type: application/json; charset=UTF-8");

    //エラー処理
    try {
        // $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system', 'localhost', 'localhost');
        $dbh = new PDO('mysql:host=153.126.193.128; dbname=g031o008', 'g031o008', 'GRwd44v7');

        $stmt = $dbh->prepare('SELECT settingId FROM setting WHERE userId = :userId AND insertTime BETWEEN :startDate AND :endDate'); 
        $stmt->bindParam(':userId', $_POST['userId'], PDO::PARAM_STR);
        $stmt->bindParam(':startDate', $_POST['startDate'], PDO::PARAM_STR);
        $stmt->bindParam(':endDate', $_POST['endDate'], PDO::PARAM_STR);

        $stmt->execute();
    
        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $settingId = $row['settingId'];

            // UPDATE処理
            try {
                // $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system', 'localhost', 'localhost');
        
                $stmt = $dbh->prepare('UPDATE reference SET satisfaction = :satisfaction WHERE settingId = :settingId'); 
                $stmt->bindParam(':settingId', $settingId, PDO::PARAM_STR);
                $stmt->bindParam(':satisfaction', $_POST['satisfaction'], PDO::PARAM_STR);
        
                $flag = $stmt->execute();

                if ($flag) { 
                    echo json_encode($flag);
                    exit();  // 処理終了
                }
            } catch (PDOException $e) {
            }
        }
    } catch (PDOException $e) {
    }
?>