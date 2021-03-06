<?php 
    session_start();    // セッション開始
    //クッキー情報の削除
    if($_COOKIE['PHPSESSID']){  //もしセッションクッキー情報が残っていれば
        setcookie('PHPSESSID', '', time() - 1800);  //該当クッキー削除
    }

    //userIdがセッションに保存されていたら
    if($_SESSION['userId'] !== undefined){
        $_SESSION = array();    // セッション変数を全て削除
    }

    header("Content-Type: application/json; charset=UTF-8");
    //エラー処理
    try {
        // $dbh = new PDO('mysql:host=localhost; dbname=plan_learning_system;charset=utf8', 'localhost', 'localhost');
        // $dbh = new PDO('mysql:host=localhost; dbname=g031o008; charset=utf8;', 'g031o008', 'GRwd44v7');

        // プリペアドステートメントのエミュレーションを無効にして、
        // MySQL ネイティブの静的プレースホルダを使用する
        $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);


        // プリペアドステートメントのエミュレーションを無効にして、
        // MySQL ネイティブの静的プレースホルダを使用する
        $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

        $stmt = $dbh->prepare('SELECT * FROM user WHERE userId = :userId AND password = :password');    //入力したユーザIDかつパスワードの情報を選択
        $stmt->bindParam(':userId', $_POST['userId'], PDO::PARAM_STR);
        $stmt->bindParam(':password', $_POST['password'], PDO::PARAM_STR);
        $stmt->execute();

        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {    //入力したユーザIDとパスワードに一致するデータがあれば
            session_regenerate_id(true);    //セッション置き換え
            $_SESSION['userId'] = $row['userId'];   //ユーザIDをセッションに保存
            echo json_encode($row);
            exit();  // 処理終了
        }
        $dbh = null;
    } catch (PDOException $e) {
        $dbh = null;
    }
?>