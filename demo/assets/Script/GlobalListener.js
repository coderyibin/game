var GlobalListener = cc.Class({
    ctor : function () {
        cc.log("全局监听类!");
        pomelo.on("WWW", function (msg) {
            console.log(msg);
        })
    }
});

module.exports = {
    globalListener : new GlobalListener()
}
