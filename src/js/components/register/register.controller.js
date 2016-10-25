(function() {

  'use strict';

  angular
    .module('myApp.components.register', [])
    .controller('registerController', registerController);

  registerController.$inject = ['$scope', 'membersService'];

  function registerController($scope) {
    /*jshint validthis: true */
    this.greeting = 'hi there'
    console.log('hit');
  }

})();
