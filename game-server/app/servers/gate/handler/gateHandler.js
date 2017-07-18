/**
 * Created by xieyq on 2017/3/23.
 */
//var dispatcher = require('../../../util/dispatcher');
//var userDao = require("../../../dao/userDao");
//var Code = require("../../../util/code");
module.exports = function(app)
{
    return new Handler(app);
}

var Handler = function(app) {
    this.app = app;
};

//请求进入根据网关路由获取connector的ip和端口
Handler.prototype.queryEntry = function(msg,session,next) {
    console.log(msg)
    // get all connectors
    //var connectors = this.app.getServersByType('connector');
    //console.log("6666");
    //console.log(connectors);
    //if(!connectors || connectors.length === 0) {
    //    next(null, {
    //        code: 500
    //    });
    //    return;
    //}
    // select connector
    //var res = dispatcher.dispatch(String(parseInt(Math.random() * 10000)), connectors);
    //console.log(res.clientHost)
    next(null, {
        code: 200,
        host: "127.0.0.1",
        port: "3014"
    });
}