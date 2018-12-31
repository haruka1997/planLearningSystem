<html>
  <head>
    <script src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="./../../lib/bootstrap.min.css">
    <link rel="stylesheet" href="./../../lib/propeller.min.css">

    <link rel="stylesheet" href="./../../css/main.css">
    <link rel="stylesheet" href="./../../css/planCreate.css">
    <link rel="stylesheet" href="./../../css/calender.css">
    <link rel="stylesheet" href="./../../css/planModal.css">

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script type="text/javascript" src="./../../script/learningRecord.js"></script>
    <script type="text/javascript" src="./../../script/planModal.js"></script>

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
        <div class="planCreate-content">
            <!-- 計画実施率 -->
            <div class="planProgress">
                <div class="progress-rounded progress">
                    <label class="progress-title">計画実施率：</label>
                    <div class="progress-bar progress-bar-success" style="width: 34%;"></div>
                    <label class="progress-persent">30%</label>
                </div>
            </div>
            <!-- カレンダ -->
            <?php include ('./../common/calender.php'); ?>
        </div>
      </main>
      <!-- 学習記録追加モーダル -->
      <?php include ('./recordAddModal.php'); ?>
      <!-- 学習計画完了モーダル -->
      <?php include ('./planCheckModal.php'); ?>
    </div>
  </body>
</html>