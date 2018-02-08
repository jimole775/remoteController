/**
 * Created by Andy on 2017/2/8.
 */

export default class CreateHttp {
    constructor() {
        this.url = require('url');
        this.http = require("http");
        this.fs = require("fs");
        this.path = require("path");
        this.zlib = require("zlib");
    }

    open(port) {
        let that = this;
        that.http.createServer(function (req, res) {
            that.writeHead(req, res).response(req, res);
        }).listen(port, function () {
        });
    }

    writeHead(req, res) {
        let fileName = req.url.split("/").pop();
        fileName = fileName ? fileName : "index.html";
        var extension = fileName.split(".").pop();
        var contentType = "text/html";
        var contentEncoding = "gzip"

        switch (extension) {
            case "css":
                contentType = "text/css";
                break;
            case "html":
                contentType = "text/html";                
                contentEncoding = null;
                break;
            case "js":
                contentType = "application/javascript";
                break;
            case "png":
            case "jpg":
            case "jpeg":
            case "gif":
            case "ico":
                contentType = "image/" + extension;                
                contentEncoding = null;
                break;
            case "json":
                contentType = "application/" + extension;
                break;
        }

        let headOption = {};
        headOption["Cache-Control"] = "max-age=" + 30*24*60*60*1000;
        headOption["Content-Type"] = contentType;
        if(contentEncoding) headOption["Content-Encoding"] = contentEncoding;        

        res.writeHead(200, headOption);

        return this;
    }

    response(req, res) {
        let that = this;
        let xRequestedWith = req.headers["x-requested-with"];
        let extension = that.path.extname(req.url);
        let gzipHandler = that.zlib.createGzip();

        if (!extension) {
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
            let fileStream = null;
            if (/\.(png|jpg|jpeg|gif|ico)$/.test(extension)) {
                // 图片类型转换成“base64”输出
                fileStream = that.fs.createReadStream(that.path.join(SOURCES_DIS, req.url));            
                fileStream.pipe(res);

            }else{

                fileStream = that.fs.createReadStream(that.path.join(SOURCES_DIS, req.url));
                fileStream.pipe(gzipHandler).pipe(res);

            } 

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
