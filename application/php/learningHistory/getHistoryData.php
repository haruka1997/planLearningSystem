<?php 
    header("Content-Type: application/json; charset=UTF-8");

    //エラー処理
    try {
        $dbh = new PDO('mysql:host=localhost; dbname=g031o008', 'g031o008', 'GRwd44v7');
        

        $stmt = $dbh->prepare('SELECT * FROM reference WHERE userId = :userId'); 
        $stmt->bindParam(':userId', $_POST['userId'], PDO::PARAM_STR);

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