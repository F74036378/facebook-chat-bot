console.log("init respond");

amountOfQuestion = 0;
questionList = "";
questionList += "我聽不懂你在說什麼\n";
questionList += "你可以講像是這樣的話:\n";
addQuestion("嗨嗨你好");
addQuestion("哈囉布丁狗");
addQuestion("你是誰阿");
addQuestion("YA我今天撿到一百塊");
addQuestion("今天晚餐要吃什麼呢");
addQuestion("你有在打LOL嗎");
addQuestion("你有交女朋友嗎");
addQuestion("台灣大學在哪裡");

sysRes = {};
sysRes["/stop"] =		{ body: "拜拜~" };

console.log("init respond OK");



function addQuestion(question){
	amountOfQuestion++;
	questionList += (amountOfQuestion.toString() + "." + question + "\n");
}

function sysTask(req){
	return;
}

function getSysResponse(req){
	var str = sysRes[req];
	if(str){
		return str;
	}
	return "";
};

function getRegularResponse(req){
	if(req.indexOf("嗨") != -1 || req.indexOf("哈囉") != -1 || req.indexOf("hi") != -1 || req.indexOf("你好") != -1){
		return "哈囉你好\n我是可愛的布丁狗";
	}

	if(req.indexOf("布丁狗") != -1){
		return "嗨嗨~我是布丁狗";
	}

	if(req.indexOf("你是誰") != -1){
		return "我是 Larry 跟 Annie 一起養的布丁狗";
	}

	if(req.indexOf("ya") != -1){
		return "YA個屁";
	}

	if(req.indexOf("吃") != -1){
		return "吃布丁~布丁好吃~";
	}

	if(req.indexOf("lol") != -1){
		return "我也有在打LOL喔\n我的暱稱叫統二布丁";
	}

	if(req.indexOf("女朋友") != -1){
		return "我沒有女朋友\n但是我的主人有女朋友\n她叫王詩涵";
	}

	if(req.substring(req.length-3, req.length) === "在哪裡"){
		return "https://www.google.com.tw/maps/place/" + req.substring(0, req.length-3);
	}

	return questionList;
}





var getResponse = function(req){
	if(req.charAt(0) == '/'){
		sysTask(req);
		return getSysResponse(req);
	} else {
		return getRegularResponse(req);
	}
};


module.exports.getResponse = getResponse;




