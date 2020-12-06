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

        

        $stmt = $dbh->prepare('INSERT INTO reflection (settingId, category, Q1, Q2, Q3, Q4) VALUES(:settingId, :category, :Q1, :Q2, :Q3, :Q4)'); 
        $stmt->bindParam(':settingId', $_POST['settingId'], PDO::PARAM_STR);
        $stmt->bindParam(':category', $_POST['category'], PDO::PARAM_STR);
        $stmt->bindParam(':Q1', $_POST['Q1'], PDO::PARAM_STR);
        $stmt->bindParam(':Q2', $_POST['Q2'], PDO::PARAM_STR);
        $stmt->bindParam(':Q3', $_POST['Q3'], PDO::PARAM_STR);
        $stmt->bindParam(':Q4', $_POST['Q4'], PDO::PARAM_STR);
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