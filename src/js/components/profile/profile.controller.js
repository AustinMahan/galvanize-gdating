(function() {

  'use strict';

  angular
    .module('myApp.components.profile', [])
    .controller('profileController', profileController);

  profileController.$inject = ['$rootScope', 'membersService', '$timeout'];

  function profileController($rootScope, membersService, $timeout) {
    /*jshint validthis: true */
    this.greeting = 'Hello World!';
    var vm = this
    vm.form = {names: {}, address:{geo:{}}, company:{}}
    vm.members = []
    vm.success = false
    $rootScope.$watch('members', function () {
      vm.members = $rootScope.members
    })

    vm.editForm = function () {
      membersService.edit(vm.form, $rootScope.user._id)
      .then(() => {
        vm.success = true
        $timeout(function () {
          vm.success = false
        }, 5000)
      })
      .catch(console.log)
    }
  }

})();
