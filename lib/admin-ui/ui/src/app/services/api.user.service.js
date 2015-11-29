(function() {
  'use strict';

  angular
    .module('olivejs')
    .service('ApiUserService', ApiUserService);

  /** @ngInject */
  function ApiUserService($log, $resource, CORE_API_PATH) {
    var userResource = $resource(CORE_API_PATH + '/users');

    this.getAll = function() {

      /*var postUsers = $http.get('http://jsonplaceholder.typicode.com/users/')
      postUsers.then(function(result) {
          $scope.users = result.data;
      });

      $log.log(CORE_API_PATH);
      */
      return [{username : 'gaston', email: 'pepe'}];
      //return userResource.query();
    }
  }
})();
