// モジュール設定
var modules = require('./module/moduleInit.js');
modules = modules.mainSet();

let log = {};
let selectCoverage = "2";    // 選択する授業回の初期値(第2回)

$(function(){

    // ログデータの取得
    getLog();

    // DOMの初期設定
    initDOM();
});

function initDOM(){

    // 授業回を選択されたら
    $('.select-class select').change(function () {
        if(selectCoverage !== $(this).val()){
            selectCoverage = $(this).val(); // 選択した授業回を設定
            getLog();  // ログデータの取得
        }
    });

     // テーブルの振り返りボタンをクリックされたら
     $(document).on("click", ".send-comment-button", function () {
        let settingId = $(this).attr('id');
        sendComment(settingId);
    });
}

/**
 * ログデータの取得
 */
function getLog(){
    $.ajax({
        url:'./../../php/log/getLog.php',
        type:'POST',
        data: {
            'coverage': selectCoverage
        },
        dataType: 'json'       
    })
    // Ajaxリクエストが成功した時発動
    .done( (data) => {
        console.log(data);
        log = data;
        displayLog();
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
        console.log(data);
        alert('取得に失敗しました');
    })
};

/**
 * ログデータの表示
 */
function displayLog(){

    // テーブル内容初期化
    $('.log-table tbody').html(''); 

    for(let data of log){
        // 表示形式の変換
        // 目標達成率の表示
        if(data.achievement == "100"){
            data.achievementText = '達成 (' + data.testScore + '点/' + data.goal + '点)';
        }else if(data.achievement == "0"){
            data.achievementText = '未達成 (' + data.testScore + '点/' + data.goal + '点)';
        }else{
            data.achievementText = '未登録';
        }

        // 学習満足度の表示
        switch(data.satisfaction){
            case '0': data.satisfactionText = '満足していない'; break;
            case '25': data.satisfactionText = 'あまり満足していない'; break;
            case '50': data.satisfactionText = 'どちらともいえない'; break;
            case '75': data.satisfactionText = 'まあ満足している'; break;
            case '100': data.satisfactionText = '満足している'; break;
            default : data.satisfactionText  = '未登録'; break;
        }

        $('.log-table tbody').append(
            '<tr><td class="mdl-data-table__cell--non-numeric">' + data.userId + '</td><td>' + data.executing + '%</td><td>' + data.achievementText + '</td><td>' + data.satisfactionText + '</td><td>' + data.recordTime + '</td>'
            + '<td><input type="text" size="50" class="comment"/><button class="send-comment-button" id=' + data.settingId + '>送信</button></td></tr>'
        );
    }
}

function sendComment(settingId){
    let comment = $('.comment').val();

    for(let data of log){
        if(data.settingId == settingId){
            if(data.comment == null){
                data.comment = comment;
            }else{
                data.comment += comment;
            }

            $.ajax({
                url:'./../../php/log/postComment.php',
                type:'POST',
                data: data,
                dataType: 'json'       
            })
            // Ajaxリクエストが成功した時発動
            .done( (data) => {
                console.log(data);
                alert('コメントを送信しました');
                $('.comment').val("");
            })
            // Ajaxリクエストが失敗した時発動
            .fail( (data) => {
                alert('コメントの送信に失敗しました');
            });
        }
    }
}
