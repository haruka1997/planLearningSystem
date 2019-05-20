<?php 
    header("Content-Type: application/json; charset=UTF-8");
    try {
        $dbh = new PDO('mysql:host=153.126.193.128; dbname=g031o008; charset=utf8;', 'g031o008', 'haruka1997');
        $stmt = $dbh->prepare("SELECT * FROM `user` WHERE `userId` = :userId AND `password` = :password");
        $stmt->bindParam(":userId", $_POST["userId"], PDO::PARAM_STR);
        $stmt->bindParam(":password", $_POST["password"], PDO::PARAM_STR);
        $stmt->execute();
        echo json_encode($stmt->execute());

        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            echo json_encode($row);
            exit();
        }
    } catch (PDOException $e) {
        echo json_encode($e->getMessage());
    }
?>