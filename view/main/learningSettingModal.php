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
                    <!-- <option value="1,1590073200000">第1回 命題論理・集合1(命題,条件,否定,必要条件・十分条件逆・裏・対偶,背理法,集合の表し方,和集合,積集合,部分集合,集合が 3 つの場合の和集合と積集合,補集合,ド・モルガンの法則)</option> -->
                    <option value="2, 1590678000000">第2回 命題論理・集合2(集合の応用問題)</option>
                    <option value="3, 1591282800000">第3回 命題論理・集合3(背理法,数学的帰納法)</option>
                    <option value="4, 1591887600000">第4回 命題論理・集合4(作問演習,TA との個人面談➀)</option>
                    <option value="5, 1592492400000">第5回 ベクトル1(ベクトルの計算,ベクトルの成分,ベクトルの内積)</option>
                    <option value="6, 1593097200000">第6回 ベクトル2(位置ベクトル)</option>
                    <option value="7, 1593702000000">第7回 ベクトル3(ベクトル方程式)</option>
                    <option value="8, 1594306800000">第8回 ベクトル4(ベクトルの応用,空間ベクトル1)</option>
                    <option value="9, 1594911600000">第9回 ベクトル5(空間ベクトル2)</option>
                    <option value="10, 1596121200000">第10回 ベクトル6(作問演習,TA との個人面談2)</option>
                    <option value="11, 1596726000000">第11回 行列1(行列の相等と成分,行列の和・差・実数倍,零行列と列ベクトル行ベクトル,行列の積,対角行列と単位行列,行列の積の性質,ケーリー・ハミルトン)</option>
                    <option value="12, 1597158000000">第12回 行列2(逆行列,連立 1 次方程式の解法,一次変換)</option>
                    <option value="13, 1597935600000">第13回 行列3(作問演習)</option>
                    <option value="14, 1598540400000">第14回 総合演習,TA との個人面談3 </option>
                    <option value="15, 1599490800000">第15回 期末試験 </option>
                </select>
            </div>
             <!-- 予習日 -->
            <!-- <div class="form-group pmd-textfield">
                <label class="control-label required">
                    選択した授業日
                </label>
                <input type="text" id="classDate" class="form-control required" value="2019-12-12">
            </div> -->
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
                <button class="learning-setting-regist-button mdl-button mdl-js-button mdl-button--raised">登録して次へ</button>
            </div>
        </div>
    </div>
</div>
