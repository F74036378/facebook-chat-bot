console.log("init respond");

questionList = "";
questionList += "我聽不懂你在說什麼\n";
questionList += "你可以說:\n";

sameRes = {};
sameRes["嗨"] =					{ body: "哈囉~" };
sameRes["布丁狗"] =				{ body: "嗨嗨~我是布丁狗" };
sameRes["你是誰"] =				{ body: "我是 Larry 跟 Annie 一起養的布丁狗" };
sameRes["YA"] =					{ body: "YA個屁" };
sameRes["今天要吃什麼呢"] =		{ body: "可以吃布丁阿~布丁好吃~" };
sameRes["你有在打LOL嗎"] =		{ body: "有喔 我的暱稱叫統二布丁" };
sameRes["你有女朋友嗎"] =		{ body: "我沒有女朋友\n但是我的主人有女朋友\n她叫王詩涵" };

sysRes = {};
sysRes["/stop"] = { body: "拜拜~" };
sysRes["/sleep"] = { body: "Larry晚安~" };
sysRes["/wake"] = { body: "早安Larry~" };

amountOfQuestion = 0;
larryIsSleep = false;

for(req in sameRes){
	addQuestion(req);
}
addQuestion("承億睡了嗎");

console.log("respond init OK");






function addQuestion(question){
	amountOfQuestion++;
	questionList += (amountOfQuestion.toString() + "." + question + "\n");
}


function multiRes(req){
	if(req === "承億睡了嗎"){
		if(larryIsSleep) return "他已經去睡了~\n你也早點睡吧";
		return "還沒~";
	}
	return "";
}

function sysTask(req){
	if(req === "/sleep") larryIsSleep = true;
	else if(req === "/wake") larryIsSleep = false;
}






var getQuestion = function(){
	return questionList;
};


var getResponse = function(req){
	var str = sameRes[req];
	if(str)	return str;
	str = multiRes(req);
	if(str)	return str;
	return "";
};

var getSysResponse = function(req){
	var str = sysRes[req];
	if(str){
		sysTask(req);
		return str;
	}
	return "";
};


module.exports.getQuestion = getQuestion;
module.exports.getResponse = getResponse;
module.exports.getSysResponse = getSysResponse;




