<html>
  <head>
    <script src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

    <link rel="stylesheet" href="./../css/main.css">
    <link rel="stylesheet" href="./../css/login.css">

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script type="text/javascript" src="./../script/login.js"></script>

  </head>
  <body>
    <div class="mdl-layout mdl-js-layout">
      <!-- コンテンツ -->
      <main class="mdl-layout__content">
        <!-- ログイン画面 -->
        <div class="form-wrapper">
            <h1 class="sign-title">ログイン</h1>
            <form name="loginForm">
            <!-- ユーザID -->
            <div class="form-item">
                <label for="userId"></label>
                <input id="userId" type="userId" name="userId" required="required" placeholder="ユーザID" pattern="^[0-9A-Za-z]+$" />
            </div>
            <!-- パスワード -->
            <div class="form-item">
                <label for="password"></label>
                <input id="password" type="password" name="password" required="required" placeholder="パスワード" pattern="^[0-9A-Za-z]+$" />
            </div>
            <!-- ログインボタン -->
            <div class="button-panel">
                <input name="login" class="sign-button" title="ログイン" value="ログイン" />
            </div>
            </form>
            <div class="form-footer">
            <p><a href="">共通基盤教育のユーザID,パスワードで設定しています</a></p>
            </div>
        </div>
      </main>
    </div>
  </body>
</html>