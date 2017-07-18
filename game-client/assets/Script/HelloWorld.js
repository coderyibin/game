cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        //this.label.string = this.text;
        this.serverIp = "127.0.0.1";
        this.serverPort = "3014";
    },

    // called every frame
    update: function (dt) {

    },

    touch : function () {
        var self = this;
        pomelo.init({
            host: self.serverIp,
            port: self.serverPort,
            log: true
        }, function(data) {
            pomelo.request("connector.entryHandler.entry", {
                uid: "1"
            }, function(data) {
                cc.log("pomelo.request return data: ", data);

                pomelo.disconnect();
                if(data.code === 500) {
                    return;
                }
                // 返回的data.host为"127.0.0.1"，
                // 			测试时需要改成本机ip否则Android手机连接不上
                // 			callback(data.host, data.port);
                //callback(that.serverIp, data.port);
                cc.log("200")
            });
        });
    }
});
