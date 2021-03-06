<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script type="text/javascript" src="./../application/dist/login.bundle.js"></script>
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
                <input name="login" class="sign-button" title="ログイン" value="ログイン" readonly></input>
            </div>
            </form>
            <div class="form-footer">
            <p><a>共通基盤教育のユーザID,パスワードで設定しています</a></p>
            <p><a>対応ブラウザはFirefoxとGoogle Chromeです</a></p>
            </div>
        </div>
      </main>
    </div>
  </body>
</html>

