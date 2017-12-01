/**
 * Created by Andy on 2017/11/7.
 */
//var ws = require("./index111.js");
//var wss = new ws();
//
//console.log(wss.baz,wss.bar);
//var step = require("./module.js");
//import rg from "./step1";
//step();
//import Reg from "./main";

//import StorageRegister from "../lib/StorageRegister";
//let rgx = new StorageRegister({foo:"congr"});

//console.log(rg.getStorage("foo"));
//console.log(Reg.getStorage());
//console.log(rg.getStorage("foo"));


import ng from "angular";

//import footer from "../client/components/footFrame/footFrame.js";
//import header from "../client/components/headFrame/headFrame.js";
//console.log(header);
//ng.module("myApp",[]).controller("myCtrl",header);


require("./test.css");
require("./test1.css");
require("./test2.css");
var myApp = ng.module("myApp", []);
//myApp.directive("myFoot",footer);
require("SimulateSlider");
myApp.controller("myCtrl", function ($scope) {
    $scope.contrl = "wowss";
    $scope.modelKey = "modelVal";
    this.Rong = "require1 test~";
});

myApp.directive("require1",function(){
    return {
        restrict: 'EACM',
        //replace: true,
        scope: {},
        controller: function(){
            //this.Rong = "require1 test~";
            //scope.ctrlScope = "require1 controller work~";
        },
        /* link:function($scope){
            $scope.linkScope = "require1 work~";
        },*/
        template: "<div></div>"
    }
});
myApp.directive("require2",function(){
    return {
        restrict: 'EACM',
        //replace: true,
        require:"?^myCtrl",
        scope: {},
        link: function(scope,ele,attr,req){
            console.log(req.Rong);
        },
        template: "<div></div>"
    }
});

ng.bootstrap(function(){console.log("app is run~")});

//export default rg;
//console.log((new Reg).getAg());
