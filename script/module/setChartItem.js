module.exports.set = function(modules, chartData){

    // chartDataをチャートのdataに変換
    let data = Object.values(chartData);

    // 平均学習時間帯
    var executingAndComplitingChart = document.getElementById("executingAndCompliting").getContext('2d');
    var achievementChart = document.getElementById("achievement").getContext('2d');
    var satisfactionChart = document.getElementById("satisfaction").getContext('2d');
    var recordTimeChart = document.getElementById("recordTime").getContext('2d');
    executingAndComplitingChart.canvas.height = 150;
    achievementChart.canvas.heigth = 150;
    satisfactionChart.canvas.heigth = 150;
    recordTimeChart.canvas.heigth = 150;

    let chart1 = new modules.Chart(executingAndComplitingChart, {
        type: 'line',
        data: {
            labels: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            datasets: [
                {
                    label: '計画実施率',
                    data: data[0].executing,
                    borderColor: "#0288D1",
                    pointBorderColor: "#0288D1",
                    lineTension: 0,
                    fill: false,
                },{
                    label: '学習完了率',
                    data: data[0].compliting,
                    borderColor: "#FB8C00",
                    pointBorderColor: "#FB8C00",
                    lineTension: 0,
                    fill: false,
                }

            ],
        },
        options:{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    // scaleLabel: {                 // 軸ラベル
                    //     display: true,                // 表示設定
                    //     labelString: '学習時間帯',    // ラベル
                    // },
                }],
                yAxes: [{
                    ticks: {
                        callback: function(value){
                            return value+'%';
                        }
                    }
                    }]
            }                            
        }
    });

    let chart2 = new modules.Chart(achievementChart, {
        type: 'line',
        data: {
            labels: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            datasets: [
                {
                    label: '目標点数',
                    data: data[1].goal,
                    borderColor: "#0288D1",
                    pointBorderColor: "#0288D1",
                    lineTension: 0,
                    fill: false,
                },
                {
                    label: '実際点数',
                    data: data[1].testScore,
                    borderColor: "#FB8C00",
                    pointBorderColor: "#FB8C00",
                    lineTension: 0,
                    fill: false,
                }
            ],
        },
        options:{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    // scaleLabel: {                 // 軸ラベル
                    //     display: true,                // 表示設定
                    //     labelString: '学習時間帯',    // ラベル
                    // },
                }],
                yAxes: [{
                    ticks: {
                        callback: function(value){
                            return value+'点';
                        }
                    }
                    }]
            }                            
        }
    });

    let chart3 = new modules.Chart(satisfactionChart, {
        type: 'line',
        data: {
            labels: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            datasets: [
                {
                    label: '学習満足度',
                    data: data[2],
                    borderColor: "#0288D1",
                    pointBorderColor: "#0288D1",
                    lineTension: 0,
                    fill: false,
                }
            ],
        },
        options:{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    // scaleLabel: {                 // 軸ラベル
                    //     display: true,                // 表示設定
                    //     labelString: '学習時間帯',    // ラベル
                    // },
                }],
                yAxes: [{
                    ticks: {
                        callback: function(value){
                            return value+'%';
                        }
                    }
                    }]
            }                            
        }
    });

    let chart4 = new modules.Chart(recordTimeChart, {
        type: 'line',
        data: {
            labels: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            datasets: [
                {
                    label: '学習時間',
                    data: data[3],
                    borderColor: "#0288D1",
                    pointBorderColor: "#0288D1",
                    lineTension: 0,
                    fill: false,
                }
            ],
        },
        options:{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    // scaleLabel: {                 // 軸ラベル
                    //     display: true,                // 表示設定
                    //     labelString: '学習時間帯',    // ラベル
                    // },
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

    let returnData = {
        executingAndCompliting: chart1,
        achievement: chart2,
        satisfaction: chart3,
        recordTime: chart4
    }

    return returnData;
}