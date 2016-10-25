(function() {

  'use strict';

  angular
    .module('myApp.components.main', [])
    .controller('mainController', mainController);

  mainController.$inject = ['$rootScope', 'membersService'];

  function mainController($rootScope, membersService) {
    /*jshint validthis: true */
    this.greeting = 'Hello World!';
    var vm = this
    vm.members = []
    membersService.getAll()
    .then(data => vm.members = data.data.data)

    $rootScope.$on('getMembers', function (event, data) {
      return data
    })
  }

})();
