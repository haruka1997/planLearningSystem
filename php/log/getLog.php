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


        $stmt = $dbh->prepare('SELECT history.userId, history.executing, history.achievement, history.satisfaction, history.goal, history.testScore, history.settingId, history.recordTime, history.comment FROM history WHERE history.coverage = :coverage AND history.subjects = "2020年基礎数学B" ORDER BY history.userId'); 
        $stmt->bindParam(':coverage', $_POST['coverage'], PDO::PARAM_STR);
        // $stmt->bindParam(':userId', $_SESSION['userId'], PDO::PARAM_STR);
        // $stmt->bindParam(':settingId', $_POST['settingId'], PDO::PARAM_STR);

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