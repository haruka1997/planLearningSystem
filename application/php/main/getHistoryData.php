<?php 
    session_start();    // セッション開始
    header("Content-Type: application/json; charset=UTF-8");

    //エラー処理
    try {
        // $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system;charset=utf8', 'localhost', 'localhost');
        $dbh = new PDO('mysql:host=localhost; dbname=g031o008; charset=utf8;', 'g031o008', 'GRwd44v7');

        // プリペアドステートメントのエミュレーションを無効にして、
        // MySQL ネイティブの静的プレースホルダを使用する
        $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

        $stmt = $dbh->prepare('SELECT * FROM history WHERE userId = :userId AND history.subjects = "2020年基礎数学C"'); 

        $stmt->bindParam(':userId', $_SESSION['userId'], PDO::PARAM_STR);

        $stmt->execute();
    
        if ($row = $stmt->fetchAll(PDO::FETCH_ASSOC)) {
            try {
                // $stmt2 = $dbh->prepare('SELECT history.settingId, history.userId, history.classDate, history.executing, history.understanding, history.coverage, history.achievement, history.satisfaction, history.insertTime, history.goal, history.recordTime, chatbot.testScore, chatbot.satisfaction FROM history LEFT OUTER JOIN chatbot ON history.userId = chatbot.userId where history.userId = :userId AND history.subjects = "2020年基礎数学C"');

                $stmt2 = $dbh->prepare('SELECT * FROM chatbot WHERE userId = :userId'); 
        
                $stmt2->bindParam(':userId', $_SESSION['userId'], PDO::PARAM_STR);
        
                $stmt2->execute();
            
                if ($row2 = $stmt2->fetchAll(PDO::FETCH_ASSOC)) { 
                    $return = array(
                        "history" => $row,
                         "chatbot" => $row2
                    );
                    echo json_encode($return);
                    exit();  // 処理終了
                }else{
                    $return = array(
                        "history" => $row
                    );
                    echo json_encode($return);
                    exit();  // 処理終了
                }
            } catch (PDOException $e) {
            } 
        }else{
            // echo $stmt->execute();
        }
    } catch (PDOException $e) {
    }
?>