<?php 
    header("Content-Type: application/json; charset=UTF-8");

    //エラー処理
    try {
        // $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system;charset=utf8', 'localhost', 'localhost');
        $dbh = new PDO('mysql:host=localhost; dbname=g031o008; charset=utf8;', 'g031o008', 'GRwd44v7');

        // プリペアドステートメントのエミュレーションを無効にして、
        // MySQL ネイティブの静的プレースホルダを使用する
        $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);


        $stmt = $dbh->prepare('INSERT INTO plan (planId, userId, settingId, content, planDate, planTime, memo, tag, learningFlag) VALUES(:planId, :userId, :settingId, :content, :planDate, :planTime, :memo, :tag, :learningFlag)'); 
        $stmt->bindParam(':userId', $_POST['userId'], PDO::PARAM_STR);
        $stmt->bindParam(':planId', $_POST['planId'] , PDO::PARAM_STR);
        $stmt->bindParam(':settingId', $_POST['settingId'] , PDO::PARAM_STR);
        $stmt->bindParam(':content', $_POST['content'] , PDO::PARAM_STR);
        $stmt->bindParam(':planDate', $_POST['planDate'] , PDO::PARAM_STR);
        $stmt->bindParam(':planTime', $_POST['planTime'] , PDO::PARAM_STR);
        $stmt->bindParam(':memo', $_POST['memo'] , PDO::PARAM_STR);
        $stmt->bindParam(':tag', $_POST['tag'] , PDO::PARAM_STR);
        $stmt->bindParam(':learningFlag', $_POST['learningFlag'] , PDO::PARAM_STR);

        $flag = $stmt->execute();

        if ($flag) { 
            echo json_encode($flag);
            exit();  // 処理終了
        }else{
            echo json_encode($flag);
        }
        $dbh = null;
    } catch (PDOException $e) {
        echo json_encode($e); 
    }
?>