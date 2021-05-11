/**
 * Created by Andy on 2017/3/26.
 */

export default function (data, callback) {
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
};