var login = require("facebook-chat-api");

login({email: "puddingddoogg@gmail.com", password: "mz6s3zfe"}, function callback (err, api) {
	if(err) return console.error(err);

	var stop = api.listen(function(err, message){
		if(err) return console.error(err);

		var res = {};
		res["嗨"] = "哈囉~";
		res["你是誰"] = "我是 Larry 養的布丁狗";
		res["YA"] = "YA個屁";
		res["今天要吃什麼呢"] = "吃布丁~布丁好吃~";
		res["你有在打LOL嗎"] = "有喔 我的暱稱叫統二布丁";
		res["你有女朋友嗎"] = "我沒有女朋友 但是我的主人有女朋友 她叫王詩涵"

		if(message.body){
			if(message.body in res){

				api.sendMessage(res[message.body], message.threadID);

			} else if(message.body == '/stop'){

				str = "拜拜~"
				api.sendMessage(str, message.threadID);
				return stop();

			} else {

				str = "";
				str += "我聽不懂你在說什麼\n";
				str += "你可以說:\n";

				str += "1.嗨\n";
				str += "2.你是誰\n";
				str += "3.YA\n"
				str += "4.今天要吃什麼呢\n";
				str += "5.你有在打LOL嗎\n";
				str += "6.你有女朋友嗎\n";

				api.sendMessage(str, message.threadID);

			}
		}
	})

});

