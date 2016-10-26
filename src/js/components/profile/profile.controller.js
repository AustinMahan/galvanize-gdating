(function() {

  'use strict';

  angular
    .module('myApp.components.profile', [])
    .controller('profileController', profileController);

  profileController.$inject = ['$rootScope', 'membersService'];

  function profileController($rootScope, membersService) {
    /*jshint validthis: true */
    this.greeting = 'Hello World!';
    var vm = this
    vm.members = []
    $rootScope.$watch('members', function () {
      vm.members = $rootScope.members
    })
  }

})();
