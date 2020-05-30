<?php
  session_start();
  if(!isset($_SESSION['userId'])){
    header('Location: https://takagi-lab.tk/chatbot/page/Login.php');
  }
?>
<html>
  <head>
  <script type="text/javascript" src="./../../application/dist/log.bundle.js"></script>
  <link type="text/css" rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.min.css" />
  </head>
  <body>
    <div class="mdl-layout mdl-js-layout">
      <!-- ヘッダ -->
      <?php include ('./header.php'); ?>
      <!-- コンテンツ -->
      <main class="mdl-layout__content">
        <div class="learning-history-content">
        <div class="select-class">
          <div class="form-group pmd-textfield">
              <select class="select-simple form-control pmd-select2 required">
                <option value="2" selected>第2回</option>
                <option value="3">第3回</option>
                <option value="4">第4回</option>
                <option value="5">第5回</option>
                <option value="6">第6回</option>
                <option value="7">第7回</option>
                <option value="8">第8回</option>
                <option value="9">第9回</option>
                <option value="10">第10回</option>
                <option value="11">第11回</option>
                <option value="12">第12回</option>
                <option value="13">第13回</option>
                <option value="14">第14回</option>
                <option value="15">第15回</option>
              </select>
          </div>
        </div>
        <table class="mdl-data-table mdl-js-data-table log-table">
          <thead>
            <th class="mdl-data-table__cell--non-numeric">ユーザID</th>
            <th>計画実施率</th>
            <th class="mdl-data-table__cell--non-numeric">目標達成度(実際/目標)</th>
            <th class="mdl-data-table__cell--non-numeric">学習満足度</th>
            <th>学習時間(分)</th>
            <th>コメント</th>
          </thead>
          <tbody>
          </tbody>
        </table>
        </div>
      </main>
    </div>
  </body>
</html>