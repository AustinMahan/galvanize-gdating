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
      var loginState = {
        name: 'login',
        url: '/login',
        templateUrl: 'js/components/login/login.view.html',
        controller: 'loginController',
        controllerAs: 'loginCtrl',
        access: true
      }
      $urlRouterProvider.otherwise('/')

      $stateProvider.state(homeState)
      $stateProvider.state(registerState)
      $stateProvider.state(loginState)
    }

})();
