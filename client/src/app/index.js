import angular from "angular";
import uiRouter from "angular-ui-router";
//import RMTDistributor from "RMTDistributor";
import $ from "jquery";
import services from "./services/services.export.js";
import wsClient from "./webSocket.client.io/ws.client.export.js";
import pages from "./pages/exports.js";
import components from "./components/exports.js";

angular.module("myApp", [uiRouter,components.name, pages.name, services.name, wsClient.name])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("home");
    }).run(function($state,$rootScope,userStorage){
        //console.log(RMTDistributor);
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            //RMT.uiRouter($state,toState.url,toParams);

            // 禁止 求助者控制操作
            if(userStorage.getStorage("remoteId") === 1){
                $("section").ready(function(){
                    $("section").css("pointerEvents","none");
                });
                $("footer").ready(function(){
                    $("footer").css("pointerEvents","none");
                });
            }

            console.log(event, toState, toParams, fromState, fromParams);
        });
    });
