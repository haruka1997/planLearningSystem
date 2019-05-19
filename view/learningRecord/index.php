<html>
  <head>
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
        <div id="record-create-content" class="calender-display-content">
        <div class="floating-action-button">
          <button class="mdl-button mdl-js-button mdl-button--fab" id="add-learning-record" type="button" title="学習の記録追加">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>   
          </button>
        </div>
      </main>
      <!-- 学習記録追加モーダル -->
      <?php include ('./learningRecordCreateModal.php'); ?>
      <!-- 学習記録詳細モーダル -->
      <?php include ('./learningRecordDetailModal.php'); ?>
    </div>
  </body>
</html>