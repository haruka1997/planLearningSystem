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


        $stmt = $dbh->prepare('INSERT INTO record (recordId, userId, settingId, content, recordDate, recordTime, memo) VALUES(:recordId, :userId, :settingId, :content, :recordDate, :recordTime, :memo)'); 
        $stmt->bindParam(':userId', $_SESSION['userId'], PDO::PARAM_STR);
        $stmt->bindParam(':recordId', $_POST['recordId'] , PDO::PARAM_STR);
        $stmt->bindParam(':settingId', $_POST['settingId'] , PDO::PARAM_STR);
        $stmt->bindParam(':content', $_POST['content'] , PDO::PARAM_STR);
        $stmt->bindParam(':recordDate', $_POST['recordDate'] , PDO::PARAM_STR);
        $stmt->bindParam(':recordTime', $_POST['recordTime'] , PDO::PARAM_STR);
        $stmt->bindParam(':memo', $_POST['memo'] , PDO::PARAM_STR);

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