(function() {

  'use strict';

  angular
    .module('myApp.components.login', [])
    .controller('loginController', loginController);

  loginController.$inject = ['membersService', '$location', '$rootScope'];

  function loginController(membersService, $location, $rootScope) {
    /*jshint validthis: true */
    var vm = this;
    vm.logForm = {}

    vm.login = function () {
      membersService.login(vm.logForm)
      .then(membersService.getChat)
      .then(data => {
        $rootScope.user = data.data.data.user
        localStorage.setItem('token', data.data.data.token)
        console.log(data.data.data);
        localStorage.setItem('user', data.data.data.user._id)
        $location.path('/members')
      })
      .catch(console.log)
    }
  }

})();
