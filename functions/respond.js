res = {};
res["嗨"] =					{ body: "哈囉~" };
res["布丁狗"] =				{ body: "嗨嗨~我是布丁狗" };
res["你是誰"] =				{ body: "我是 Larry 跟 Annie 一起養的布丁狗" };
res["YA"] =					{ body: "YA個屁" };
res["今天要吃什麼呢"] =		{ body: "可以吃布丁阿~布丁好吃~" };
res["你有在打LOL嗎"] =		{ body: "有喔 我的暱稱叫統二布丁" };
res["你有女朋友嗎"] =		{ body: "我沒有女朋友\n但是我的主人有女朋友\n她叫王詩涵" };
res["承億睡了嗎"] =			{ body: "還沒~" };


var getQuestion = function(){
	this.questionList = "";
	this.questionList += "我聽不懂你在說什麼\n";
	this.questionList += "你可以說:\n";
	var i = 0;
	for(req in res){
		i++;
		this.questionList += (i.toString() + "." + req + "\n");
	}
	return this.questionList;
};


var getResponse = function(req){
	if(req in res) return res[req];
	return "";
};


module.exports.getQuestion = getQuestion;
module.exports.getResponse = getResponse;
