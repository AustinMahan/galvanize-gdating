(() => {

  angular
  .module('myApp.services', [])
  .service('membersService', membersService)

  membersService.$inject = ['$http', '$rootScope', '$q']

  function membersService($http, $rootScope, $q) {
    $rootScope.$on('logout', function (event) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      $rootScope.user = ''
    })
    this.getAll = function () {
      return $http.get('http://galvanize-student-apis.herokuapp.com/gdating/members')
    }

    this.login = function (data) {
      return $http.post('http://galvanize-student-apis.herokuapp.com/gdating/auth/login', {email: data.email, password: data.password})
    }
    this.getChat = function (data) {
      return $http.get('https://galvanize-student-apis.herokuapp.com/gdating/members/' + data.data.data.user._id + '/matches')
      .then(things => {
        data.data.data.user.chatting = things.data.data
        return data
      })
    }

    this.sort = function (arr, str) {
      switch (str) {
        case 'all':
          return $q.resolve($rootScope.members);
          break;
        case 'near':
          return $q.resolve(arr);
          break;
        case 'matches':
          var members = []
          var promise = $rootScope.user._matches.map(function (matchId) {
            return $http.get('https://galvanize-student-apis.herokuapp.com/gdating/members/' + matchId)
            .then(data => data.data.data)
          })
          return $q.all(promise)
          // return Promise.all(promise).then(data => console.log(data));
          break;
        case 'popular':
          return $q.resolve(arr.filter(person => person._matches.length > 4));
          break;
        case 'chat':
          return $q.resolve(arr);
          break;
        case 'search':
          return $q.resolve(arr);
          break;
        default:
          return arr;
          break;
      }
    }

    this.search = function (arr, {searchUsername, searchEmail, searchGender}) {
      if(searchUsername.length > 0) {
        var arr = arr.filter(person => person.username.indexOf(searchUsername) > -1)
      }
      if(searchEmail.length > 0) {
        var arr = arr.filter(person => person.email.indexOf(searchEmail) > -1)
      }
      if(searchGender > -1) {
        var arr = arr.filter(person => person.gender == searchGender)
      }
      return arr
    }

    this.register = function (data) {
      var payload = {
        username: data.username,
        address:{
          geo: {
          lat: 100,
          lng: 50
          }
        },
        dob: data.dob,
        password: data.password,
        names: {
          firstName: data.firstName,
          lastName: data.lastName
        },
        city: data.city,
        description: data.description,
        email: data.email,
        phone: data.phone,
        slug: data.username + data.password
      }
      return $http.post('http://galvanize-student-apis.herokuapp.com/gdating/auth/register', payload)
    }
  }

})();
