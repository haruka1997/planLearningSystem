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


    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.4/Chart.min.js"></script>
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
                <button class="mdl-button mdl-js-button learning-setting-button">
                ⑴ 学習の設定
                </button>
                <i class="material-icons">keyboard_arrow_right</i>
                <button class="mdl-button mdl-js-button learning-list-create-button unselected">
                ⑵ 学習リストの作成
                </button>
                <i class="material-icons">keyboard_arrow_right</i>
                <button class="mdl-button mdl-js-button plan-create-button unselected">
                ⑶ 計画の作成
                </button>
            </div>
            <!-- 参考データ -->
            <?php include ('./referenceData.php') ?>
            <!-- 学習の設定 -->
            <div id="learning-setting-content">
              <?php include ('./learningSetting.php'); ?>
            </div>
            <!-- 学習リストの作成 -->
            <div id="learning-list-create-content">
              <?php include ('./learningList.php'); ?>
            </div>
            <!-- 計画の作成 -->
            <div id="plan-create-content">
              <!-- カレンダ -->
              <?php include ('./../common/calender.php'); ?>
              <div class="floating-action-button">
                <button class="mdl-button mdl-js-button mdl-button--fab" id="add-learning-plan" type="button" title="学習の計画追加"><i class="material-icons pmd-sm">create</i></button>
                <button class="mdl-button mdl-js-button mdl-button--fab" id="add-private-plan" type="button" title="プライベートの予定追加"><i class="material-icons pmd-sm">music_note</i></button>
              </div>
            </div>
        </div>
      </main>
      <!-- 学習満足度モーダル -->
      <?php include ('./learningSatisfactionModal.php') ?>
      <!-- 学習計画作成モーダル -->
      <?php include ('./learningPlanCreateModal.php'); ?>
      <!-- プライベートの予定作成モーダル -->
      <?php include ('./privatePlanCreateModal.php'); ?>
      <!-- 学習計画詳細モーダル -->
      <?php include ('./learningPlanDetailModal.php'); ?>
      <!-- プライベートの予定詳細モーダル -->
      <?php include ('./privatePlanDetailModal.php'); ?>
    </div>
  </body>
</html>