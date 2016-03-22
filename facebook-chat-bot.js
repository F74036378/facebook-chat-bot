var fs = require("fs");
var login = require("facebook-chat-api");
var respond = require("./functions/respond");

var larryID = 100001567752835;

var larryIsSleep = false;
var goodTimes = 0;

	//res["課表"] =				{ attachment: fs.createReadStream("./attachment/curriculum.png") }

login({email: "puddingddoogg@gmail.com", password: "mz6s3zfe"}, function callback (err, api) {
	if(err) return console.error(err);

	api.sendMessage("布丁狗起床了~", larryID);

	var stop = api.listen(function(err, message){
		if(err) return console.error(err);

		if(message.body){
			var str = "";

			if(message.body === '承億睡了嗎' && larryIsSleep){
				
				str = "他已經去睡了~\n你也早點睡吧";
				api.sendMessage(str, message.threadID);

			} else if((str = respond.getResponse(message.body))){

				api.sendMessage(str, message.threadID);

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

				str = respond.getQuestion();
				api.sendMessage(str, message.threadID);

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

