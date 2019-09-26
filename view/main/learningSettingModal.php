<div class="learning-setting-modal-wrapper">
    <div class="plan-modal">
        <!-- ヘッダー -->
        <div id="modal-header">
            <div class="header-title">目標の設定</div>
            <div class="header-cansel-button">×</div>
        </div>
        <!-- コンテンツ -->
        <div id="modal-content">
            <!-- エラー -->
            <div class="modal-error"></div>
            <!--授業回 -->
            <div class="form-group pmd-textfield">       
                <label class="required">予習する授業範囲</label>
                <select class="select-simple form-control pmd-select2 required" id="coverage" disabled>
                    <option value="2" selected>第2回 順列①（和の法則，積の法則，順列の総数，順列の公式，円順列，重複順列）</option>
                    <option value="3">第3回 順列②（和の法則，積の法則，順列の応用問題）</option>
                    <option value="4">第4回 順列③（作問演習/個別面談）</option>
                    <option value="5">第5回 組合せ①（組合せの公式，組み分け，同じものを含む順列，重複組合せ，二項定理）</option>
                    <option value="6">第6回 組合せ②（組合わせの応用問題）</option>
                    <option value="7">第7回 組合せ③（作問演習/個別面談）</option>
                    <option value="8">第8回 確率①（試行と事象，確率の定義，和事象と積事象の確率，加法定理，反復試行）</option>
                    <option value="9">第9回 確率②（期待値，応用問題）</option>
                    <option value="10">第10回 確率③（確率分布，二項分布）</option>
                    <option value="11">第11回 確率④（作問演習/個別面談）</option>
                    <option value="12">第12回 統計①（資料の整理、代表値）</option>
                    <option value="13">第13回 統計②（散らばりと相関係数）</option>
                    <option value="14">第14回 統計③（作問演習/個別面談） </option>
                    <option value="15">第15回 期末試験 </option>
                </select>
            </div>
             <!-- 予習日 -->
             <div class="form-group pmd-textfield">
                <label class="control-label required">
                    選択した授業日
                </label>
                <input type="text" id="classDate" class="form-control required" value="2019-10-03">
                <!-- <input type="date" id="classDate" class="form-control required"> -->
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
                    <option value="10">10点</option>
                    <option value="9">9点</option>
                    <option value="8">8点</option>
                    <option value="7">7点</option>
                    <option value="6">6点</option>
                    <option value="なし">なし</option>
                </select>
            </div>
            <!-- 追加ボタン -->
            <div class="plan-modal-footer-button">
                <button class="learning-setting-regist-button mdl-button mdl-js-button mdl-button--raised">登録</button>
            </div>
        </div>
    </div>
</div>
