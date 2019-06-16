<?php
  session_start();
  if(!isset($_SESSION['userId'])){
    header('Location: ./../login.php');
  }
?>
<html>
  <head>
  <script type="text/javascript" src="./../../application/dist/main.bundle.js"></script>
  </head>
  <body>
    <div class="mdl-layout mdl-js-layout">
      <!-- ヘッダ -->
      <?php include ('./header.php'); ?>
      <!-- コンテンツ -->
      <main class="mdl-layout__content">
        <div class="learning-history-content">
          <!-- 学習履歴テーブル -->
          <div class="learning-history-table">
              <table class="table">
                <thead>
                  <tr id="table-header">
                      <th>授業回</th>
                      <th>理解度</th>
                      <th>計画実施率</th>
                      <th>目標達成度</th>
                      <th>学習満足度</th>
                      <th width="15%"></th>
                  </tr>
                </thead>
                <tbody class="learning-history-tbody">
                </tbody>
              </table>
          </div>
          <!-- 新規計画作成ボタン -->
          <div class="new-plan-create">
            <button class="new-plan-create-button mdl-button mdl-js-button mdl-button--raised">授業回の登録</button>
          </div>
          <div class="calender-display-content">
            <div class="calender-switch">
              <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-1">
                <input type="radio" id="option-1" class="mdl-radio__button" name="options" value="計画" checked>
                <span class="mdl-radio__label">計画</span>
              </label>
              <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-2">
                <input type="radio" id="option-2" class="mdl-radio__button" name="options" value="記録">
                <span class="mdl-radio__label">記録</span>
              </label>
              <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-3">
                <input type="radio" id="option-3" class="mdl-radio__button" name="options" value="計画と記録">
                <span class="mdl-radio__label">計画と記録</span>
              </label>
            </div>
            <!-- 計画・記録追加ボタン -->
            <div class="floating-action-button">
              <button class="mdl-button mdl-js-button mdl-button--fab add-plan-button" id="add-learning-plan" type="button" title="学習の計画追加">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>
              </button>
              <button class="mdl-button mdl-js-button mdl-button--fab add-plan-button" id="add-private-plan" type="button" title="プライベートの予定追加">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>                
              </button>
              <button class="mdl-button mdl-js-button mdl-button--fab add-record-button" id="add-learning-record" type="button" title="学習の記録追加" style="display:none;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"/></svg>              
              </button>
            </div>
          </div>
        </div>
      </main>
      <!-- 学習計画追加モーダル -->
      <?php include ('./learningPlanCreateModal.php'); ?>
      <!-- プライベートの予定追加モーダル -->
      <?php include ('./privatePlanCreateModal.php'); ?>
      <!-- 学習記録追加モーダル -->
      <?php include ('./learningRecordCreateModal.php'); ?>
      <!-- 学習計画詳細モーダル -->
      <?php include ('./learningPlanDetailModal.php'); ?>
       <!-- プライベート予定詳細モーダル -->
       <?php include ('./privatePlanDetailModal.php'); ?>
      <!-- 学習記録詳細モーダル -->
      <?php include ('./learningRecordDetailModal.php'); ?>
      <!-- 目標の設定モーダル -->
      <?php include ('./learningSettingModal.php'); ?>
      <!-- 学習履歴の詳細モーダル -->
      <?php include ('./historyDetailModal.php'); ?>
      <!-- 統計情報のモーダル -->
      <?php include ('./statisticsModal.php'); ?>
    </div>
  </body>
</html>