<html>
  <head>
    <script src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="./../../lib/bootstrap.min.css">
    <link rel="stylesheet" href="./../../lib/propeller.min.css">

    <link rel="stylesheet" href="./../../css/main.css">
    <link rel="stylesheet" href="./../../css/planCreate.css">
    <link rel="stylesheet" href="./../../css/learningHistory.css">
    <link rel="stylesheet" href="./../../css/calender.css">

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script type="text/javascript" src="./../../script/header.js"></script>
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