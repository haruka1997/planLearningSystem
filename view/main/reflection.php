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
            <!-- <div style="font-weight:bold;color:red;">これまでの計画実施率、完了率を確認してください！</div> -->
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
                    <button class="reflection-regist-button mdl-button mdl-js-button mdl-button--raised" id="comp-execting">登録</button>
                </div>
            </div> 
            <!-- <div class="reflection-question-content">
                <div class="reflection-question">
                    <div>Q1. これまでの学習計画を立てる経験を通して、学習計画の立て方や学習計画を立てる際の心構えについて、あなたが変わったこと(進歩したこと、成長したこと)は何ですか？</div>
                    <textarea class="form-control required" id="Q1"></textarea>
                    <br>
                </div>
                <div class="reflection-question">
                    <div>Q2. そう感じた理由は何ですか？</div>
                    <textarea class="form-control required" id="Q2"></textarea>
                    <br>
                </div>
                <div class="reflection-question">
                    <div>
                        Q3. これまでの学習計画を立てる経験を通して、特に大切だと思ったことは何ですか？
                    </div>
                    <textarea class="form-control required" id="Q3"></textarea>
                </div>
                <div class="reflection-question">
                    <div>Q4. そう感じた理由は何ですか？</div>
                    <textarea class="form-control required" id="Q4"></textarea>
                </div>
                <div class="reflection-question">
                    <div>Q5. その根拠となるデータは何ですか(第○回学習計画、第○回学習記録等)</div>
                    <textarea class="form-control required" id="Q5"></textarea>
                </div>
                <div class="reflection-question">
                    <div>Q6. 以上を踏まえて、今後学習計画を立てる際や予習をする際に、何を継続し、何を改善する必要がありますか？(何を新たに心がけて取り組みたいですか？)</div>
                    <textarea class="form-control required" id="Q6"></textarea>
                </div>
                <div class="reflection-modal-footer-button">
                    <button class="reflection-regist-button mdl-button mdl-js-button mdl-button--raised" id="comp-execting">登録</button>
                </div>
            </div>       -->
        </div>
    </main>
</div>
</body>