<?php 
    header("Content-Type: application/json; charset=UTF-8");

    //エラー処理
    try {
        $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system', 'localhost', 'localhost');
        // $dbh = new PDO('mysql:host=localhost; dbname=g031o008; charset=utf8;', 'g031o008', 'GRwd44v7');

        // 先週の設定IDを取得する
        $stmt = $dbh->prepare('SELECT settingId, goal FROM setting WHERE userId = :userId AND insertTime BETWEEN :startDate AND :endDate'); 
        $stmt->bindParam(':userId', $_POST['userId'], PDO::PARAM_STR);
        $stmt->bindParam(':startDate', $_POST['startDate'], PDO::PARAM_STR);
        $stmt->bindParam(':endDate', $_POST['endDate'], PDO::PARAM_STR);

        $stmt->execute();
    
        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $settingId = $row['settingId'];
            $goal = $row['goal'];

            // 学習満足度が登録されているか確認
            try {        
                $stmt = $dbh->prepare('SELECT settingId FROM reference WHERE settingId = :settingId AND satisfaction IS NULL'); 
                $stmt->bindParam(':settingId', $settingId, PDO::PARAM_STR);
        
                $stmt->execute();
                // 学習満足度が登録されていなかったら
                if($row = $stmt->fetchAll(PDO::FETCH_ASSOC)){
                    $data['settingId'] = $settingId;
                    $data['goal'] = $goal;
                    echo json_encode($data);
                    exit();
                }
            } catch (PDOException $e) {
            }
        }else{
            echo json_encode(false);
        }
    } catch (PDOException $e) {
    }
?>