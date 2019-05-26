<?php 
    header("Content-Type: application/json; charset=UTF-8");

    //エラー処理
    try {
        $dbh = new PDO('mysql:host=localhost; dbname=g031o008', 'g031o008', 'GRwd44v7');
        

        $stmt = $dbh->prepare('SELECT * FROM reference WHERE userId = :userId AND settingId != :settingId'); 
        $stmt->bindParam(':userId', $_POST['userId'], PDO::PARAM_STR);
        $stmt->bindParam(':settingId', $_POST['settingId'], PDO::PARAM_STR);

        $stmt->execute();
    
        if ($referenceItem = $stmt->fetchAll(PDO::FETCH_ASSOC)) {
            foreach($referenceItem as $item){
                try {
                    $stmt = $dbh->prepare('SELECT * FROM record WHERE settingId = :settingId'); 
                    $stmt->bindParam(':settingId', $item['settingId'], PDO::PARAM_STR);
                    $stmt->execute();
                
                    if ($record = $stmt->fetchAll(PDO::FETCH_ASSOC)) {
                        $records[$item['settingId']]['reference'] = $item; 
                        $records[$item['settingId']]['record'] = $record;
                    }else{
                        // echo $stmt->execute();
                    }
                } catch (PDOException $e) {
                }
            }
            echo json_encode($records);
            exit();  // 処理終了 
        }else{
            // echo $stmt->execute();
        }
    } catch (PDOException $e) {
    }
?>