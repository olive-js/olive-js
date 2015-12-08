(function() {
  'use strict';

  angular
    .module('olivejs')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, AuthService) {
    var vm = this;

    vm.user = {};
    vm.userName;
    vm.password;
    vm.login = login;
    vm.errorMessage = false;

    function login() {
      AuthService.login(vm.userName, vm.password);
      //$state.go('main');
    }
  }
})();
