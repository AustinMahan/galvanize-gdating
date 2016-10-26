(function() {

  'use strict';

  angular
    .module('myApp.components.register', [])
    .controller('registerController', registerController);

  registerController.$inject = ['membersService', '$location'];

  function registerController(membersService, $location) {
    /*jshint validthis: true */
    var vm = this;
    vm.regForm = {}

    vm.register = function () {
      membersService.register(vm.regForm)
      .then(data => {
        localStorage.setItem('token', data.data.data.token)
        localStorage.setItem('user', data.data.data.user._id)
        $location.path('/members')
      })
      .catch(console.log)
    }
  }

})();
