module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
	this.channelService = app.get('channelService');
};

/**
 * New client entry.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.entry = function(msg, session, next) {
	let self = this;
	let sessionService = self.app.get("sessionService");
	let s = sessionService.getByUid(msg.uid);
	if (!! s) {
		var data = {
			code : 209,
			error : "该玩家已登录！"
		}
	} else {
		//将当前的session绑定一个id
		session.bind(msg.uid);

		//创建channel
		var channelname = msg.room;
		var channel = this.channelService.createChannel(channelname);
		var userid = channel.getMember(msg.uid);
		var sid = "connector-server-1";
		if (! userid) {//加入房间
			channel.add(msg.uid, sid);
		} else {
            next(null, {code : 210, error : "玩家已在该房间"});
            return;
		}
        var data = {
			code : 200,
            uid : msg.uid,
            name : msg.name,
            room : msg.room
        };
	}
  	// next(null, data);
    channel.pushMessage('WWW', {
        msg: msg
    }, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('push ok');
        }
    });
};

/**
 * Publish route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.publish = function(msg, session, next) {
	var result = {
		topic: 'publish',
		payload: JSON.stringify({code: 200, msg: 'publish message is ok.'})
	};
  next(null, result);
};

/**
 * Subscribe route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.subscribe = function(msg, session, next) {
	var result = {
		topic: 'subscribe',
		payload: JSON.stringify({code: 200, msg: 'subscribe message is ok.'})
	};
  next(null, result);
};
