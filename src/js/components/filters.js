(() => {

  angular
  .module('myApp.filters', [])
  .filter('sort', sortFun)
  function sortFun() {
    return function (arr, str) {
      switch (str) {
        case 'all':
          return arr;
          break;
        case 'near':
          return arr;
          break;
        case 'matches':
          return arr;
          break;
        case 'popular':
          return arr.filter(person => person._matches.length > 4);
          break;
        case 'chat':
          return arr;
          break;
        default:
          return arr;
          break;
      }
    }
  }


})();
