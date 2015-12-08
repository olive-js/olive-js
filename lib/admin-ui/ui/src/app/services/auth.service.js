(function() {
  'use strict';

  angular
    .module('olivejs')
    .service('AuthService', AuthService);

  /** @ngInject */
  function AuthService($http, $log, $resource,store, $q, jwtHelper, ConfigService) {

    this.getAccessToken = function(){
      return store.get('accessToken');
    }

    this.login = function(userName, password) {

      var deferred = $q.defer();

      generateRefreshToken(userName, password)
        .then(function(refreshToken) {
          store.set('refreshToken', refreshToken);

          $http({
            url: ConfigService.get('CORE_API_PATH') + '/tokens/access',
            method: 'POST',
            headers: {
               'Authorization': refreshToken
            }
          }).then(function(response) {

            store.set('accessToken', response.data.token);
            var tokenPayload = jwtHelper.decodeToken(response.data.token);
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

      $http.post(ConfigService.get('CORE_API_PATH') + '/tokens/refresh', {
          'username': userName,
          'password': password
        }
      )
        .success(function(data) {
          var tokenPayload = jwtHelper.decodeToken(data.token);
          defered.resolve(data.token);
        })
        .error(function(err) {
          defered.reject(err)
        });

      return promise;
    }
  }
})();
