/**
 * Created by Andy on 2017/2/8.
 */



function CreateHttp(){
	this.init();
}
CreateHttp.prototype.init = function(){
	this.fs = require("fs");
	this.http = require("http");
};

CreateHttp.prototype.run = function(){
	var that = this;
	that.http.createServer(function (req, res) {
		req.on("data",function(data){
			console.log(data);
		});
		that.writeHead(req, res);
		that.response(req, res);

	}).listen(8080, function () {});
};

CreateHttp.prototype.writeHead = function(req, res){
	var filesType = req.url.split(".").pop();
	var resType = "";
	switch(filesType){
		case "css":
			resType = "text/css";
			break;
		case "html":
			resType = "text/html";
			break;
		case "js":
			resType = "text/javascript";
			break;
		case "png":
		case "jpg":
		case "jpeg":
		case "gif":
			resType = "image/" + filesType;
			break;
		default:
			resType = "text/html";
			break;
	}

	res.writeHead(200, {
		//'Cache-Control':"max-age=" + 1800,
		"Content-Type": resType
	});
};

CreateHttp.prototype.response = function(req, res){

	if(req.url === "/"){
		console.log("来自 ",req.headers.host," 的请求");
		//初始化客户端；
		this.fs.readFile(HOST_DIR + req.url + "index.html",function(err,chunk){

			if(err){
				//console.log(err);
			}else{
				res.write(chunk.toString());
			}
			res.end();
		});
	}else{
		//资源请求；
		this.fs.readFile(HOST_DIR + req.url,function(err,chunk){

			if(err){
				//console.log(err);
			}else {
				if(/\.(png|jpg|jpeg|gif)$/.test(req.url)){
					//图片类型转换成“base64”输出
					res.write(new Buffer(chunk,"base64"));
				}else{
					//文本类型转成明文字串
					res.write(chunk.toString());
				}
			}
			res.end();
		});
	}
};

module.exports = new CreateHttp();