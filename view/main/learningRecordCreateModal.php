<div class="learning-record-create-modal-wrapper">
    <div class="plan-modal">
        <!-- ヘッダー -->
        <div id="modal-header">
            <div class="header-title">学習記録の追加</div>
            <div class="header-cansel-button">×</div>
        </div>
        <!-- コンテンツ -->
        <div id="modal-content">
            <!-- エラー -->
            <div class="modal-error"></div>
            <!--学習内容 -->
            <div class="form-group pmd-textfield">       
                <label class="required">学習内容</label>
                <select class="select-simple form-control pmd-select2 select-learning-content required" id="selectLearningContent">
                </select>
                <input type="text" id="inputLearningContent" class="form-control input-learning-content required" style="display:none" placeholder="学習内容を入力">
            </div>
            <!-- 学習日 -->
            <div class="form-group pmd-textfield">
                <label for="learningDate" class="control-label required">
                    学習日
                </label>
                <select class="select-simple form-control pmd-select2 select-learning-date required" id="learningDate">
                </select>
                <!-- <input type="date" id="learningDate" class="form-control required"> -->
            </div>
             <!-- 学習時間 -->
             <div class="form-group pmd-textfield">
                <label for="learningTimeStart" class="control-label required">
                    学習時間
                </label>
                <div style="display:flex;">
                    <select class="select-simple form-control pmd-select2 select-learning-time" id="learningTimeStartHour">
                        <option selected>00</option><option>01</option><option>02</option><option>03</option><option>04</option><option>05</option><option>06</option><option>07</option><option>08</option><option>09</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option>
                    </select>
                    <p>：</p>
                    <select class="select-simple form-control pmd-select2 select-learning-time" id="learningTimeStartTime">
                        <option selected>00</option><option>05</option><option>10</option><option>15</option><option>20</option><option>25</option><option>30</option><option>35</option><option>40</option><option>45</option><option>50</option><option>55</option>
                    </select>
                    <p style="margin:0 20 0 20;">〜</p>
                    <select class="select-simple form-control pmd-select2 select-learning-time" id="learningTimeEndHour">
                        <option selected>00</option><option>01</option><option>02</option><option>03</option><option>04</option><option>05</option><option>06</option><option>07</option><option>08</option><option>09</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option>
                    </select>
                    <p>：</p>
                    <select class="select-simple form-control pmd-select2 select-learning-time" id="learningTimeEndTime">
                        <option selected>00</option><option>05</option><option>10</option><option>15</option><option>20</option><option>25</option><option>30</option><option>35</option><option>40</option><option>45</option><option>50</option><option>55</option>
                    </select>
                </div>
            </div>
            <!-- メモ -->
            <div class="form-group pmd-textfield">
                <label class="control-label">メモ</label>
                <textarea class="form-control" id="learningMemo"></textarea>
            </div>
            <!-- 追加ボタン -->
            <div class="record-modal-footer-button">
                <button class="learning-add-button mdl-button mdl-js-button mdl-button--raised" disabled>追加</button>
            </div>
        </div>
    </div>
</div>
