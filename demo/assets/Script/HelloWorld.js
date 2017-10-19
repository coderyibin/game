cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        Name: {
            default: null,
            type: cc.EditBox
        },
        Room: {
            default: null,
            type: cc.EditBox
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',
        host: "127.0.0.1",
        port : "63000"
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;
    },

    // called every frame
    update: function (dt) {

    },

    socket : function () {
        var self = this;
        var name = self.Name.string;
        var room = self.Room.string;
        pomelo.init({
            host : this.host,
            port : this.port
        }, function () {
            var _name = name;
            var _room = room;
            var rou = "gate.gateHandler.entry";
            pomelo.request(rou, {
            }, function (rs) {
                pomelo.disconnect(function () {
                    pomelo.init({host : rs.host, port : rs.port}, function () {
                        var rout = "connector.entryHandler.entry";
                        pomelo.request(rout, {
                            uid : _name,
                            name : _name,
                            room : _room
                        }, function (m) {
                            console.log(m);
                        });
                    });
                });
            })
        });
    },
});
