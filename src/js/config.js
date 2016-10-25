(function() {

  'use strict';

  angular
    .module('myApp.config', [])
    .config(appConfig);

    function appConfig($stateProvider, $urlRouterProvider) {
      var homeState = {
        name: 'home',
        url: '/',
        templateUrl: 'js/components/main/main.view.html',
        controller: 'mainController',
        controllerAs: 'mainCtrl',
        access: true
      }
      var registerState = {
        name: 'register',
        url: '/register',
        templateUrl: 'js/components/register/register.view.html',
        controller: 'registerController',
        controllerAs: 'registerCtrl',
        access: true
      }
      $urlRouterProvider.otherwise('/')

      $stateProvider.state(homeState)
      $stateProvider.state(registerState)
    }

})();
