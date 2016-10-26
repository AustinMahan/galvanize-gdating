(() => {

  angular
  .module('myApp.services', [])
  .service('membersService', membersService)

  membersService.$inject = ['$http']

  function membersService($http) {
    this.getAll = function () {
      return $http.get('http://galvanize-student-apis.herokuapp.com/gdating/members')
    }

    this.login = function (data) {
      return $http.post('http://galvanize-student-apis.herokuapp.com/gdating/auth/login', {email: data.email, password: data.password})
    }

    this.register = function (data) {
      var payload = {
        username: data.username,
        geo: {
          lat: 100,
          lng: 50
        },
        password: data.password,
        names: {
          firstName: data.firstName,
          lastName: data.lastName
        },
        city: data.city,
        description: data.description,
        email: data.email,
        phone: data.phone
      }
      return $http.post('http://galvanize-student-apis.herokuapp.com/gdating/auth/register', {member: payload})
    }
  }

})();
