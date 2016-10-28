(() => {

  angular
  .module('myApp.filters', [])
  .filter('getMyChat', getMyChat)


  function getMyChat() {
    return function (arr) {
      arr.forEach(function (item) {
        console.log(item);
      })
      return arr;
    }
  }


})();
