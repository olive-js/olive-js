(function() {
  'use strict';

  angular
    .module('olivejs')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
