<div class="private-plan-detail-modal-wrapper">
    <div class="plan-modal">
        <!-- ヘッダー -->
        <div id="modal-header">
            <div class="header-title">プライベートの予定詳細</div>
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
                <input type="date" id="detailPrivateDate" class="form-control">
            </div>
             <!-- 予定時間 -->
             <div class="form-group pmd-textfield">
                <label for="privateTimeStart" class="control-label">
                    予定時間
                </label>
                <div style="display:flex;">
                    <input type="time" id="detailPrivateTimeStart" class="form-control">
                    <p style="margin:20px;">〜</p>
                    <label for="privateTimeEnd" class="control-label">
                    </label>
                    <input type="time" id="detailPrivateTimeEnd" class="form-control">
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
                <textarea class="form-control" id="detailPrivateMemo"></textarea>
            </div>
            <!-- 編集ボタン -->
            <div class="plan-modal-footer-button">
                <button class="private-edit-button mdl-button mdl-js-button mdl-button--raised">編集</button>
                <button class="private-delete-button mdl-button mdl-js-button mdl-button--raised">削除</button>
            </div>
        </div>
    </div>
</div>
