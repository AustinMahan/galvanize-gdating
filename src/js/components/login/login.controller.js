(function() {

  'use strict';

  angular
    .module('myApp.components.login', [])
    .controller('loginController', loginController);

  loginController.$inject = ['membersService', '$location', '$rootScope', '$timeout'];

  function loginController(membersService, $location, $rootScope, $timeout) {
    /*jshint validthis: true */
    var vm = this;
    vm.logForm = {}

    vm.login = function () {
      membersService.login(vm.logForm)
      .then(membersService.getChat)
      .then(data => {
        $rootScope.user = data.data.data.user
        localStorage.setItem('token', data.data.data.token)
        localStorage.setItem('user', data.data.data.user._id)
        $location.path('/members')
      })
      .catch(data => {
        console.log(data);
        vm.error = true
        $timeout(function () {
          vm.error = false
        }, 5000)
      })
    }
  }

})();
