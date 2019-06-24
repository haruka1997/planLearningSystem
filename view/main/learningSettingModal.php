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
                <select class="select-simple form-control pmd-select2 required" id="coverage">
                    <option value="1">第1回 命題論理・集合①（必要条件・十分条件，逆・裏・対偶，和集合，積集合，部分集合，集合が3つの場合の和集合と積集合，補集合，ド・モルガンの法則）</option>
                    <option value="2">第2回 命題論理・集合②（応用問題）</option>
                    <option value="3">第3回 命題論理・集合③（背理法，数学的帰納法）</option>
                    <option value="4">第4回 命題論理・集合④（作問演習）</option>
                    <option value="5">第5回 ベクトル①（ベクトルの計算，ベクトルの成分，ベクトルの内積）</option>
                    <option value="6">第6回 ベクトル②（位置ベクトル）</option>
                    <option value="7">第7回 ベクトル③（ベクトル方程式）</option>
                    <option value="8">第8回 ベクトル④（ベクトルの応用，空間ベクトル①）</option>
                    <option value="9">第9回 ベクトル⑤（空間ベクトル②）</option>
                    <option value="10">第10回 ベクトル⑥（作問演習）</option>
                    <option value="11">第11回 行列①（行列の相等と成分，行列の和・差・実数倍，零行列と列ベクトル行ベクトル，行列の積，対角行列と単位行列，行列の積の性質，ケーリー・ハミルトン）</option>
                    <option value="12">第12回 行列②（逆行列，連立1次方程式の解法）</option>
                    <option value="13">第13回 行列③（作問演習）</option>
                    <option value="14">第14回 総合演習 </option>
                    <option value="15">第15回 期末試験 </option>
                </select>
            </div>
             <!-- 予習日 -->
             <div class="form-group pmd-textfield">
                <label class="control-label required">
                    選択した授業日
                </label>
                <input type="text" id="classDate" class="form-control required">
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
                <button class="learning-setting-regist-button mdl-button mdl-js-button mdl-button--raised" disabled>登録</button>
            </div>
        </div>
    </div>
</div>
