(() => {

  angular
  .module('myApp.services', [])
  .service('membersService', membersService)
  .service('socketService', socketService)

  socketService.$inject = ['$http', '$rootScope']

  function socketService($http, $rootScope) {
    var vm = this
    var socket = io('http://galvanize-student-apis.herokuapp.com/');
    socket.on('gdating.messages', function (data) {
      if (data._members.indexOf($rootScope.user._id) > -1) {
        $rootScope.user.chatting = [data]
      }
      vm.getChats($rootScope.user._id)
      .then(data => {
         data.data.data.forEach(item => {
          if (item._members.indexOf($rootScope.chatMember) > -1 && item._members.indexOf($rootScope.chatMember) > -1) {
            $rootScope.$emit('newChat', item.messages)
          }
        })
      })
    });

    vm.sendMessage = function (text, memberId, id) {
      var payload = {
        _recipient: memberId,
        content: text
      }
      return $http.post('https://galvanize-student-apis.herokuapp.com/gdating/members/' + id + '/conversations', payload)
    }

    vm.getChats = function (id) {
      return $http.get('https://galvanize-student-apis.herokuapp.com/gdating/members/' + id + '/conversations')
    }
  }



  membersService.$inject = ['$http', '$rootScope', '$q', '$location']

  function membersService($http, $rootScope, $q, $location) {
    $rootScope.$on('logout', function (event) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      $rootScope.user = ''
      $location.path('/')
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

    this.edit = function (data, id) {
      var payload = {
        username: data.username || $rootScope.user.username,
        address:{
          geo: {
          lat: data.address.geo.lat || 100,
          lng: data.address.geo.lng || 50
          }
        },
        dob: data.dob || $rootScope.user.dob,
        password: data.password || $rootScope.user.password,
        names: {
          firstName: data.names.firstName || $rootScope.user.names.firstName,
          lastName: data.names.lastName || $rootScope.user.names.lastName
        },
        city: data.city || $rootScope.user.city,
        description: data.description || $rootScope.user.description,
        email: data.email || $rootScope.user.email,
        phone: data.phone || $rootScope.user.phone,
      }
      return $http.put('https://galvanize-student-apis.herokuapp.com/gdating/members/' + id, payload)
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
          var $user = $rootScope.user
          var stuff = $user.chatting.map(convo => convo._members.filter(user => user !== $user._id))
          .reduce((a, b) => a.concat(b), [])
          .map(id => {
            return $http.get('https://galvanize-student-apis.herokuapp.com/gdating/members/' + id)
            .then(data => data.data.data)
          })
          return $q.all(stuff);
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
