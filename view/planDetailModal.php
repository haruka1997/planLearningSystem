<div class="plan-detail-modal-wrapper">
    <div class="plan-modal">
        <!-- ヘッダー -->
        <div id="modal-header">
            <div class="header-title">学習計画の詳細</div>
            <div class="header-cansel-button">×</div>
        </div>
        <!-- コンテンツ -->
        <div id="modal-content">
            <!-- 学習内容 -->
            <div class="form-group pmd-textfield">
                <label for="detailStudyContent" class="control-label">
                    学習内容
                </label>
                <input type="text" id="detailStudyContent" class="form-control" value="">
            </div>
            <!-- 学習日 -->
            <div class="form-group pmd-textfield">
                <label for="detailStudyDate" class="control-label">
                    学習日
                </label>
                <input type="date" id="detailStudyDate" class="form-control" value="">
            </div>
             <!-- 学習時間 -->
             <div class="form-group pmd-textfield">
                <label for="detailStudyTimeStart" class="control-label">
                    学習時間
                </label>
                <div style="display:flex;">
                    <input type="time" id="detailStudyTimeStart" class="form-control" value="">
                    <p style="margin:20px;">〜</p>
                    <label for="detailStudyTimeEnd" class="control-label">
                    </label>
                    <input type="time" id="detailStudyTimeEnd" class="form-control" value="">
                </div>
            </div>
            <!-- メモ -->
            <div class="form-group pmd-textfield">
                <label class="control-label">メモ</label>
                <textarea class="form-control" id="detailMemo" value=""></textarea>
            </div>
            <!-- 追加ボタン -->
            <div class="edit-button">
                <button class="mdl-button mdl-js-button mdl-button--raised">編集</button>
            </div>
        </div>
    </div>
</div>
