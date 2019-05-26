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
        <!-- 学習履歴テーブル -->
        <div class="learning-history-table">
            <table>
                <tr id="table-header">
                    <th>授業回</th>
                    <th>計画実施率</th>
                    <th>目標達成率</th>
                    <th>学習満足度</th>
                </tr>
                <tr>
                    <td>1回</td>
                    <td>50%</td>
                    <td>○</td>
                    <td>満足している</td>
                </tr>
                <tr>
                    <td>2回</td>
                    <td>50%</td>
                    <td>○</td>
                    <td>満足していない</td>
                </tr>
                <tr>
                    <td>3回</td>
                    <td>50%</td>
                    <td>○</td>
                    <td>あまり満足していない</td>
                </tr>
                <tr>
                    <td>4回</td>
                    <td>50%</td>
                    <td>○</td>
                    <td>満足</td>
                </tr>
            </table>
        </div>
      </main>
      <!-- 学習記録追加モーダル -->
      <?php include ('./learningRecordCreateModal.php'); ?>
      <!-- 学習記録詳細モーダル -->
      <?php include ('./learningRecordDetailModal.php'); ?>
    </div>
  </body>
</html>