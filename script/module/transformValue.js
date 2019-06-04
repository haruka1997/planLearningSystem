module.exports = {
    
    // 文字型をBoolean型に変換する
    stringToBoolean: function(plans){
        for(let plan of plans){
            if(plan.learningFlag == "true"){
                plan.learningFlag = true;
            }else{
                plan.learningFlag = false;
            }
        }
        return plans;
    }
}