<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-143263601-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-143263601-1');
</script>

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
                            <tr id="totalPlanTime"><th>学習計画の合計時間</th><td></td></tr>
                            <tr id="totalRecordTime"><th>学習記録の合計時間</th><td></td></tr>
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
