/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('olivejs')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('CORE_API_PATH', 'http://localhost:3000/admin/api');

})();
