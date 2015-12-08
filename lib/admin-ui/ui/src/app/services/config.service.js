(function() {
  'use strict';

  angular
    .module('olivejs')
    .service('ConfigService', ConfigService);

  /** @ngInject */
  function ConfigService() {
    var config;

    this.init = function(config){
      this.config = config
    }

    this.get = function(key){
      return this.config[key];
    }
  }
})();
