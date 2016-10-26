// sample angular code

(function() {

  'use strict';

  angular
    .module('myApp', [
      'ui.router',
      'myApp.config',
      'myApp.services',
      'myApp.directives',
      'myApp.filters',
      'myApp.components.main',
      'myApp.components.register',
      'myApp.components.login',
      'myApp.components.members',
      'myApp.components.profile'
    ])
    .run(function ($http, $rootScope) {
      $http.get('http://galvanize-student-apis.herokuapp.com/gdating/members')
      .then(data => {
        $rootScope.members = data.data.data.splice(0, 500)
      }).catch(console.log)
      $http.get('http://galvanize-student-apis.herokuapp.com/gdating/members/' + localStorage.getItem('user'))
      .then(data => $rootScope.user = data.data.data)
      .catch(console.log)
    })

})();
