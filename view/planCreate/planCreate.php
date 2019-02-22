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
    <link rel="stylesheet" href="./../../css/analysisResultModal.css">


    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script type="text/javascript" src="./../../script/header.js"></script>
    <script type="text/javascript" src="./../../script/planCreate.js"></script>

  </head>
  <body>
    <div class="mdl-layout mdl-js-layout">
      <!-- ヘッダ -->
      <?php include ('./../common/header.php'); ?>
      <!-- メニュー -->
      <?php include ('./../common/menu.php'); ?>
      <!-- コンテンツ -->
      <main class="mdl-layout__content">
        <!-- 計画作成画面 -->
        <div class="planCreate-content">
            <div class="header-menu">
                <button class="mdl-button mdl-js-button">
                ⑴ 学習の設定
                </button>
                <i class="material-icons">keyboard_arrow_right</i>
                <button class="mdl-button mdl-js-button unselected">
                ⑵ 学習リストの作成
                </button>
                <i class="material-icons">keyboard_arrow_right</i>
                <button class="mdl-button mdl-js-button unselected">
                ⑶ 計画の作成
                </button>
            </div>
            <!-- 学習の設定 -->
            
            <!-- 学習リストの作成 -->
            <!-- <?php include('./learningList.php'); ?> -->
            <!-- カレンダ -->
            <?php include ('./../common/calender.php'); ?>
            <div class="floating-action-button">
              <button class="btn pmd-btn-fab pmd-btn-raised pmd-ripple-effect btn-primary" id="add-learning-plan" type="button" title="学習の計画追加"><i class="material-icons pmd-sm">create</i></button>
              <button class="btn pmd-btn-fab pmd-btn-raised pmd-ripple-effect btn-success" id="add-private-plan" type="button" title="プライベートの予定追加"><i class="material-icons pmd-sm">music_note</i></button>
            </div>
        </div>
      </main>
      <!-- 学習計画作成モーダル -->
      <?php include ('./learningPlanCreateModal.php'); ?>
      <!-- プライベートの予定作成モーダル -->
      <?php include ('./privatePlanCreateModal.php'); ?>
      <!-- 計画詳細モーダル -->
      <?php include ('./planDetailModal.php'); ?>
      <!-- 分析結果モーダル -->
      <?php include ('./analysisResultModal.php'); ?>
    </div>
  </body>
</html>