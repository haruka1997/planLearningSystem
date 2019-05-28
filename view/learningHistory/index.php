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
            <!-- 計画・記録追加ボタン -->
            <div class="floating-action-button">
              <button class="mdl-button mdl-js-button mdl-button--fab add-plan-button" id="add-learning-plan" type="button" title="学習の計画追加">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>                
              </button>
              <button class="mdl-button mdl-js-button mdl-button--fab add-plan-button" id="add-private-plan" type="button" title="プライベートの予定追加">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>                
              </button>
              <button class="mdl-button mdl-js-button mdl-button--fab add-record-button" id="add-learning-record" type="button" title="学習の記録追加" style="display:none;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>   
              </button>
            </div>
          </div>
        </div>
      </main>
      <!-- 学習計画追加モーダル -->
      <?php include ('./../planCreate/learningPlanCreateModal.php'); ?>
      <!-- プライベートの予定追加モーダル -->
      <?php include ('./../planCreate/privatePlanCreateModal.php'); ?>
      <!-- 学習記録追加モーダル -->
      <?php include ('./../learningRecord/learningRecordCreateModal.php'); ?>
      <!-- 学習計画詳細モーダル -->
      <?php include ('./../planCreate/learningPlanDetailModal.php'); ?>
      <!-- 学習記録詳細モーダル -->
      <?php include ('./../learningRecord/learningRecordDetailModal.php'); ?>
    </div>
  </body>
</html>