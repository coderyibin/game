var GlobalListener = cc.Class({
    ctor : function () {
        cc.log("全局监听类!");
    }
});

module.exports = {
    globalListener : new GlobalListener()
}
