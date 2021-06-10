<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="./../../lib/material.min.css">
<link rel="stylesheet" type="text/css" href="./../../css/reflection.css">
<script type="text/javascript" src="./../../application/dist/reflection.bundle.js"></script>

<title>学習計画の振り返り</title>
</head>
<body>
<div class="mdl-layout mdl-js-layout">
    <!-- コンテンツ -->
    <main class="mdl-layout__content">
        <div class="reflection-page">
            <div class="reflection-title">学習計画の振り返り</div>
            <div id="execting"></div>
            <div>過去の学習計画や学習記録を振り返りながら回答しましょう！</div>
            <div class="reflection-question-content">
                <div class="reflection-question">
                    <div>Q1. 事前テストの点数を入力してください</div>
                    <select class="select-simple form-control pmd-select2 learning-content" id="testScore">
                        <option value="10">10点</option>
                        <option value="9">9点</option>
                        <option value="8">8点</option>
                        <option value="7">7点</option>
                        <option value="6">6点</option>
                        <option value="5">5点</option>
                        <option value="4">4点</option>
                        <option value="3">3点</option>
                        <option value="2">2点</option>
                        <option value="1">1点</option>
                        <option value="0">0点</option>
                        <option value="なし">なし</option>
                    </select>
                    <br>
                </div>
                <div class="reflection-question">
                    <div>Q2. 前回の学習計画で計画通りに取り組めたこと/計画通りに取り組めなかったことは何ですか？</div>
                    <textarea class="form-control required" id="Q2"></textarea>
                    <br>
                </div>
                <div class="reflection-question">
                    <div>
                        Q3. Q2について、なぜ、計画通りに取り組めた/取り組めなかったのですか？
                        <div style="font-size:0.8em; margin-left: 10px;"> 例)1日に学習を詰め込みすぎたので、残りは明日に持ち越した</div>
                    </div>
                    <textarea class="form-control required" id="Q3"></textarea>
                </div>
                <div class="reflection-question">
                    <div>Q4. 上記を踏まえて、今後学習計画を立てる際に気をつけたいことを記入してください</div>
                    <textarea class="form-control required" id="Q4"></textarea>
                </div>
                <div class="reflection-question">
                    <div>Q5. 今回の学習の満足度を入力してください</div>
                    <select class="select-simple form-control pmd-select2 learning-content" id="learningSatisfaction">
                    <option value="0">まったく満足していない</option>
                    <option value="25">あまり満足していない</option>
                    <option value="50">どちらともいえない</option>
                    <option value="75">まあ満足している</option>
                    <option value="100">非常に満足している</option>
                </select>
                </div>
                <div class="reflection-modal-footer-button">
                    <button class="reflection-regist-button mdl-button mdl-js-button mdl-button--raised" id="non-execting">登録</button>
                </div>
            </div>      
        </div>
    </main>
</div>
</body>