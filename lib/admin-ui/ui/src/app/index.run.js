(function() {
  'use strict';

  angular
    .module('olivejs')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope,$log, $http, ConfigService) {




     $http.get('config/constants.json').
     success(function(data, status, headers, config) {
       //alert('config'+ data.name);

       //angular
      //   .module('olivejs').constant('appConfig', data);
       //$rootScope.config = data;
       ConfigService.init(data)
       //$rootScope.$broadcast('config-loaded');

       //CORE_API_PATH
     }).
     error(function(data, status, headers, config) {
       // log error
       alert('error');
     });



    $log.debug('runBlock end');
  }

})();
