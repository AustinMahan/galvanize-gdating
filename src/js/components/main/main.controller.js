(function() {

  'use strict';

  angular
    .module('myApp.components.main', [])
    .controller('mainController', mainController);

  mainController.$inject = ['$scope', 'membersService'];

  function mainController($scope, membersService) {
    /*jshint validthis: true */
    this.greeting = 'Hello World!';
    var vm = this
    vm.members = []
    membersService.getAll()
    .then(data => vm.members = data.data.data)
  }

})();
