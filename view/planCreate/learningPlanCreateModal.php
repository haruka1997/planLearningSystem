<div class="learning-plan-create-modal-wrapper">
    <div class="plan-modal">
        <!-- ヘッダー -->
        <div id="modal-header">
            <div class="header-title">学習計画の追加</div>
            <div class="header-cansel-button">×</div>
        </div>
        <!-- コンテンツ -->
        <div id="modal-content">
            <!-- エラー -->
            <div class="modal-error"></div>
            <!--学習内容 -->
            <div class="form-group pmd-textfield">       
                <label>学習内容</label>
                <select class="select-simple form-control pmd-select2 learning-content" id="learningContent">
                    <option></option>
                </select>
            </div>
            <!-- 学習日 -->
            <div class="form-group pmd-textfield">
                <label for="learningDate" class="control-label">
                    学習日
                </label>
                <input type="date" id="learningDate" class="form-control">
            </div>
             <!-- 学習時間 -->
             <div class="form-group pmd-textfield">
                <label for="learningTimeStart" class="control-label">
                    学習時間
                </label>
                <div style="display:flex;">
                    <input type="time" id="learningTimeStart" class="form-control">
                    <p style="margin:20px;">〜</p>
                    <label for="learningTimeEnd" class="control-label">
                    </label>
                    <input type="time" id="learningTimeEnd" class="form-control">
                </div>
            </div>
            <!-- メモ -->
            <div class="form-group pmd-textfield">
                <label class="control-label">メモ</label>
                <textarea class="form-control" id="learningMemo"></textarea>
            </div>
            <!-- 追加ボタン -->
            <div class="learning-add-button">
                <button class="mdl-button mdl-js-button mdl-button--raised">追加</button>
            </div>
        </div>
    </div>
</div>
