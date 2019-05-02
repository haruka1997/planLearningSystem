<html>
  <head>
    <script src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="./../../lib/bootstrap.min.css">
    <link rel="stylesheet" href="./../../lib/propeller.min.css">

    <link rel="stylesheet" href="./../../css/main.css">
    <link rel="stylesheet" href="./../../css/planCreate.css">
    <link rel="stylesheet" href="./../../css/learningRecord.css">
    <link rel="stylesheet" href="./../../css/calender.css">

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script type="text/javascript" src="./../../script/header.js"></script>
    <script type="text/javascript" src="./../../dist/learningRecord.bundle.js"></script>

  </head>
  <body>
    <div class="mdl-layout mdl-js-layout">
      <!-- ヘッダ -->
      <?php include ('./../common/header.php'); ?>
      <!-- メニュー -->
      <?php include ('./../common/menu.php'); ?>
      <!-- コンテンツ -->
      <main class="mdl-layout__content">
        <!-- 学習記録追加画面 -->
        <div id="record-create-content">
        <div class="floating-action-button">
          <button class="mdl-button mdl-js-button mdl-button--fab" id="add-learning-record" type="button" title="学習の記録追加"><i class="material-icons pmd-sm">create</i></button>
        </div>
      </main>
      <!-- 学習記録追加モーダル -->
      <?php include ('./learningRecordCreateModal.php'); ?>
      <!-- 学習記録詳細モーダル -->
      <?php include ('./learningRecordDetailModal.php'); ?>
    </div>
  </body>
</html>