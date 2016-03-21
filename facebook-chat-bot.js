var login = require("facebook-chat-api");
var fs = require("fs");

var larryID = 100001567752835;
var res = {};
var questionList = "";

var larryIsSleep = false;
var goodTimes = 0;

function initResponse(){
	res["嗨"] =					{ body: "哈囉~" };
	res["布丁狗"] =				{ body: "嗨嗨~我是布丁狗" };
	res["你是誰"] =				{ body: "我是 Larry 跟 Annie 一起養的布丁狗" };
	res["YA"] =					{ body: "YA個屁" };
	res["今天要吃什麼呢"] =		{ body: "可以吃布丁阿~布丁好吃~" };
	res["你有在打LOL嗎"] =		{ body: "有喔 我的暱稱叫統二布丁" };
	res["你有女朋友嗎"] =		{ body: "我沒有女朋友\n但是我的主人有女朋友\n她叫王詩涵" };
	res["承億睡了嗎"] =			{ body: "還沒~" };

	//res["課表"] =				{ attachment: fs.createReadStream("./attachment/curriculum.png") }
}


function initQuestion(){
	questionList = "";
	questionList += "我聽不懂你在說什麼\n";
	questionList += "你可以說:\n";

	var order = 0;
	for(key in res){
		order++;
		questionList += order.toString() + "." + key + "\n";
	}
}


login({email: "puddingddoogg@gmail.com", password: "mz6s3zfe"}, function callback (err, api) {
	if(err) return console.error(err);

	initResponse();
	initQuestion();
	api.sendMessage("布丁狗起床了~", larryID);

	var stop = api.listen(function(err, message){
		if(err) return console.error(err);

		if(message.body){
			if(message.body === '承億睡了嗎' && larryIsSleep){
				
				str = "他已經去睡了~\n你也早點睡吧";
				api.sendMessage(str, message.threadID);

			} else if(message.body in res){

				api.sendMessage(res[message.body], message.threadID);

			} else if(message.body === '/stop'){

				str = "拜拜~";
				api.sendMessage(str, message.threadID);
				return stop();

			} else if(message.body === '/sleep'){
			
				str = "Larry晚安~";
				api.sendMessage(str, message.threadID);
				larryIsSleep = true;

			} else if(message.body === '/wake'){

				str = "早安Larry~";
				api.sendMessage(str, message.threadID);
				larryIsSleep = false;
				
			} else {

				api.sendMessage(questionList, message.threadID);

			}
		}

		
		if(message["attachments"][0] != undefined && message["attachments"][0]["type"] === "sticker"){

			str = "";
			goodTimes++;
			for(i=0 ; i<goodTimes%10+1 ; i++){
				str += "讚個屁";
			}
			api.sendMessage(str, message.threadID);
			
		}
		
	});

});

