<?php 
    header("Content-Type: application/json; charset=UTF-8");

    //エラー処理
    try {
        $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system', 'localhost', 'localhost');

        // 先週の設定IDを取得する
        $stmt = $dbh->prepare('SELECT settingId FROM setting WHERE userId = :userId AND insertTime BETWEEN :startDate AND :endDate'); 
        $stmt->bindParam(':userId', $_POST['userId'], PDO::PARAM_STR);
        $stmt->bindParam(':startDate', $_POST['startDate'], PDO::PARAM_STR);
        $stmt->bindParam(':endDate', $_POST['endDate'], PDO::PARAM_STR);

        $stmt->execute();
    
        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $settingId = $row['settingId'];

            // 学習満足度が登録されているか確認
            try {        
                $stmt = $dbh->prepare('SELECT settingId FROM reference WHERE settingId = :settingId AND satisfaction IS NULL'); 
                $stmt->bindParam(':settingId', $settingId, PDO::PARAM_STR);
        
                $stmt->execute();
                $flag = $stmt->fetch(PDO::FETCH_ASSOC);
                echo json_encode($flag);
                exit();
            } catch (PDOException $e) {
            }
        }else{
            echo json_encode(false);
        }
    } catch (PDOException $e) {
    }
?>