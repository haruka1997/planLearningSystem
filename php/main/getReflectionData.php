<?php 
    header("Content-Type: application/json; charset=UTF-8");

    //エラー処理
    try {
        $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system;charset=utf8', 'localhost', 'localhost');
        // $dbh = new PDO('mysql:host=localhost; dbname=g031o008; charset=utf8;', 'g031o008', 'GRwd44v7');

        // プリペアドステートメントのエミュレーションを無効にして、
        // MySQL ネイティブの静的プレースホルダを使用する
        $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);


        $stmt = $dbh->prepare('SELECT * FROM reflection WHERE settingId = :settingId'); 
        $stmt->bindParam(':settingId', $_POST['settingId'], PDO::PARAM_STR);

        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        try {
            echo json_encode($data);
            exit();  // 処理終了
        } catch (PDOException $e) {
        } 
    } catch (PDOException $e) {
    }
?>