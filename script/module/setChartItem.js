module.exports.set = function(modules){

    // 平均学習時間帯
    var ctx = document.getElementById("average-learning-timezone").getContext('2d');
    var averageLearningTimezone = new modules.Chart(ctx, {
        type: 'line',
        data: {
            labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            datasets: [
                {
                    label: '平均学習時間(分)',
                    data: [0, 0, 0, 0, 0, 0, 10, 30, 60, 20, 10, 20, 15, 15, 20, 30, 0, 0, 0, 0, 0, 0, 0, 50],
                    backgroundColor: "#64B5F6",
                    lineTension: 0
                }
            ],
        },
        options:{
            scales: {
                xAxes: [{
                    scaleLabel: {                 // 軸ラベル
                        display: true,                // 表示設定
                        labelString: '学習時間帯',    // ラベル
                    },
                }],
                yAxes: [{
                    ticks: {
                        callback: function(value){
                            return value+'分';
                        }
                    }
                    }]
            }                            
        }
    });
}