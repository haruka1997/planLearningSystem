module.exports.set = function(items, $){

    calenderItemSet();

    function calenderItemSet(){
        for(var itemsIndex=0; itemsIndex<items.length; itemsIndex++){
            var startHour = Number(items[itemsIndex].time.start.slice(0, items[itemsIndex].time.start.indexOf(":"))); //開始時
            var startMinute = Number(items[itemsIndex].time.start.slice(items[itemsIndex].time.start.indexOf(":")+1, 5)); //開始分
            startMinute = Math.floor(startMinute / 15) * 15; //開始分を15分刻みで切り捨て
            var tdNthChild = ""; //どの曜日に予定を追加するかを設定 (例：nth-child(2) => 月曜日)
            var trNthChild = []; //どの時間に予定を追加するかを設定(例：nth-child(1) => 0時)
            var rowspan = ''; //結合するマス数 (例：15分間 => 1)

            /**
             * どの列に予定を追加するか調整
             */
            var nthDay = new Date(items[itemsIndex].date).getDay(); //曜日(0:日曜, 1:月曜...)
            if(nthDay == 0){ //日曜日の場合
                nthDay = 7;
            }

            /**
             * どの行に予定を追加するか調整 
             */
            var nthHour = (startHour-6) * 4 + 1; //例6時 => 1行目
            nthHour += startMinute / 15; //例：30分 => +2行目
            trNthChild.push('nth-child(' + nthHour + ')'); //例：0時30分 => 4行目 から予定を追加する

            /**
             * rowspanの設定
             */ 
            //終了時間 - 開始時間の分を取得(例：00:30〜01:00 => 30)
            var endHour = Number(items[itemsIndex].time.end.slice(0, items[itemsIndex].time.end.indexOf(":")));
            var endMinute = Number(items[itemsIndex].time.end.slice(items[itemsIndex].time.end.indexOf(":")+1, 5));
            var gapMinute = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
            rowspan = gapMinute / 15; //例：30分間 => 2行分結合する

            /**
             * 削除する行の設定(結合した分だけ行を削除する)
             */
            // var deletetrNthChild = []; //削除する行の配列
            for(var i=1; i<rowspan; i++){ //rowspanした分だけ
                trNthChild.push('nth-child(' + Number(nthHour+i) + ')'); //削除する行の情報を配列に格納
            }

            /**
             * 時間の表示形式の設定(10以下は0埋め処理)
             */ 
            if(startHour < 10){
                startHour = '0' + startHour;
            }
            if(startMinute < 10){
                startMinute = '0' + startMinute;
            }

            var calenderContent = $('.calender-table tbody tr:' + trNthChild[0])[0].childNodes;
            for(var i=1; i<calenderContent.length; i++){
                if(calenderContent[i].classList[1] == nthDay){
                    tdNthChild = 'nth-child(' + Number(i+1) + ')';
                    break;
                }
            }

            //予定を追加する対象行列に時間と予定名を追加
            // 学習内容7文字だけ抽出
            $('.calender-table tbody tr:' + trNthChild[0] + ' td:' + tdNthChild).html(items[itemsIndex].time.start + ' ' + items[itemsIndex].content.slice(0,7));   //学習内容を設定
           
            //行の削除
            for(var j=0; j<trNthChild.length; j++){ //色を塗る行分
                $('.calender-table tbody tr:' + trNthChild[j] + ' td:' + tdNthChild).addClass('add-plan'); //classを付与
                $('.calender-table tbody tr:' + trNthChild[j] + ' td:' + tdNthChild).attr('id', items[itemsIndex].id); //idを付与
            }

            if(!items[itemsIndex].learningFlag || items[itemsIndex].learningFlag == "false"){ //プライベートの予定の追加の場合
                for(var j=0; j<trNthChild.length; j++){ //色を塗る行分
                    $('.calender-table tbody tr:' + trNthChild[j] + ' td:' + tdNthChild).addClass(items[itemsIndex].tag); //classを付与
                }
            }

            initModalForm(items[itemsIndex].learningFlag);
        }
    }

    function initModalForm(learningFlag){
        if(learningFlag || learningFlag == "true"){
            $('#learningContent').val('');
            $('#selectLearningContent').val('学習内容を選択');
            $('.input-learning-content').css('display', 'none');
            $('#inputLearningContent').val('');
            $('#learningDate').val('');
            $('#learningTimeStart').val('');
            $('#learningTimeEnd').val('');
            $('#learningMemo').val('');
        }else{
            $('#privateDate').val('');
            $('#privateTimeStart').val('');
            $('#privateTimeEnd').val('');
            $('#privateTimeEnd').val('');
            $('.tag').removeClass('active');
            $('#privateMemo').val('');
        }
        $('.modal-error').text('');
    }
}

