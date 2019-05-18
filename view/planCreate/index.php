<html>
  <head>
    <script type="text/javascript" src="./../../dist/planCreate.bundle.js"></script>
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
                学習の設定
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#c9c9c9" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>                
                <button class="mdl-button mdl-js-button plan-create-button unselected">
                計画の作成
                </button>
            </div>
            <!-- 参考データ -->
            <?php include ('./referenceData.php') ?>
            <!-- 学習の設定 -->
            <div id="learning-setting-content">
              <?php include ('./learningSetting.php'); ?>
            </div>
            <!-- 計画の作成 -->
            <div id="plan-create-content">
              <!-- カレンダ -->
              <?php include ('./../common/calender.php'); ?>
              <div class="floating-action-button">
                <button class="mdl-button mdl-js-button mdl-button--fab" id="add-learning-plan" type="button" title="学習の計画追加">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>                
                </button>
                <button class="mdl-button mdl-js-button mdl-button--fab" id="add-private-plan" type="button" title="プライベートの予定追加">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>                
                </button>
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