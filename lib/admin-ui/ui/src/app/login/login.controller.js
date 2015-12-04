(function() {
  'use strict';

  angular
    .module('olivejs')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($http, store, $state, $q, $log, CORE_API_PATH) {
    var vm = this;

    vm.user = {};
    vm.userName;
    vm.password;
    vm.login = login;
    vm.errorMessage = false;

    function login() {


    }


  }
})();
