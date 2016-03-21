var login = require("facebook-chat-api");

login({email: "puddingddoogg@gmail.com", password: "mz6s3zfe"}, function callback (err, api) {
	if(err) return console.error(err);

	var stop = api.listen(function(err, message){
		if(err) return console.error(err);

		var res = {};
		res["嗨"] = "哈囉~";
		res["你是誰"] = "我是 Larry 養的布丁狗";

		if(message.body){
			if(message.body in res){

				api.sendMessage(res[message.body], message.threadID);

			} else if(message.body == '/stop'){

				return stop();

			} else {

				str = "";
				str += "我聽不懂你在說什麼\n";
				str += "你可以說:\n";
				str += "1.嗨\n";
				str += "2.你是誰\n";

				api.sendMessage(str, message.threadID);

			}
		}
	})

});

