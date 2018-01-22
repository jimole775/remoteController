/**
 * Created by Andy on 2017/2/8.
 */

export default class CreateHttp {
    constructor() {
        this.url = require('url');
        this.http = require("http");
        this.fs = require("fs");
        this.path = require("path");
    }

    open(port) {
        let that = this;
        that.http.createServer(function (req, res) {
            that.writeHead(req, res).response(req, res);
        }).listen(port, function () {
        });
    }

    writeHead(req, res) {
        var extension = req.url.split(".").pop();
        var contentType = "text/html";
        switch (extension) {
            case "css":
                contentType = "text/css";
                break;
            case "html":
                contentType = "text/html";
                break;
            case "js":
                contentType = "text/javascript";
                break;
            case "png":
            case "jpg":
            case "jpeg":
            case "gif":
                contentType = "image/" + extension;
                break;
            case "json":
                contentType = "application/" + extension;
                break;
        }

        res.writeHead(200, {
            'Cache-Control':"max-age=" + 30*24*60*60*1000,
            "Content-Type": contentType
        });

        return this;
    }

    response(req, res) {
        let that = this;
        let xRequestedWith = req.headers["x-requested-with"];
        let extension = that.path.extname(req.url);

        if (req.url === "/") {
            console.log("来自 ", req.headers.host, " 的请求");
            //初始化客户端；
            that.fs.readFile(that.path.join(SOURCES_DIS, req.url, "index.html"), function (err, chunk) {

                if (err) {
                    console.log(err);
                } else {
                    res.write(chunk.toString());
                }
                res.end();
            });

        } else if (extension) {
            //CDN资源请求；
            that.fs.readFile(that.path.join(SOURCES_DIS, req.url), function (err, chunk) {

                if (err) {
                    console.log(err);
                } else {
                    if (/\.(png|jpg|jpeg|gif)$/.test(req.url)) {
                        //图片类型转换成“base64”输出
                        res.write(new Buffer(chunk, "base64"));
                    } else {
                        //文本类型转成明文字串
                        res.write(chunk.toString());
                    }
                }
                res.end();

            });

        } else if (xRequestedWith) {
            //ajax请求：
            req.on("data", function (data) {

                let ajaxData = new that.url.parse("?" + data.toString(), true).query;
                let filename = ajaxData.dataType + ".json";
                that.fs.readFile(that.path.join(DB_DIS, req.url, filename), function (err, chunk) {

                    let scannerData = JSON.parse(chunk.toString());
                    let finalData = Object.assign(scannerData.items[ajaxData.index], {itemcount: scannerData.itemcount});

                    res.write(JSON.stringify(CreateHttp.upsetFinalData(finalData, "info")));
                    res.end();
                });
            });
        }

        return this;
    }

    static upsetFinalData(item, targetProp) {

        if (!Math.round(Math.random())) {
            if (item[targetProp] instanceof Array) {
                item[targetProp].length = 0
            } else {
                item[targetProp] = {};
            }
        }

        return item;
    }
}
