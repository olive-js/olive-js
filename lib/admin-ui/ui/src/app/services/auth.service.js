(function() {
  'use strict';

  angular
    .module('olivejs')
    .service('AuthService', AuthService);

  /** @ngInject */
  function AuthService($log, $resource,store, $q, CORE_API_PATH) {
    var userResource = $resource(CORE_API_PATH + '/token');

    this.login = function(user, password) {


      generateRefreshToken()
        .then(function(refreshToken) {
          store.set('refreshToken', refreshToken);

          $http({
            url: CORE_API_PATH + '/tokens/access',
            method: 'POST',
            headers: {
               'Authorization': refreshToken
            }
          }).then(function(response) {

            $log.info('Access TOKEN: ' + response.data.token);
            store.set('accessToken', response.data.token);
            $state.go('main');
          }, function(error) {
            $log.error(error);
          });

      })
      .catch(function(err) {
          alert(err.data);
      });

    }
    function generateRefreshToken(){
      var defered = $q.defer();
      var promise = defered.promise;

      $http.post(CORE_API_PATH + '/tokens/refresh',{
        username: vm.userName,
        password: vm.password
      })
          .success(function(data) {
              $log.info('Refresh TOKEN: ' + data.token);
              defered.resolve(data.token);
          })
          .error(function(err) {
              defered.reject(err)
          });

      return promise;
    }


  }
})();
