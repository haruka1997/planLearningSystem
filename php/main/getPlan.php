<?php 
    session_start();    // セッション開始
    header("Content-Type: application/json; charset=UTF-8");

    //エラー処理
    try {
        $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system;charset=utf8', 'localhost', 'localhost');
                // $dbh = new PDO('mysql:host=localhost; dbname=g031o008; charset=utf8;', 'g031o008', 'GRwd44v7');

        // プリペアドステートメントのエミュレーションを無効にして、
        // MySQL ネイティブの静的プレースホルダを使用する
        $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);


        $stmt = $dbh->prepare('SELECT planId, content, planDate, planTime, memo, tag, learningFlag FROM plan WHERE userId = :userId AND editFlag = "false" AND deleteFlag = "false" AND settingId = :settingId'); 
        $stmt->bindParam(':userId', $_SESSION['userId'], PDO::PARAM_STR);
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