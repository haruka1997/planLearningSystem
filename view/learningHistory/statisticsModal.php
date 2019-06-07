<div class="statistics-modal-wrapper">
    <div class="plan-modal">
        <!-- ヘッダー -->
        <div id="modal-header">
            <div class="header-title">統計情報</div>
            <div class="header-cansel-button">×</div>
        </div>
        <!-- コンテンツ -->
        <div id="modal-content">
            <!-- 学習計画参考データ -->
            <div class="statistics-data-list">
                <!-- 計画学習時間と実際学習時間 -->
                <div class="statistics-item">
                    <div id="total-learning-time-table">
                        <table class="table">
                            <tr id="totalPlanTime"><th>合計学習計画時間</th><td>10分</td></tr>
                            <tr id="totalRecordTime"><th>合計学習記録時間</th><td>５分</td></tr>
                            <tr id="averageRecordTime"><th>1回あたりの平均学習時間</th><td>30分</td></tr>
                        </table>
                    </div>
                </div>   
                <!-- 平均学習時間帯 -->
                <div class="statistics-item">
                    <div class="statistics-item-chart"><canvas id="average-learning-timezone"></canvas></div>
                </div>  
            </div>
        </div>
    </div>
</div>
