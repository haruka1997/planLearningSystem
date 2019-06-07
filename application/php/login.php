<?php 
    header("Content-Type: application/json; charset=UTF-8");
    //エラー処理
    try {
        // $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system', 'localhost', 'localhost');
        $dbh = new PDO('mysql:host=localhost; dbname=g031o008; charset=utf8;', 'g031o008', 'GRwd44v7');

        $stmt = $dbh->prepare('SELECT * FROM user WHERE userId = :userId AND password = :password');    //入力したユーザIDかつパスワードの情報を選択
        $stmt->bindParam(':userId', $_POST['userId'], PDO::PARAM_STR);
        $stmt->bindParam(':password', $_POST['password'], PDO::PARAM_STR);
        $stmt->execute();

        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {    //入力したユーザIDとパスワードに一致するデータがあれば
            echo json_encode($row);
            exit();  // 処理終了
        }
    } catch (PDOException $e) {
    }
?>