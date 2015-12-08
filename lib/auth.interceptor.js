(function() {
  'use strict';

  angular
    .module('olivejs')
    .service('authInterceptor', AuthInterceptor);

  /** @ngInject */
  function AuthInterceptor($log, $q, AuthService) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        var accessToken = AuthService.getAccessToken();
        if (config.url.indexOf('api') && accessToken) {
          config.headers.Authorization = accessToken;
        }
        return config;
      },
      response: function (response) {
        if (response.status === 401) {

          // handle the case where the user is not authenticated
        }
        $log.info(response)
        return response || $q.when(response);
      }
    };
  }
})();
