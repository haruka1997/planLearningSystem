// モジュール設定
var modules = require('./module/moduleInit.js');
modules = modules.mainSet();

let selectSettingId = sessionStorage.getItem('settingId');

$(function(){
    // DOMの初期設定
    initDOM();
});

function initDOM(){
    // 振り返り画面の登録ボタンをクリックされたら
    $(document).on("click", ".reflection-regist-button", function () {
        let category = $(this).attr('id');
        reflectionRegist(category); //登録処理
    });
    
}

function reflectionRegist(category){
    console.log(selectSettingId)
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
			postData.Q1 += ' ' + $(this).val();
        });
        postData.Q2 = $('input:radio[name="Q2"]:checked').val();
        postData.Q3 = $('input:radio[name="Q3"]:checked').val();
        postData.Q4 = $('#reflectionText').val();
    }else{　//計画実施率が100%の場合
        postData.Q1 = $('input:radio[name="Q1"]:checked').val();
        $('input:checkbox[name="Q2"]:checked').each(function() {
			postData.Q2 += ' ' + $(this).val();
        });
        postData.Q3 = $('#reflectionText').val();
    }

    console.log(postData);
    
    // DBに登録
    $.ajax({
        url:'./../../php/main/postReflection.php',
        type:'POST',
        data: postData,
        dataType: 'json'       
    })
    // Ajaxリクエストが成功した時発動
    .done( () => {
        
    })
    // Ajaxリクエストが失敗した時発動
    .fail( (data) => {
        alert('振り返り情報の登録に失敗しました');
    });
}
