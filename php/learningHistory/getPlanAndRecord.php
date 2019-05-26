<?php 
    header("Content-Type: application/json; charset=UTF-8");

    //エラー処理
    try {
        $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system', 'localhost', 'localhost');
        // $dbh = new PDO('mysql:host=localhost; dbname=g031o008; charset=utf8;', 'g031o008', 'GRwd44v7');

        $stmt = $dbh->prepare('SELECT * FROM plan WHERE settingId = :settingId AND deleteFlag = "false" AND editFlag = "false" AND learningFlag = "true"'); 
        $stmt->bindParam(':settingId', $_POST['settingId'], PDO::PARAM_STR);

        $stmt->execute();
    
        if ($plan = $stmt->fetchAll(PDO::FETCH_ASSOC)) {

            try {
        
                $stmt = $dbh->prepare('SELECT * FROM record WHERE settingId = :settingId'); 
                $stmt->bindParam(':settingId', $_POST['settingId'], PDO::PARAM_STR);
        
                $stmt->execute();
            
                if ($record = $stmt->fetchAll(PDO::FETCH_ASSOC)) { 
                    $data = array_merge($plan, $record);
                    echo json_encode($data);
                    exit();  // 処理終了
                }else{
                    // echo $stmt->execute();
                }
            } catch (PDOException $e) {
            } 
        }else{
            // echo $stmt->execute();
        }
    } catch (PDOException $e) {
    }
?>