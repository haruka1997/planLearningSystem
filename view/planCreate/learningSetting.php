<!-- 分析 -->
<div class="learning-setting-form">
    <!-- 授業回 -->
    <div class="form-group pmd-textfield pmd-textfield-floating-label">       
        <label>学習する授業範囲を選択してください</label>
        <select class="select-simple form-control pmd-select2" id="coverage">
            <option></option>
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
    <!-- 理解度 -->
    <div class="form-group pmd-textfield pmd-textfield-floating-label">       
        <label>授業範囲に対する自分の理解度を選択してください</label>
        <select class="select-simple form-control pmd-select2" id="understanding">
            <option></option>
            <option value="高い">高い</option>
            <option value="普通">普通</option>
            <option value="低い">低い</option>
        </select>
    </div>
    <!-- 目標点数 -->
    <div class="form-group pmd-textfield pmd-textfield-floating-label">       
        <label>事前テストの目標点数を選択してください</label>
        <select class="select-simple form-control pmd-select2" id="goal">
            <option></option>
            <option value="6">6点</option>
            <option value="7">7点</option>
            <option value="8">8点</option>
            <option value="9">9点</option>
            <option value="10">10点</option>
        </select>
    </div>
</div>
<div class="footer-button">
    <button class="mdl-button mdl-js-button mdl-button--raised learning-setting-regist-button">登録</button>
    <button class="mdl-button mdl-js-button mdl-button--raised learning-setting-edit-button">変更</button>
</div>