(function() {
  'use strict';

  angular
    .module('olivejs')
    .service('AuthService', AuthService);

  /** @ngInject */
  function AuthService($http, $log, $resource,store, $q, jwtHelper, CORE_API_PATH) {

    this.login = function(userName, password) {
      var deferred = $q.defer();



      generateRefreshToken(userName, password)
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
            var tokenPayload = jwtHelper.decodeToken(response.data.token);
            $log.info(tokenPayload);

            deferred.resolve(true);

          }, function(error) {
            $log.error(error);
            deferred.reject(error);
          });

      })
      .catch(function(err) {
          deferred.reject(err);
      });

      return deferred.promise;

    }
    function generateRefreshToken(userName, password){
      var defered = $q.defer();
      var promise = defered.promise;


      $http.post(CORE_API_PATH + '/tokens/refresh', {
          'username': userName,
          'password': password
        }
      )
          .success(function(data) {
              $log.info('Refresh TOKEN: ' + data.token);

              var tokenPayload = jwtHelper.decodeToken(data.token);
              $log.info(tokenPayload);
              defered.resolve(data.token);
          })
          .error(function(err) {
              defered.reject(err)
          });

      return promise;
    }


  }
})();
