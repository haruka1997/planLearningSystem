<html>
  <head>
  <script type="text/javascript" src="./../../application/dist/learningHistory.bundle.js"></script>
  </head>
  <body>
    <div class="mdl-layout mdl-js-layout">
      <!-- ヘッダ -->
      <?php include ('./../common/header.php'); ?>
      <!-- メニュー -->
      <?php include ('./../common/menu.php'); ?>
      <!-- コンテンツ -->
      <main class="mdl-layout__content">
        <div class="learning-history-content">
          <!-- 学習履歴テーブル -->
          <div class="learning-history-table">
              <table class="table table-hover">
                <thead>
                  <tr id="table-header">
                      <th>授業回</th>
                      <th>計画実施率</th>
                      <th>目標達成率</th>
                      <th>学習満足度</th>
                  </tr>
                </thead>
                <tbody class="learning-history-tbody">
                </tbody>
              </table>
          </div>
          <div class="calender-switch">
            <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-1">
              <input type="radio" id="option-1" class="mdl-radio__button" name="options" value="計画" checked>
              <span class="mdl-radio__label">計画</span>
            </label>
            <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-2">
              <input type="radio" id="option-2" class="mdl-radio__button" name="options" value="記録">
              <span class="mdl-radio__label">記録</span>
            </label>
          </div>
          <div class="calender-display-content">
          </div>
        </div>
      </main>
      <!-- 学習計画詳細モーダル -->
      <?php include ('./../planCreate/learningPlanDetailModal.php'); ?>
      <!-- 学習記録詳細モーダル -->
      <?php include ('./../learningRecord/learningRecordDetailModal.php'); ?>
    </div>
  </body>
</html>