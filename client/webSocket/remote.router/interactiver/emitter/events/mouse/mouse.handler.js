
/**
 * Created by Andy on 2017/10/31.
 */

let mouseEventHandler = function(fnName,params){
    let [success,result] = [false,null];
    let mouseEvent ={};
    mouseEvent.index = -1;
    mouseEvent.type = "none";
    mouseEvent.coord = {};
    mouseEvent.coord.X = 0;
    mouseEvent.coord.Y = 0;


    return [success,result];
};

mouseEventHandler.reset = function(target){
    target.index = -1;
    target.type = "none";
    target.coord = {};
    target.coord.X = 0;
    target.coord.Y = 0;

    return target;
};


export default mouseEventHandler;


