<div class="learning-record-detail-modal-wrapper">
    <div class="plan-modal">
        <!-- ヘッダー -->
        <div id="modal-header">
            <div class="header-title">学習記録の詳細</div>
            <div class="header-cansel-button">×</div>
        </div>
        <!-- コンテンツ -->
        <div id="modal-content">
             <!-- エラー -->
             <div class="modal-error"></div>
            <!--学習内容 -->
            <div class="form-group pmd-textfield">       
                <label class="required">学習内容</label>
                <input type="text" id="detailLearningContent" class="form-control required">
            </div>
            <!-- 学習日 -->
            <div class="form-group pmd-textfield">
                <label for="learningDate" class="control-label required">
                    学習日
                </label>
                <select class="select-simple form-control pmd-select2 select-learning-date required" id="detailLearningDate">
                </select>
                <!-- <input type="date" id="detailLearningDate" class="form-control required"> -->
            </div>
             <!-- 学習時間 -->
             <div class="form-group pmd-textfield">
                <label for="learningTimeStart" class="control-label required">
                    学習時間
                </label>
                <div style="display:flex;">
                    <input type="time" id="detailLearningTimeStart" class="form-control required">
                    <p style="margin:20px;">〜</p>
                    <label for="learningTimeEnd" class="control-label">
                    </label>
                    <input type="time" id="detailLearningTimeEnd" class="form-control required">
                </div>
            </div>
            <!-- メモ -->
            <div class="form-group pmd-textfield">
                <label class="control-label">メモ</label>
                <textarea class="form-control" id="detailLearningMemo"></textarea>
            </div>
            <!-- 追加ボタン -->
            <div class="record-modal-footer-button detail-modal-footer-button">
                <button class="learning-edit-button mdl-button mdl-js-button mdl-button--raised">編集</button>
                <button class="learning-delete-button mdl-button mdl-js-button mdl-button--raised">削除</button>
            </div>
        </div>
    </div>
</div>
