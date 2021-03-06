// モジュール設定
var modules = require('./module/moduleInit.js');
modules = modules.mainSet();

let selectSettingId = sessionStorage.getItem('settingId');
let executing = sessionStorage.getItem('executing');

$(function(){
    // DOMの初期設定
    initDOM();
});

function initDOM(){
    // 計画実施率を表示
    $('#execting').text('あなたの計画実施率は' + executing + '%でした');
    // 振り返り画面の登録ボタンをクリックされたら
    $(document).on("click", ".reflection-regist-button", function () {
        let category = $(this).attr('id');
        reflectionRegist(category); //登録処理
    });
    
}

function reflectionRegist(category){
    let postData = {
        settingId: selectSettingId,
        category: category,
        Q1: '',
        Q2: '',
        Q3: '',
        Q4: ''
    };
    if(category == 'non-execting'){ // 計画実施率が100%未満の場合
        $('input:checkbox[name="Q1"]:checked').each(function() {
			postData.Q1 +=  ' ' + $(this).val();
        });
        postData.Q2 = $('input:radio[name="Q2"]:checked').val();
        postData.Q3 = $('input:radio[name="Q3"]:checked').val();
        postData.Q4 = $('#reflectionText').val();
    }else{　//計画実施率が100%の場合
        postData.Q1 = $('#Q1').val();
        postData.Q2 = $('input:radio[name="Q2"]:checked').val();
        $('input:checkbox[name="Q3"]:checked').each(function() {
			postData.Q3 += ' ' + $(this).val();
        });
        postData.Q4 = $('#Q4').val();
    }
    
    // DBに登録
    $.ajax({
        url:'./../../php/main/postReflection.php',
        type:'POST',
        data: postData,
        dataType: 'json'       
    })
    // Ajaxリクエストが成功した時発動
    .done( (data) => {
        // 振り返りフラグをtrueにする
        let updateData = {
            settingId: selectSettingId,
            reflectionFlag: true
        }; 
        $.ajax({
            url:'./../../php/main/updateReflectionFlag.php',
            type:'POST',
            data: updateData,
            dataType: 'json'       
        })
        .done( (data) => {
            alert('登録完了しました');
            // メイン画面をリロードして振り返り画面を閉じる
            window.opener.location.reload();
            window.open('','_self').close();
        })
        // Ajaxリクエストが失敗した時発動
        .fail( (data) => {
            alert('登録に失敗しました');
        });
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
        alert('振り返り情報の登録に失敗しました');
    });
}
