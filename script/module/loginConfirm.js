module.exports.confirm = function(){
    let userId = window.sessionStorage.getItem(['userId']);// session確認

    // session切れなら
    if(userId == undefined){
        window.location.href = '../login.php';
    }
}