(() => {

  angular
  .module('myApp.services', [])
  .service('membersService', membersService)

  membersService.$inject = ['$http']

  function membersService($http) {
    this.getAll = function () {
      return $http.get('http://galvanize-student-apis.herokuapp.com/gdating/members')
    }
  }

})();
