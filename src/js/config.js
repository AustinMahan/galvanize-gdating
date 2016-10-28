(function() {

  'use strict';

  angular
    .module('myApp.config', [])
    .config(appConfig)
    .run(routeStart)

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
      var membersState = {
        name: 'members',
        url: '/members',
        templateUrl: 'js/components/members/members.view.html',
        controller: 'membersController',
        controllerAs: 'membersCtrl',
        access: false
      }
      var profileState = {
        name: 'profile',
        url: '/profile',
        templateUrl: 'js/components/profile/profile.view.html',
        controller: 'profileController',
        controllerAs: 'profileCtrl',
        access: false
      }
      $urlRouterProvider.otherwise('/')

      $stateProvider.state(homeState)
      $stateProvider.state(registerState)
      $stateProvider.state(loginState)
      $stateProvider.state(membersState)
      $stateProvider.state(profileState)
    }

})();

function routeStart($rootScope, $location) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if(!toState.access && !localStorage.getItem('token')) {
      $location.path('/')
    }
  })
}
