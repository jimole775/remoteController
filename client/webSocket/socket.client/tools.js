/**
 * Created by Andy on 2017/3/26.
 */
(function(){

    var nativeName = "";
    var oppositeName = "";
    var helperName = "";
    var askerName = "";
    WebSocket.prototype.tool = {
        decodeBlob: function (data, callback) {
            if (data instanceof Blob) {
                var reader = new FileReader();
                reader.readAsText(data, "utf8");
                reader.onload = function (e) {
                    var result = /^[\{\[]/.test(reader.result.substr(0, 1)) ? JSON.parse(reader.result) : reader.result;
                    callback(result);
                };
            }
            else {
                var result = /^[\{\[]/.test(data.substr(0, 1)) ? JSON.parse(data) : data;
                callback(result);
            }
        },
        getOppositeName: function (name) {
            return name ? oppositeName = name : oppositeName;
        },

        getUserName: function (name) {
            return name ? nativeName = name : nativeName;
        },
        getHelperName: function (name) {
            return name ? helperName = name : helperName;
        },
        getAskerName: function (name) {
            return name ? askerName = name : askerName;
        }

    };

})();