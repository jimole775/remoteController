import angular from "angular";
import uiRouter from "angular-ui-router";

import pages from "./pages/exports.js";
import components from "./components/components.js";
import RMT from "RMT";

angular.module("myApp", [uiRouter,components.name, pages.name])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("home");
    }).run(function($state,$rootScope){
        console.log(RMT);
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            //RMT.uiRouter($state,toState.url,toParams);
            console.log(event, toState, toParams, fromState, fromParams);
        });
    });