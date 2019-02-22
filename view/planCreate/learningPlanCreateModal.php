<div class="learning-plan-create-modal-wrapper">
    <div class="plan-modal">
        <!-- ヘッダー -->
        <div id="modal-header">
            <div class="header-title">学習計画の追加</div>
            <div class="header-cansel-button">×</div>
        </div>
        <!-- コンテンツ -->
        <div id="modal-content">
            <!-- 学習内容 -->
            <div class="form-group pmd-textfield">
                <label for="studyContent" class="control-label">
                    学習内容
                </label>
                <input type="text" id="studyContent" class="form-control">
            </div>
            <!-- 学習日 -->
            <div class="form-group pmd-textfield">
                <label for="studyDate" class="control-label">
                    学習日
                </label>
                <input type="date" id="studyDate" class="form-control">
            </div>
             <!-- 学習時間 -->
             <div class="form-group pmd-textfield">
                <label for="studyTimeStart" class="control-label">
                    学習時間
                </label>
                <div style="display:flex;">
                    <input type="time" id="studyTimeStart" class="form-control">
                    <p style="margin:20px;">〜</p>
                    <label for="studyTimeEnd" class="control-label">
                    </label>
                    <input type="time" id="studyTimeEnd" class="form-control">
                </div>
            </div>
            <!-- メモ -->
            <div class="form-group pmd-textfield">
                <label class="control-label">メモ</label>
                <textarea class="form-control" id="memo"></textarea>
            </div>
            <!-- 追加ボタン -->
            <div class="add-button">
                <button class="mdl-button mdl-js-button mdl-button--raised">追加</button>
            </div>
        </div>
    </div>
</div>
