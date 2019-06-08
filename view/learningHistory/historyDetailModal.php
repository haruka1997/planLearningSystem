<div class="history-detail-modal-wrapper">
    <div class="plan-modal">
        <!-- ヘッダー -->
        <div id="modal-header">
            <div class="header-title">学習履歴の詳細</div>
            <div class="header-cansel-button">×</div>
        </div>
        <!-- コンテンツ -->
        <div id="modal-content">
            <!-- エラー -->
            <div class="modal-error"></div>
            <!--授業回 -->
            <div class="form-group pmd-textfield">       
                <label class="required">予習する授業範囲</label>
                <select class="select-simple form-control pmd-select2 required" id="coverage">
                    <option value="1">第1回 三角関数①（弧度法、基本性質、三角関数のグラフ）</option>
                    <option value="2">第2回 三角関数②（三角方程式・不等式、加法定理、加法定理の応用）</option>
                    <option value="3">第3回 指数関数①（指数法則、累乗根、指数関数のグラフ、指数の大小比較、指数方程式・不等式）</option>
                    <option value="4">第4回 対数関数①（対数の基本性質、対数関数のグラフ、対数の大小比較、対数方程式・不等式、常用対数）</option>
                    <option value="5">第5回 数列①（等差数列、等比数列、∑公式）</option>
                    <option value="6">第6回 数列②（いろいろな数列、漸化式）</option>
                    <option value="7">第7回 作問演習、TAとの個人面談</option>
                    <option value="8">第8回 極限①（無限級数と極限）</option>
                    <option value="9">第9回 極限②（極限の計算、初等関数の極限）</option>
                    <option value="10">第10回 微分法①（微分係数、極限と導関数，接線の方程式，関数の増加・減少）</option>
                    <option value="11">第11回 微分法②（積と商・合成関数の微分，初等関数の微分，微分法の応用）</option>
                    <option value="12">第12回 積分法①（不定積分，定積分）</option>
                    <option value="13">第13回 積分法②（面積）</option>
                    <option value="14">第14回 総合演習 </option>
                </select>
            </div>
             <!-- 予習日 -->
             <div class="form-group pmd-textfield">
                <label class="control-label required">
                    選択した授業日
                </label>
                <input type="date" id="classDate" class="form-control required">
            </div>
           <!-- 理解度 -->
            <div class="form-group pmd-textfield">       
                <label class="required">授業範囲に対する理解度</label>
                <select class="select-simple form-control pmd-select2 required" id="understanding">
                    <option value="高い">高い</option>
                    <option value="普通">普通</option>
                    <option value="低い">低い</option>
                </select>
            </div>
            <!-- 目標点数 -->
            <div class="form-group pmd-textfield">       
                <label class="required">事前テストの目標点数</label>
                <select class="select-simple form-control pmd-select2 required" id="goal">
                    <option value="6">6点</option>
                    <option value="7">7点</option>
                    <option value="8">8点</option>
                    <option value="9">9点</option>
                    <option value="10">10点</option>
                </select>
            </div>
            <!--事前テストの結果 -->
            <div class="form-group pmd-textfield">
                <label>事前テストの点数</label>
                <select class="select-simple form-control pmd-select2 learning-content" id="testScore">
                    <option value="0">0点</option>
                    <option value="1">1点</option>
                    <option value="2">2点</option>
                    <option value="3">3点</option>
                    <option value="4">4点</option>
                    <option value="5">5点</option>
                    <option value="6">6点</option>
                    <option value="7">7点</option>
                    <option value="8">8点</option>
                    <option value="9">9点</option>
                    <option value="10">10点</option>
                </select>
            </div>
            <!--学習満足度 -->
            <div class="form-group pmd-textfield">
                <label>今回の学習の満足度</label>
                <select class="select-simple form-control pmd-select2 learning-content" id="learningSatisfaction">
                    <option value="0">まったく満足していない</option>
                    <option value="25">あまり満足していない</option>
                    <option value="50">どちらともいえない</option>
                    <option value="75">まあ満足している</option>
                    <option value="100">非常に満足している</option>
                </select>
            </div>
            <!-- 追加ボタン -->
            <div class="plan-modal-footer-button">
                <button class="history-edit-button mdl-button mdl-js-button mdl-button--raised">編集</button>
                <button class="history-delete-button mdl-button mdl-js-button mdl-button--raised">削除</button>
            </div>
        </div>
    </div>
</div>
