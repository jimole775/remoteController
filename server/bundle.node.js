/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "E:\\gitStorage\\business - ngRouter";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _StorageRegister = __webpack_require__(16);

var _StorageRegister2 = _interopRequireDefault(_StorageRegister);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = {
    clients: {},
    namesMap: [],
    remoteChanelMap: [],
    opcode: 0
}; /**
    * Created by Andy on 2017/11/7.
    */
exports.default = new _StorageRegister2.default(storage);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (status, emitData, socket) {

    var opcode = _socketStorage2.default.getStorage("opcode");

    var emitProtocolMap = {
        "status": status,
        "serverData": emitData,

        // 谁发上来的数据，就返回给谁，其他用户一律返回null
        "clientData": emitData.clientData && emitData.clientData.uid === socket.uid ? emitData.clientData : null
    };
    console.log("emitProtocolMap:", emitProtocolMap);
    var PayloadData = opcode == 1 ? JSON.stringify(emitProtocolMap) : new Buffer(JSON.stringify(emitProtocolMap));

    if (socket.uid && socket.writable) socket.write(_exports2.default.frameEncode({
        FIN: 1,
        Opcode: opcode,
        PayloadData: PayloadData
    }));
};

var _exports = __webpack_require__(5);

var _exports2 = _interopRequireDefault(_exports);

var _socketStorage = __webpack_require__(0);

var _socketStorage2 = _interopRequireDefault(_socketStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = __webpack_require__(4);
var path = __webpack_require__(2);
exports.default = new (function () {
    function Log() {
        _classCallCheck(this, Log);
    }

    _createClass(Log, [{
        key: "data",
        value: function data(_data) {
            _data = Log.queryMsg(_data);
            var timer = Log.getTimer();
            var fileName = Log.createFileName("data");
            var content = "\u3010" + timer + "\u3011\r\n" + _data + "\r\n";
            this.writeFile("data", fileName, content);
        }
    }, {
        key: "error",
        value: function error(msg) {
            msg = Log.queryMsg(msg);
            var timer = Log.getTimer();
            var fileName = Log.createFileName("error");
            var content = "\u3010" + timer + "\u3011\r\n" + msg + "\r\n";
            this.writeFile("error", fileName, content);
        }
    }, {
        key: "user",
        value: function user(id, ip) {
            id = Log.queryMsg(id);
            ip = Log.queryMsg(ip);
            var timer = Log.getTimer();
            var fileName = Log.createFileName("user");
            var content = "\u3010" + timer + "\u3011\r\n" + ip + " " + id + "\r\n";
            this.writeFile("user", fileName, content);
        }
    }, {
        key: "writeFile",
        value: function writeFile(type, filePath, content) {

            var mkdir = new Promise(function (resolve, reject) {
                fs.readdir(path.join(__dirname, type), function (err, fileGroup) {
                    if (fileGroup instanceof Array) resolve();else reject();
                });
            });

            mkdir.then(function () {
                fs.appendFile(filePath, content, "utf8");
            }, function () {
                fs.mkdir(path.join(__dirname, type), function () {
                    fs.appendFile(filePath, content, "utf8");
                });
            });
        }
    }], [{
        key: "queryMsg",
        value: function queryMsg(msg) {
            if ((typeof msg === "undefined" ? "undefined" : _typeof(msg)) === "object") {
                try {
                    msg = JSON.stringify(msg);
                } catch (error) {

                    msg = error.message + "\r\n" + error.stack;
                }
            }

            return msg;
        }
    }, {
        key: "getTimer",
        value: function getTimer() {

            var h = new Date().getHours().toString();
            var m = new Date().getMinutes().toString();
            var s = new Date().getSeconds().toString();
            h = h.length < 2 ? 0 + h : h;
            m = m.length < 2 ? 0 + m : m;
            s = s.length < 2 ? 0 + s : s;

            return h + ":" + m + ":" + s;
        }
    }, {
        key: "createFileName",
        value: function createFileName(type) {
            var y = new Date().getFullYear();
            var m = new Date().getMonth();
            var d = new Date().getDay();

            return path.resolve(__dirname.split("\\").join("/"), type, y + "." + m + "." + d + ".log");
        }
    }]);

    return Log;
}())();
/* WEBPACK VAR INJECTION */}.call(exports, "server\\log"))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = __webpack_require__(2);

var _path2 = _interopRequireDefault(_path);

var _frameEncode = __webpack_require__(13);

var _frameEncode2 = _interopRequireDefault(_frameEncode);

var _frameDecode = __webpack_require__(14);

var _frameDecode2 = _interopRequireDefault(_frameDecode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Created by Andy on 2017/3/14.
                                                                                                                                                           */

function add(target, name, file) {
    target.prototype[name] = file;
}
//@add(Tool,"frameEncode", frameEncode);
//@add(Tool,"frameDecode", frameDecode);

var Tool = function Tool() {
    _classCallCheck(this, Tool);
};

add(Tool, "frameEncode", _frameEncode2.default);
add(Tool, "frameDecode", _frameDecode2.default);
exports.default = new Tool();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _path = __webpack_require__(2);

var _path2 = _interopRequireDefault(_path);

var _open = __webpack_require__(7);

var _open2 = _interopRequireDefault(_open);

var _open3 = __webpack_require__(11);

var _open4 = _interopRequireDefault(_open3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.ROOT_DIS = _path2.default.resolve(__dirname, "../"); /**
                                                             * Created by Andy on 2017/12/2.
                                                             */


console.log(global.ROOT_DIS);
global.SOURCES_DIS = _path2.default.resolve(__dirname, "../client/src");
global.ASSETS_DIS = _path2.default.resolve(__dirname, "../client/src/assets");
console.log(global.CLIENT_DIS);
global.SERVER_DIS = _path2.default.resolve(__dirname);
console.log(global.SERVER_DIS);
global.DB_DIS = _path2.default.resolve(global.SERVER_DIS, "DB");
console.log(global.DB_DIS);

new _open2.default().open(1110);

(0, _open4.default)(1111);
/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Andy on 2017/2/8.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _url = __webpack_require__(8);

var _url2 = _interopRequireDefault(_url);

var _http = __webpack_require__(9);

var _http2 = _interopRequireDefault(_http);

var _fs = __webpack_require__(4);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(2);

var _path2 = _interopRequireDefault(_path);

var _zlib = __webpack_require__(10);

var _zlib2 = _interopRequireDefault(_zlib);

var _log = __webpack_require__(3);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CreateHttp = function () {
    function CreateHttp() {
        _classCallCheck(this, CreateHttp);

        this.url = _url2.default;
        this.http = _http2.default;
        this.fs = _fs2.default;
        this.path = _path2.default;
        this.zlib = _zlib2.default;
        this.log = _log2.default;
    }

    _createClass(CreateHttp, [{
        key: "open",
        value: function open(port) {
            var that = this;
            that.http.createServer(function (req, res) {
                that.writeHead(req, res).response(req, res);
            }).listen(port, function () {});
        }
    }, {
        key: "writeHead",
        value: function writeHead(req, res) {
            var fileName = req.url.split("/").pop();
            fileName = fileName ? fileName : "index.html";
            var extension = fileName.split(".").pop();
            var contentType = "text/html";
            var contentEncoding = "gzip";
            var useCache = true;
            switch (extension) {
                case "css":
                    contentType = "text/css";
                    break;
                case "html":
                    contentType = "text/html";
                    contentEncoding = null;
                    useCache = false;
                    break;
                case "js":
                    contentType = "application/javascript";
                    break;
                case "png":
                case "jpg":
                case "jpeg":
                case "gif":
                    contentType = "image/" + extension;
                    contentEncoding = null;
                    break;
                case "ico":
                    contentType = "image/" + extension;
                    contentEncoding = null;
                    useCache = false;
                    break;
                default:
                    // ajax请求不会带后缀，默认就是请求json数据类型
                    // 日后还会有xml数据类型
                    contentType = "application/json";
                    useCache = false;
                    contentEncoding = null;
                    break;
            }

            var headOption = {
                "Content-Type": contentType
            };
            if (useCache) headOption["Cache-Control"] = "max-age=" + 30 * 24 * 60 * 60 * 1000;
            if (contentEncoding) headOption["Content-Encoding"] = contentEncoding;

            res.writeHead(200, headOption);

            return this;
        }
    }, {
        key: "response",
        value: function response(req, res) {
            var that = this;
            var query = req.url.split("/").pop();
            var extension = that.path.extname(req.url);
            var gzipHandler = that.zlib.createGzip();

            var isAjax = query && !extension;
            console.log("request url: ", req.url);

            if (req.url == "/") {
                console.log("来自 ", req.headers.host, " 的请求");
                //初始化客户端；
                that.fs.readFile(that.path.join(SOURCES_DIS, req.url, "index.html"), function (err, chunk) {

                    if (err) {
                        that.log.error(err);
                    } else {
                        res.write(chunk.toString());
                    }
                    res.end();
                });
            }

            //CDN资源请求；   
            if (extension) {
                var fileStream = null;
                if (/\.(png|jpg|jpeg|gif|ico)$/.test(extension)) {
                    // 图片类型转换成“base64”输出
                    fileStream = that.fs.createReadStream(that.path.join(SOURCES_DIS, req.url));
                    fileStream.pipe(res);
                } else {

                    fileStream = that.fs.createReadStream(that.path.join(SOURCES_DIS, req.url));
                    fileStream.pipe(gzipHandler).pipe(res);
                }
            }

            // ajax请求：
            if (isAjax) {
                var upsetFinalData = function upsetFinalData(item, targetProp) {

                    if (!Math.round(Math.random())) {
                        if (item[targetProp] instanceof Array) {
                            item[targetProp].length = 0;
                        } else {
                            item[targetProp] = {};
                        }
                    }

                    return item;
                };

                req.on("data", function (data) {

                    var ajaxData = new that.url.parse("?" + data.toString(), true).query;
                    var filename = ajaxData.dataType + ".json";
                    console.log("the db direct: ", that.path.join(DB_DIS, req.url, filename));
                    that.fs.readFile(that.path.join(DB_DIS, req.url, filename), function (err, chunk) {
                        if (err) {
                            that.log.error(err);
                        } else {

                            var scannerData = JSON.parse(chunk.toString());
                            var finalData = Object.assign(scannerData.items[ajaxData.index], { itemcount: scannerData.itemcount });
                            res.write(JSON.stringify(upsetFinalData(finalData, "info")));
                            res.end();
                        }
                    });
                });
            }

            return this;
        }
    }]);

    return CreateHttp;
}();

exports.default = CreateHttp;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (port) {
    var netServer = __webpack_require__(12).createServer(function (socket) {
        socket.on('error', function (e) {
            _log2.default.error(e);
        });
        socket.on('data', function (e) {
            var frame = _exports2.default.frameDecode(e);
            //第一次握手
            if (frame.FIN === 0) {
                console.log("握手");
                (0, _shakehand2.default)(e, socket);
            }
            //数据交互
            else {
                    (0, _host2.default)(frame, socket);
                }
        });
    }).listen(port, function () {});
};

var _exports = __webpack_require__(5);

var _exports2 = _interopRequireDefault(_exports);

var _host = __webpack_require__(15);

var _host2 = _interopRequireDefault(_host);

var _shakehand = __webpack_require__(28);

var _shakehand2 = _interopRequireDefault(_shakehand);

var _log = __webpack_require__(3);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (e) {
    var s = [],
        o = new Buffer(e.PayloadData),
        l = o.length;
    //输入第一个字节
    s.push((e.FIN << 7) + e.Opcode);

    //输入第二个字节，判断它的长度并放入相应的后续长度消息
    //永远不使用掩码
    if (l < 126) {
        s.push(l);
    } else if (l < 0x10000) {
        s.push(126, (l & 0xFF00) >> 8, l & 0xFF);
    } else {
        //8字节数据，前4字节一般没用留空;

        s.push(127, 0, 0, 0, 0, (l & 0xFF000000) >> 24, (l & 0xFF0000) >> 16, (l & 0xFF00) >> 8, l & 0xFF);
    }

    //返回头部分和数据部分的合并缓冲区
    return Buffer.concat([new Buffer(s), o]);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (e) {
    var i = 0,
        j = void 0,
        s = void 0,
        frame = {
        //解析前两个字节的基本数据
        FIN: e[i] >> 7, Opcode: e[i++] & 15, Mask: e[i] >> 7,
        PayloadLength: e[i++] & 0x7F
    };

    if (frame.PayloadLength == 126) {
        //处理特殊长度126和127
        frame.PayloadLength = (e[i++] << 8) + e[i++];
    }
    if (frame.PayloadLength == 127) {
        i += 4; //长度一般用四字节的整型，前四个字节通常为长整形留空的
        frame.PayloadLength = (e[i++] << 24) + (e[i++] << 16) + (e[i++] << 8) + e[i++];
    }
    if (frame.Mask) {
        //判断是否使用掩码
        //获取掩码实体
        frame.MaskingKey = [e[i++], e[i++], e[i++], e[i++]];
        //对数据和掩码做异或运算
        for (j = 0, s = []; j < frame.PayloadLength; j++) {
            s.push(e[i + j] ^ frame.MaskingKey[j % 4]);
        }
    } else {
        s = e.slice(i, frame.PayloadLength); //否则直接使用数据
    }
    //数组转换成缓冲区来使用
    s = new Buffer(s);
    //如果有必要则把缓冲区转换成字符串来使用
    if (frame.Opcode == 1) {
        s = s.toString();
    }
    //设置上数据部分
    frame.PayloadData = s;
    //返回数据帧
    return frame;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (frame, socket) {
    switch (frame.Opcode) {
        case 8:
            var data = frame.PayloadData.slice(2).toString();
            console.log("会话已经结束:", socket, data);
            if (socket.uid) (0, _disconnectChanel2.default)(socket, data);
            if (socket.uid) (0, _reduceUser2.default)(socket, data);
            socket.end();
            socket.destroy(); //删除断线的session，
            break;
        default:
            _socketStorage2.default.setStorage("opcode", frame.Opcode);
            var data = JSON.parse(frame.PayloadData.toString()) || "";
            switch (data.port) {
                case 0x00:
                    (0, _heartBeat2.default)(socket, data);
                    break;
                case 0x01:
                    //返回一個pass信號，並存儲用戶數據
                    (0, _userRegister2.default)(socket, data);
                    break;
                case 0x02:
                    //协助通道的询问
                    (0, _connectAsk2.default)(socket, data);
                    break;
                case 0x03:
                    //协助通道的应答
                    (0, _connectAccept2.default)(socket, data);
                    break;
                case 0x04:
                    (0, _connectReject2.default)(socket, data);
                    break;
                case 0x05:
                    //远程协助交互通道
                    (0, _interActivePassageway2.default)(socket, data);
                    break;
                case 0x06:
                    break;
                case 0x07:
                    break;
                case 0x08:
                    (0, _charChanel2.default)(data);
                    break;
                case 0x09:
                    //交接callbackID
                    (0, _ajaxDataRegister2.default)(socket, data);
                    break;
                case 0x0A:
                    //交接scroll坐标
                    (0, _scrollCoordinate2.default)(socket, data);
                    break;
                case 0xFE:
                    (0, _disconnectChanel2.default)(socket, data);
                    break;
                case 0xFF:
                    //断开协助通道//关闭ws
                    //that.close(data);
                    //console.log("中断远程用户");
                    break;
                default:
                    break;
            }
            break;
    }
};

var _socketStorage = __webpack_require__(0);

var _socketStorage2 = _interopRequireDefault(_socketStorage);

var _disconnectChanel = __webpack_require__(17);

var _disconnectChanel2 = _interopRequireDefault(_disconnectChanel);

var _reduceUser = __webpack_require__(18);

var _reduceUser2 = _interopRequireDefault(_reduceUser);

var _heartBeat = __webpack_require__(19);

var _heartBeat2 = _interopRequireDefault(_heartBeat);

var _userRegister = __webpack_require__(20);

var _userRegister2 = _interopRequireDefault(_userRegister);

var _connectAsk = __webpack_require__(21);

var _connectAsk2 = _interopRequireDefault(_connectAsk);

var _connectAccept = __webpack_require__(22);

var _connectAccept2 = _interopRequireDefault(_connectAccept);

var _connectReject = __webpack_require__(23);

var _connectReject2 = _interopRequireDefault(_connectReject);

var _interActivePassageway = __webpack_require__(24);

var _interActivePassageway2 = _interopRequireDefault(_interActivePassageway);

var _charChanel = __webpack_require__(25);

var _charChanel2 = _interopRequireDefault(_charChanel);

var _ajaxDataRegister = __webpack_require__(26);

var _ajaxDataRegister2 = _interopRequireDefault(_ajaxDataRegister);

var _scrollCoordinate = __webpack_require__(27);

var _scrollCoordinate2 = _interopRequireDefault(_scrollCoordinate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
/**
 * Created by Andy on 2017/3/14.
 */

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Andy on 2017/11/9.
 */

var StorageRegister = function () {
    function StorageRegister() {
        var inject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, StorageRegister);

        this.storage = inject;
    }

    _createClass(StorageRegister, [{
        key: "getStorage",
        value: function getStorage(name) {
            return this.storage[name];
        }
    }, {
        key: "setStorage",
        value: function setStorage(itemName, innerProp, val) {
            /* if (this.storage[itemName] instanceof Array) {
                 val = prop;
                 this.storage[itemName].push(val);
             }
             else */if (val === undefined) {
                val = innerProp;
                this.storage[itemName] = val;
            } else {
                this.storage[itemName][innerProp] = val;
            }

            return this;
        }
    }, {
        key: "addStorage",
        value: function addStorage(itemName, val) {
            if (this.storage[itemName] instanceof Array) {
                this.storage[itemName].push(val);
            } else {
                throw new Error("this storage isn't a Array!");
            }
            return this;
        }
    }, {
        key: "delStorage",
        value: function delStorage(name, val) {
            if (this.storage[name] instanceof Array) {
                var index = val;
                this.storage[name].splice(index, 1);
            } else {
                delete this.storage[name][val];
            }
            return this;
        }
    }], [{
        key: "version",
        value: function version() {
            console.log("v1.0");
        }
    }, {
        key: "author",
        value: function author() {
            console.log("我不tell you~");
        }
    }]);

    return StorageRegister;
}();

exports.default = StorageRegister;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (socket, data) {
    var fromUid = socket.uid;
    var clients = _socketStorage2.default.getStorage("clients");
    var namesMap = _socketStorage2.default.getStorage("namesMap");
    var remoteChanelMap = _socketStorage2.default.getStorage("remoteChanelMap") || [];
    var askerUid = null;
    var helperUid = null;

    // 排查断开的用户，检查是否与其他用户有通讯
    // 删除配对通道，并告知通信的另一端
    remoteChanelMap.forEach(function (item, index) {
        if (item.askerUid == fromUid || item.helperUid == fromUid) {

            askerUid = item.askerUid;
            helperUid = item.helperUid;
            (0, _emitter2.default)(0xFF, {
                remoteId: 0,
                remoteChanelMap: _socketStorage2.default.delStorage("remoteChanelMap", index).getStorage("remoteChanelMap")
            }, clients[askerUid == fromUid ? helperUid : askerUid]);
        }
    });

    // 另行通知其他所有的用户 哪两个用户结束远程业务
    // 解除用户列表中"busing"状态，使其可以被选取
    namesMap.forEach(function (item) {
        if (askerUid == item || helperUid == item) return;
        (0, _emitter2.default)(0x07, {
            remoteChanelMap: _socketStorage2.default.getStorage("remoteChanelMap")
        }, clients[item]);
    });
};

var _socketStorage = __webpack_require__(0);

var _socketStorage2 = _interopRequireDefault(_socketStorage);

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

; /**
   * Created by Andy on 2017/11/4.
   */

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (socket) {

    var namesMap = _socketStorage2.default.getStorage("namesMap");
    var clients = _socketStorage2.default.getStorage("clients");
    var deadUid = socket.uid;

    if (deadUid) {

        //删除断线的会话，
        _socketStorage2.default.delStorage("clients", deadUid);

        //删除断线的用户名，
        var index = namesMap.indexOf(deadUid);
        console.log("删除了用户：", namesMap[index]);
        _socketStorage2.default.delStorage("namesMap", index);
        console.log("删除之后剩余的用户：", _socketStorage2.default.getStorage("namesMap"));
    }

    //刷新用户列表到客户端
    _socketStorage2.default.getStorage("namesMap").forEach(function (item, index) {
        var clients = _socketStorage2.default.getStorage("clients");
        (0, _emitter2.default)(0xFE, { deadUid: socket.uid }, clients[item]);
    });
};

var _socketStorage = __webpack_require__(0);

var _socketStorage2 = _interopRequireDefault(_socketStorage);

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

//通知前端删除断开的用户
/**
 * Created by Andy on 2017/11/4.
 */

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (socket, data) {
    setTimeout(function () {
        (0, _emitter2.default)(0x00, { fin: "1" }, socket);
    }, 5 * 60 * 1000); //5分鐘一次心跳
};

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Andy on 2017/11/4.
 */

;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (socket, data) {
    socket.uid = data.uid;
    _log2.default.user(data.uid, socket.remoteAddress + ":" + socket.remotePort);
    var namesMap = _socketStorage2.default.getStorage("namesMap");
    var clients = _socketStorage2.default.getStorage("clients");

    if (namesMap.indexOf(data.uid) < 0) {
        _socketStorage2.default.addStorage("namesMap", data.uid);
        _socketStorage2.default.setStorage("clients", data.uid, socket);

        // 向所有的用户推送用户名
        // 不过要把包含用户目标的名字去掉
        _socketStorage2.default.getStorage("namesMap").forEach(function (item, index) {
            var curNamesMap = Array.prototype.slice.call(_socketStorage2.default.getStorage("namesMap"));
            curNamesMap.splice(curNamesMap.indexOf(item), 1);
            var remoteChanelMap = _socketStorage2.default.getStorage("remoteChanelMap") || [];
            var curClients = _socketStorage2.default.getStorage("clients"); // 由于前面有操作，在推送之前重新获取
            (0, _emitter2.default)(0x01, { namesMap: curNamesMap, "regPass": true, clientData: data, remoteChanelMap: remoteChanelMap }, curClients[item]);
        });
    } else {
        (0, _emitter2.default)(0x01, { namesMap: [], "regPass": false, clientData: data }, socket); //用戶名已經被注冊
    }
};

var _socketStorage = __webpack_require__(0);

var _socketStorage2 = _interopRequireDefault(_socketStorage);

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

var _log = __webpack_require__(3);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Andy on 2017/11/4.
 */

;
// 绑定用户信息

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (socket, data) {
    var clients = _socketStorage2.default.getStorage("clients");
    var helper = clients[data.remoteUid.helperUid];
    (0, _emitter2.default)(0x02, {
        uiHref: data.items.uiHref,
        remoteUid: {
            askerUid: data.remoteUid.askerUid,
            helperUid: data.remoteUid.helperUid
        }
    }, helper);
};

var _socketStorage = __webpack_require__(0);

var _socketStorage2 = _interopRequireDefault(_socketStorage);

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

// Զ������ѯ�ʣ���ѯ����Ϣ�Ƹ�Э����
/**
 * Created by Andy on 2017/11/4.
 */

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (socket, data) {

    var namesMap = _socketStorage2.default.getStorage("namesMap");
    var clients = _socketStorage2.default.getStorage("clients");

    var askerUid = data.remoteUid.askerUid;
    var helperUid = data.remoteUid.helperUid;

    // 存储远程业务中的两端，主要用于在用户未注册的时候，一口气把所有通道发给前端，让前端自己处理
    _socketStorage2.default.addStorage("remoteChanelMap", { "askerUid": askerUid, "helperUid": helperUid });

    // 通知所有的用户哪两个用户正在进行远程业务
    namesMap.forEach(function (item) {
        if (askerUid == item || helperUid == item) return;
        (0, _emitter2.default)(0x06, {
            remoteChanel: { "askerUid": askerUid, "helperUid": helperUid }
        }, clients[item]);
    });

    var asker = clients[askerUid];
    var helper = clients[helperUid];

    // 给通讯中的用户派发身份标识 （求助者ID：1，协助者ID：2）
    (0, _emitter2.default)(0x03, { remoteId: 1, remoteUid: {
            "askerUid": askerUid,
            "helperUid": helperUid
        } }, asker);

    (0, _emitter2.default)(0x03, { remoteId: 2, remoteUid: {
            "askerUid": askerUid,
            "helperUid": helperUid
        } }, helper);
};

var _socketStorage = __webpack_require__(0);

var _socketStorage2 = _interopRequireDefault(_socketStorage);

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

; /**
   * Created by Andy on 2017/11/4.
   */

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (socket, data) {
    var clients = _socketStorage2.default.getStorage("clients");
    var helper = clients[data.remoteUid.helperUid];
    (0, _emitter2.default)(0x02, {
        uiHref: data.items.uiHref,
        remoteUid: {
            askerUid: data.remoteUid.askerUid,
            helperUid: data.remoteUid.helperUid
        }
    }, helper);
};

var _socketStorage = __webpack_require__(0);

var _socketStorage2 = _interopRequireDefault(_socketStorage);

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

// 远程链接询问，把询问信息推给协助者
/**
 * Created by Andy on 2017/11/4.
 */

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (socket, data) {

    var clients = _socketStorage2.default.getStorage("clients");
    var asker = clients[data.remoteUid.askerUid];
    var helper = clients[data.remoteUid.helperUid];

    if (data.remoteId == 1) {

        // 求助者，接收的只有 点击事件
        //emitter(0x05, data.items, helper);
    } else if (data.remoteId == 2) {

        // 协助者，接收的只有 ajax 数据
        (0, _emitter2.default)(0x05, data.items, asker);
    }
};

var _socketStorage = __webpack_require__(0);

var _socketStorage2 = _interopRequireDefault(_socketStorage);

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

//远程交互
/**
 * Created by Andy on 2017/11/4.
 */

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (data) {
    var toWhom = data.items.oppositeName;
    var fromWhom = data.items.nativeName;
    var clients = _socketStorage2.default.getStorage("clients");

    (0, _emitter2.default)(0x08, {
        remoteId: data.items.remoteId,
        oppositeName: fromWhom,
        nativeName: toWhom,
        sentence: data.items.sentence,
        timer: data.items.timer
    }, clients[toWhom]);
};

var _socketStorage = __webpack_require__(0);

var _socketStorage2 = _interopRequireDefault(_socketStorage);

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

// 远程链接询问，把询问信息推给协助者
/**
 * Created by Andy on 2018/1/6.
 */

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (socket, data) {
    var clients = _socketStorage2.default.getStorage("clients");
    var helperUid = data.remoteUid.helperUid;
    var askerUid = data.remoteUid.askerUid;
    var fromUid = data.uid;

    if (askerUid === fromUid) {
        // 如果数据来自 asker，就存储，如果数据来自helper，就逐帧发送
        ajaxDataCache.set(data.items.ajaxCallbackId, {
            json: data.items.json,
            ajaxCallbackId: data.items.ajaxCallbackId,
            status: data.items.status
        });
    }

    if (helperUid === fromUid) {
        var doneId = data.items.doneId;
        sniff(ajaxDataCache, doneId, 5, function () {

            (0, _emitter2.default)(0x09, {
                status: ajaxDataCache.get(doneId).status,
                json: ajaxDataCache.get(doneId).json,
                ajaxCallbackId: ajaxDataCache.get(doneId).ajaxCallbackId
            }, clients[helperUid]);

            // 发送完毕之后，清理；
            ajaxDataCache.delete(doneId);
        });
    }
};

var _socketStorage = __webpack_require__(0);

var _socketStorage2 = _interopRequireDefault(_socketStorage);

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Andy on 2018/1/10.
 */
var ajaxDataCache = new Map();

function sniff(ajaxDataCache, doneId, times, callback) {

    if (times <= 0) {
        console.log("callbackId 未能及时上传~");
        return;
    }

    var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            var result = ajaxDataCache.get(doneId);
            result ? resolve(result) : reject(result);
        }, 500);
    });

    promise.then(callback, function () {
        sniff(ajaxDataCache, doneId, --times, callback);
    });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (socket, data) {
    var clients = _socketStorage2.default.getStorage("clients");
    var helperUid = data.remoteUid.helperUid;
    var askerUid = data.remoteUid.askerUid;
    var fromUid = data.uid;

    if (helperUid === fromUid) {
        (0, _emitter2.default)(0x0A, data.items, clients[askerUid]);
    }
};

var _socketStorage = __webpack_require__(0);

var _socketStorage2 = _interopRequireDefault(_socketStorage);

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (e, socket) {
    var original = e.toString().match(/Sec-WebSocket-Key: (.+)/)[1];
    var key = _crypto2.default.createHash("sha1").update(original + mask).digest("base64");
    socket.write("HTTP/1.1 101 Switching Protocols\r\n");
    socket.write("Upgrade:Websocket\r\n");
    socket.write("Connection:Upgrade\r\n");
    socket.write("Sec-WebSocket-Accept:" + key + "\r\n");
    socket.write("\r\n");
};

var _socketStorage = __webpack_require__(0);

var _socketStorage2 = _interopRequireDefault(_socketStorage);

var _crypto = __webpack_require__(29);

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Andy on 2017/11/6.
 */

var mask = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

//单个用户的握手实例;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ })
/******/ ]);