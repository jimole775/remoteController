/**
 * Created by Andy on 2017/12/22.
 */

export default function(data){
    let queryData = data;
    if(typeof data === "object"){
        queryData = JSON.stringify(data)
    }
    return new Blob([queryData], {type: "text/plain"});
}