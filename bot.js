var login = require("facebook-chat-api");
var larryID = 100001567752835;
var allRes = {};

function addResponse(req, res){
	allRes[req] = res;
}

login({email: "puddingddoogg@gmail.com", password: "mz6s3zfe"}, function callback (err, api) {
	if(err) return console.error(err);

	api.sendMessage("布丁狗起床了~", larryID);

	var stop = api.listen(function(err, message){
		if(err) return console.error(err);

		addResponse("嗨",				"哈囉~");
		addResponse("你是誰",			"我是 Larry 跟 Annie 一起養的布丁狗");
		addResponse("YA",				"YA個屁");
		addResponse("今天要吃什麼呢",	"吃布丁~布丁好吃~");
		addResponse("你有在打LOL嗎",	"有喔 我的暱稱叫統二布丁");
		addResponse("你有女朋友嗎",		"我沒有女朋友 但是我的主人有女朋友 她叫王詩涵");

		if(message.body){
			if(message.body in allRes){

				api.sendMessage(allRes[message.body], message.threadID);

			} else if(message.body == '/stop'){

				str = "拜拜~"
				api.sendMessage(str, message.threadID);
				return stop();

			} else {

				str = "";
				str += "我聽不懂你在說什麼\n";
				str += "你可以說:\n";

				order = 0;
				for(key in allRes){
					order++;
					str += order.toString() + "." + key + "\n";
				}

				api.sendMessage(str, message.threadID);

			}
		}
	})

});

