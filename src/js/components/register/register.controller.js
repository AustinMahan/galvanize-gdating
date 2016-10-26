(function() {

  'use strict';

  angular
    .module('myApp.components.register', [])
    .controller('registerController', registerController);

  registerController.$inject = ['$scope', 'membersService'];

  function registerController($scope, membersService) {
    /*jshint validthis: true */
    var vm = this;
    vm.regForm = {}

    vm.register = function () {
      membersService.register(vm.regForm)
      .then(console.log)
      .catch(console.log)
    }
  }

})();
