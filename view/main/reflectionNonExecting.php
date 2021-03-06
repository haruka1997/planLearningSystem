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
            <div>カレンダーを振り返りながら回答しましょう！</div>
            <!-- 計画実施率が100%未満だった場合 -->
            <div class="reflection-question-content">
                <div class="reflection-question">
                    <div>Q1. 計画通りに行えなかった原因を選択してください</div>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-1">
                        <input type="checkbox" id="checkbox-1" class="mdl-checkbox__input" name="Q1" value="実行可能性の低い学習計画を立案していた">
                        <span class="mdl-checkbox__label">実行可能性の低い学習計画を立案していた</span>
                    </label>
                    <br>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-2">
                        <input type="checkbox" id="checkbox-2" class="mdl-checkbox__input"name="Q1" value="学習に必要な時間を誤予測していた">
                        <span class="mdl-checkbox__label">学習に必要な時間を誤予測していた</span>
                    </label>
                    <br>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-3">
                        <input type="checkbox" id="checkbox-3" class="mdl-checkbox__input" name="Q1" value="誘惑や欲求に負けた(眠気や遊びなど)">
                        <span class="mdl-checkbox__label">誘惑や欲求に負けた(眠気や遊びなど)</span>
                    </label>
                    <br>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                        <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input" name="Q1" value="学習途中の飽き、やる気や集中力が低減した">
                        <span class="mdl-checkbox__label">学習途中の飽き、やる気や集中力が低減した</span>
                    </label>
                    <br>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-5">
                        <input type="checkbox" id="checkbox-5" class="mdl-checkbox__input" name="Q1" value="計画した日時にやる気が生まれなかった">
                        <span class="mdl-checkbox__label">計画した日時にやる気が生まれなかった</span>
                    </label>
                    <br>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-6">
                        <input type="checkbox" id="checkbox-6" class="mdl-checkbox__input" name="Q1" value="その他">
                        <span class="mdl-checkbox__label">その他</span>
                    </label>
                    <br>
                </div>
                <div class="reflection-question">
                    <div>
                        Q2. 学習を完了させるために途中で計画の変更を行いましたか
                        <div style="font-size:0.8em; margin-left: 10px;"> 例)1日に学習を詰め込みすぎたので、残りは明日に持ち越した</div>
                    </div>
                    <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-1">
                        <input type="radio" id="option-1" class="mdl-radio__button" name="Q2" value="はい">
                        <span class="mdl-radio__label">はい</span>
                    </label>
                    <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-2">
                        <input type="radio" id="option-2" class="mdl-radio__button" name="Q2" value="いいえ">
                        <span class="mdl-radio__label">いいえ</span>
                    </label>
                </div>
                <div class="reflection-question">
                    <div>
                        Q3. 学習を完了させることができましたか
                    </div>
                    <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-3">
                        <input type="radio" id="option-3" class="mdl-radio__button" name="Q3" value="はい">
                        <span class="mdl-radio__label">はい</span>
                    </label>
                    <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-4">
                        <input type="radio" id="option-4" class="mdl-radio__button" name="Q3" value="いいえ">
                        <span class="mdl-radio__label">いいえ</span>
                    </label>
                </div>
                <div class="reflection-question">
                    <div>Q4. 上記を踏まえて、今後学習計画を立てる際に気をつけたいことを記入してください</div>
                    <textarea class="form-control required" id="reflectionText"></textarea>
                </div>
                <div class="reflection-modal-footer-button">
                    <button class="reflection-regist-button mdl-button mdl-js-button mdl-button--raised" id="non-execting">登録</button>
                </div>
            </div>      
        </div>
    </main>
</div>
</body>