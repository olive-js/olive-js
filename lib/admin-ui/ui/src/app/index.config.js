(function() {
  'use strict';

  angular
    .module('olivejs')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $mdThemingProvider, $httpProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;



    $mdThemingProvider.theme('default')
      .primaryPalette('teal');
        //.accentPalette('orange');

    //TODO extract to interceptor file
    $httpProvider.interceptors.push(function($log, $q, store) {
        return {
          request: function (config) {
            config.headers = config.headers || {};
            var accessToken = store.get('accessToken');
              $log.info("using token:", accessToken);
            if (config.url.indexOf('api') && !config.url.indexOf('tokens') && accessToken) {
              config.headers.Authorization = accessToken;
            }
            return config;
          },
          response: function (response) {
            $log.info("There was a 401 error");
            if (response.status === 401) {
              $log.info("There was a 401 error");
              // handle the case where the user is not authenticated
            }
            $log.info(response)
            return response || $q.when(response);
          }
        };
    });



  }

})();
