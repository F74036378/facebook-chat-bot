fs = require('fs');

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

regRes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
sysRes = {};
sysRes["/stop"] =		{ body: "拜拜~" };

console.log("init respond OK");


function addQuestion(question){
	amountOfQuestion++;
	questionList += (amountOfQuestion.toString() + "." + question + "\n");
}

function sysTask(req){
	if(req === '/reload'){
		reload();
	}
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
	for(keyword in regRes){
		if(req.indexOf(keyword) != -1){
			return regRes[keyword];
		}
	}
	return questionList;
}

function reload(){
			
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




