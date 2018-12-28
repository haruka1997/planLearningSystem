<html>
  <head>
    <script src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

    <link rel="stylesheet" href="./../css/main.css">
    <link rel="stylesheet" href="./../css/login.css">

  </head>
  <body>
    <div class="mdl-layout mdl-js-layout">
      <!-- ヘッダ -->
      <?php include ('./header.php'); ?>
      <!-- メニュー -->
      <?php include ('./menu.php'); ?>
      <!-- コンテンツ -->
      <main class="mdl-layout__content">
        <!-- ログイン画面 -->
        <div class="form-wrapper">
            <h1 class="sign-title">ログイン</h1>
            <form name="loginForm" method="post">
            <!-- ユーザID -->
            <div class="form-item">
                <label for="userId"></label>
                <input type="userId" name="userId" required="required" placeholder="ユーザID" pattern="^[0-9A-Za-z]+$" />
            </div>
            <!-- パスワード -->
            <div class="form-item">
                <label for="password"></label>
                <input type="password" name="password" required="required" placeholder="パスワード" pattern="^[0-9A-Za-z]+$" />
            </div>
            <!-- ログインボタン -->
            <div class="button-panel">
                <input type="submit" name="login" class="sign-button" title="ログイン" value="ログイン" />
            </div>
            </form>
            <div class="form-footer">
            <p><a href="">ヘルプ</a></p>
            </div>
        </div>
      </main>
    </div>
  </body>
</html>