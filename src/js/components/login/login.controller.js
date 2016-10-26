(function() {

  'use strict';

  angular
    .module('myApp.components.login', [])
    .controller('loginController', loginController);

  loginController.$inject = ['$scope', 'membersService'];

  function loginController($scope, membersService) {
    /*jshint validthis: true */
    var vm = this;
    vm.logForm = {}

    vm.login = function () {
      membersService.login(vm.logForm)
      .then(data => {
        //add token to the local storage
      })
      .catch(console.log)
    }
  }

})();
