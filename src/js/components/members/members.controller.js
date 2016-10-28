(function() {

  'use strict';

  angular
    .module('myApp.components.members', [])
    .controller('membersController', membersController);

  membersController.$inject = ['$rootScope', 'membersService', 'socketService'];

  function membersController($rootScope, membersService, socketService) {
    /*jshint validthis: true */
    var vm = this;
    vm.filterBy = 'all'
    vm.members = []
    vm.curMembers = []
    vm.memDisplayed = {search: true}
    vm.pages = {numPages: 0, curPage: 0}

    $rootScope.$watch('members', function () {
      vm.members = $rootScope.members
      vm.pages.numPages = Math.ceil(vm.members.length / 6)
      getCurMems()
    })
    $rootScope.$on('newChat', function (event, data) {
      vm.thisChat = data
    })
    $rootScope.$on('search', function(event) {
      vm.memDisplayed = {search: true}
    })

    $rootScope.$watch('user', function () {
      socketService.getChats($rootScope.user._id)
      .then(data => $rootScope.user.chatting = data.data.data)
    })

    vm.searchUsername = ''
    vm.searchEmail = ''
    vm.searchGender = -1
    vm.searchAge = -1
    vm.search = function functionName() {
      vm.filterBy = 'search'
      vm.members = membersService.search($rootScope.members, {searchUsername: vm.searchUsername, searchEmail: vm.searchEmail, searchGender: vm.searchGender})
      vm.pages.numPages = Math.ceil(vm.members.length / 6)
      vm.curMembers = vm.members.slice(vm.pages.curPage * 6, vm.pages.curPage * 6 + 6)
    }
    $rootScope.chatMember = ''

    vm.displayMember = function (member) {
      $rootScope.chatMember = member._id
      vm.thisChat = $rootScope.user.chatting.filter(item => {
        return item._members.indexOf($rootScope.user._id) > -1 && item._members.indexOf(member._id) > -1
      })
      if (vm.thisChat.length) vm.thisChat = vm.thisChat[0].messages
      angular.element(vm).css('background-color', 'lightgrey');
      vm.memDisplayed = member
    }

    vm.addMessage = function (text, memberId) {
      socketService.sendMessage(text, memberId, $rootScope.user._id)
      .then(data => vm.thisChat = data.data.data.messages)
      .then(() => {
        socketService.getChats($rootScope.user._id)
        .then(data => $rootScope.user.chatting = data.data.data)
      })
      .catch(console.log)
    }

    vm.selectedIndex = 0;

    vm.itemClicked = function ($index) {
      vm.curMembers[vm.selectedIndex].active = true;
      vm.selectedIndex = $index;
      vm.curMembers[$index].active = false;
    };

    vm.nextPage = function () {
      if (vm.pages.curPage < vm.pages.numPages) {
        vm.pages.curPage += 1
        getCurMems()
      }
    }

    vm.lastPage = function () {
      vm.pages.curPage = vm.pages.numPages - 1
      getCurMems()
    }

    vm.firstPage = function () {
      vm.pages.curPage = 0
      getCurMems()
    }

    vm.prevPage = function () {
      if (vm.pages.curPage > 0) {
        vm.pages.curPage -= 1
        getCurMems()
      }
    }
    vm.changeMems = function () {
      membersService.sort(vm.members, vm.filterBy).then((value) => {
        vm.members = value
        vm.pages.numPages = Math.ceil(vm.members.length / 6)
        vm.curMembers = vm.members.slice(vm.pages.curPage * 6, vm.pages.curPage * 6 + 6)
      })
    }

    function getCurMems() {
      membersService.sort(vm.members, vm.filterBy).then((value) => {
        vm.members = value
        vm.pages.numPages = Math.ceil(vm.members.length / 6)
        vm.curMembers = vm.members.slice(vm.pages.curPage * 6, vm.pages.curPage * 6 + 6)
      })
    }
  }

})();
