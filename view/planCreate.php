<html>
  <head>
    <script src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="./../lib/bootstrap.min.css">
    <link rel="stylesheet" href="./../lib/propeller.min.css">

    <link rel="stylesheet" href="./../css/main.css">
    <link rel="stylesheet" href="./../css/planCreate.css">
    <link rel="stylesheet" href="./../css/calender.css">
    <link rel="stylesheet" href="./../css/planModal.css">
    <link rel="stylesheet" href="./../css/analysisResultModal.css">

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script type="text/javascript" src="./../script/planModal.js"></script>
    <script type="text/javascript" src="./../script/analysisResultModal.js"></script>

  </head>
  <body>
    <div class="mdl-layout mdl-js-layout">
      <!-- ヘッダ -->
      <?php include ('./header.php'); ?>
      <!-- メニュー -->
      <?php include ('./menu.php'); ?>
      <!-- コンテンツ -->
      <main class="mdl-layout__content">
        <!-- 計画作成画面 -->
        <div class="planCreate-content">
            <!-- 分析 -->
            <div class="analysis-form">
                <!-- 授業回 -->
                <div class="form-group pmd-textfield pmd-textfield-floating-label">       
                    <label>授業回を選択</label>
                    <select class="select-simple form-control pmd-select2">
                        <option></option>
                        <option>第1回</option>
                        <option>第2回</option>
                        <option>第3回</option>
                        <option>第4回</option>
                        <option>第5回</option>
                        <option>第6回</option>
                        <option>第7回</option>
                        <option>第8回</option>
                        <option>第9回</option>
                        <option>第10回</option>
                        <option>第11回</option>
                        <option>第12回</option>
                        <option>第13回</option>
                    </select>
                </div>
                <!-- 理解度 -->
                <div class="form-group pmd-textfield pmd-textfield-floating-label">       
                    <label>理解度を選択</label>
                    <select class="select-simple form-control pmd-select2">
                        <option></option>
                        <option>高</option>
                        <option>中</option>
                        <option>低</option>
                    </select>
                </div>
                <!-- 目標点数 -->
                <div class="form-group pmd-textfield pmd-textfield-floating-label">       
                    <label>目標点数を選択</label>
                    <select class="select-simple form-control pmd-select2">
                        <option></option>
                        <option>6点</option>
                        <option>7点</option>
                        <option>8点</option>
                        <option>9点</option>
                        <option>10点</option>
                    </select>
                </div>
            </div>
            <div class="analysis-button">
                <button class="mdl-button mdl-js-button mdl-button--raised">
                <i class="material-icons">search</i> 分析
                </button>
            </div>
            <!-- 計画実施率 -->
            <!-- <div class="planProgress">
                <div class="progress-rounded progress">
                    <label class="progress-title">計画実施率：</label>
                    <div class="progress-bar progress-bar-success" style="width: 34%;"></div>
                    <label class="progress-persent">30%</label>
                </div>
            </div> -->
            <!-- カレンダ -->
            <?php include ('./calender.php'); ?>
        </div>
      </main>
      <!-- 計画作成モーダル -->
      <?php include ('./planCreateModal.php'); ?>
      <!-- 計画詳細モーダル -->
      <?php include ('./planDetailModal.php'); ?>
      <!-- 分析結果モーダル -->
      <?php include ('./analysisResultModal.php'); ?>
    </div>
  </body>
</html>