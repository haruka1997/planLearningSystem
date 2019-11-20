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

        

        $stmt = $dbh->prepare('INSERT INTO history (settingId, userId, coverage, classDate, understanding, insertTime) VALUES(:settingId, :userId, :coverage, :classDate, :understanding, :insertTime)'); 
        $stmt->bindParam(':settingId', $_POST['settingId'], PDO::PARAM_STR);
        $stmt->bindParam(':userId', $_SESSION['userId'], PDO::PARAM_STR);
        $stmt->bindParam(':coverage', $_POST['coverage'], PDO::PARAM_STR);
        $stmt->bindParam(':classDate', $_POST['classDate'], PDO::PARAM_STR);
        $stmt->bindParam(':understanding', $_POST['understanding'], PDO::PARAM_STR);
        $stmt->bindParam(':insertTime', $_POST['insertTime'], PDO::PARAM_STR);

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