(() => {

  angular
  .module('myApp.directives', [])
  .directive('newMember', newMember)
  // .directive('paginate', paginate)

  newMember.$inject = []
  function newMember() {
    controller.$inject = []
    function controller() {
      var vm = this;
    }

    return {
      controller: controller,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        member: '='
      },
      templateUrl: 'js/components/members/member.html'
    }
  }

  function paginate() {
    function pagController() {

    }
  }

})();
