<div class="learning-satisfaction-modal-wrapper">
    <div class="plan-modal">
        <!-- ヘッダー -->
        <div id="modal-header">
            <div class="header-title">学習の振り返り</div>
            <div class="header-cansel-button">×</div>
        </div>
        <!-- コンテンツ -->
        <div id="modal-content">
            <!-- エラー -->
            <div class="modal-error"></div>
            <!--学習満足度 -->
            <div class="form-group pmd-textfield">
                <label>今回の学習の満足度</label>
                <select class="select-simple form-control pmd-select2 learning-content" id="learningSatisfaction">
                    <option value="0">まったく満足していない</option>
                    <option value="25">あまり満足していない</option>
                    <option value="50">どちらともいえない</option>
                    <option value="75">まあ満足している</option>
                    <option value="100">非常に満足している</option>
                </select>
            </div>
            <!--事前テストの結果 -->
            <div class="form-group pmd-textfield">
                <label>事前テストの点数</label>
                <select class="select-simple form-control pmd-select2 learning-content" id="testScore">
                    <option value="0">0点</option>
                    <option value="1">1点</option>
                    <option value="2">2点</option>
                    <option value="3">3点</option>
                    <option value="4">4点</option>
                    <option value="5">5点</option>
                    <option value="6">6点</option>
                    <option value="7">7点</option>
                    <option value="8">8点</option>
                    <option value="9">9点</option>
                    <option value="10">10点</option>
                </select>
            </div>
            <!-- 完了ボタン -->
            <div class="plan-modal-footer-button">
                <button class="learning-satisfaction-complete-button mdl-button mdl-js-button mdl-button--raised">完了</button>
            </div>
        </div>
    </div>
</div>
