var fs = require("fs");
var login = require("facebook-chat-api");
var respond = require("./functions/respond");

var larryID = 100001567752835;
var annieID = 100000322326684;
var goodTimes = 0;


login({email: "puddingddoogg@gmail.com", password: "mz6s3zfe"}, function callback (err, api) {
	if(err) return console.error(err);

	api.sendMessage("布丁狗起床了~", larryID);

	var stop = api.listen(function(err, message){
		if(err) return console.error(err);

		req = message.body.toLowerCase();
		if(req){

			var str = respond.getResponse(req);
			api.sendMessage(str, message.threadID);

			if(req === '/stop'){
				return stop();
			}

		}

/*		
		if(message["attachments"][0] != undefined && message["attachments"][0]["type"] === "sticker"){

			str = "";
			for(i=0 ; i<goodTimes%10+1 ; i++){
				str += "讚個屁";
			}
			api.sendMessage(str, message.threadID);
			goodTimes++;
			
		}
*/
		
	});

});

