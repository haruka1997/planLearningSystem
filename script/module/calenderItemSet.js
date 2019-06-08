module.exports.set = function(displayItems, $, selectHistoryData, selectButton, escape){

    let classDate = new Date(Number(selectHistoryData.classDate));
    let items = JSON.parse(JSON.stringify(displayItems));

    let classItem = {   // テストデータ
        content: "第" + selectHistoryData.coverage + "回 基礎数C",
        date: classDate,
        time: {
            start: "14:40",
            end: "16:10"
        },
        id: "C" + new Date().getTime()
    };

    items.push(classItem);
    

    let classDay = classDate.getDay();
    calenderItemSet();

    function calenderItemSet(){
        for(var itemsIndex=0; itemsIndex<items.length; itemsIndex++){
            var startHour = Number(items[itemsIndex].time.start.slice(0, items[itemsIndex].time.start.indexOf(":"))); //開始時
            var startMinute = Number(items[itemsIndex].time.start.slice(items[itemsIndex].time.start.indexOf(":")+1, 5)); //開始分
            startMinute = Math.floor(startMinute / 15) * 15; //開始分を15分刻みで切り捨て
            var tdNthChild = ""; //どの曜日に予定を追加するかを設定 (例：nth-child(2) => 月曜日)
            var trNthChild = []; //どの時間に予定を追加するかを設定(例：nth-child(1) => 0時)
            var rowspan = ''; //結合するマス数 (例：15分間 => 1)
            let id = items[itemsIndex].id.slice(0,1);

            /**
             * どの列に予定を追加するか調整
             */
            var itemDay = new Date(items[itemsIndex].date).getDay(); //曜日(0:日曜, 1:月曜...)
            let nthDay = itemDay - classDay;
            if(nthDay < 0){
                nthDay += 7;
            }else if(nthDay == 0){
                nthDay = 7;
            }

            /**
             * どの行に予定を追加するか調整 
             */
            var nthHour = (startHour) * 4 + 1; //例6時 => 1行目
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
                    if(selectButton !== '計画と記録'){ // singleCalenderの場合
                        tdNthChild = 'nth-child(' + Number(i+1) + ')';
                    }else{ // doubleCalenderの場合
                        if(id == 'L' || id == 'P' || id == 'C'){
                            tdNthChild = 'nth-child(' + Number(i+1) + ')';
                        }else{
                            tdNthChild = 'nth-child(' + Number(i+2) + ')';
                        }
                    }
                    break;
                }
            }

            //予定を追加する対象行列に時間と予定名を追加
            // 学習内容7文字だけ抽出
            $('.calender-table tbody tr:' + trNthChild[0] + ' td:' + tdNthChild).text(escape(items[itemsIndex].time.start) + ' ' + escape(items[itemsIndex].content));   //学習内容を設定
           
            //行の削除
            for(var j=0; j<trNthChild.length; j++){ //色を塗る行分
                // let id = items[itemsIndex].id.slice(0,1);
                if(id == 'L' || id == 'P'){
                    $('.calender-table tbody tr:' + trNthChild[j] + ' td:' + tdNthChild).addClass('add-plan'); //classを付与
                }else if(id == 'R'){
                    $('.calender-table tbody tr:' + trNthChild[j] + ' td:' + tdNthChild).addClass('add-record'); //classを付与
                }else{
                    $('.calender-table tbody tr:' + trNthChild[j] + ' td:' + tdNthChild).addClass('add-class'); //classを付与
                }
                $('.calender-table tbody tr:' + trNthChild[j] + ' td:' + tdNthChild).attr('id', escape(items[itemsIndex].id)); //idを付与
            }

            if(id == 'P'){ //プライベートの予定の追加の場合
                for(var j=0; j<trNthChild.length; j++){ //色を塗る行分
                    $('.calender-table tbody tr:' + trNthChild[j] + ' td:' + tdNthChild).addClass(escape(items[itemsIndex].tag)); //classを付与
                }
            }
        }
    }
}

