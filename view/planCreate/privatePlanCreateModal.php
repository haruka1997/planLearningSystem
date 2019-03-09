<div class="private-plan-create-modal-wrapper">
    <div class="plan-modal">
        <!-- ヘッダー -->
        <div id="modal-header">
            <div class="header-title">プライベートの予定追加</div>
            <div class="header-cansel-button">×</div>
        </div>
        <!-- コンテンツ -->
        <div id="modal-content">
            <!-- エラー -->
            <div class="modal-error"></div>
            <!-- 予定日 -->
            <div class="form-group pmd-textfield">
                <label for="privateDate" class="control-label">
                    予定日
                </label>
                <input type="date" id="privateDate" class="form-control">
            </div>
             <!-- 予定時間 -->
             <div class="form-group pmd-textfield">
                <label for="privateTimeStart" class="control-label">
                    予定時間
                </label>
                <div style="display:flex;">
                    <input type="time" id="privateTimeStart" class="form-control">
                    <p style="margin:20px;">〜</p>
                    <label for="privateTimeEnd" class="control-label">
                    </label>
                    <input type="time" id="privateTimeEnd" class="form-control">
                </div>
            </div>
            <!-- タグ -->
            <div class="form-group pmd-textfield">
                <label class="control-label">
                    タグ
                </label>
                <div class="form-tag">
                    <div class="tag" id="red"></div>
                    <div class="tag" id="yellow"></div>
                    <div class="tag" id="green"></div>
                </div>
            </div>
            <!-- メモ -->
            <div class="form-group pmd-textfield">
                <label class="control-label">メモ</label>
                <textarea class="form-control" id="privateMemo"></textarea>
            </div>
            <!-- 追加ボタン -->
            <div class="private-add-button">
                <button class="mdl-button mdl-js-button mdl-button--raised">追加</button>
            </div>
        </div>
    </div>
</div>
