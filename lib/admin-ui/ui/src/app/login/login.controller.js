(function() {
  'use strict';

  angular
    .module('olivejs')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, $log, AuthService) {
    var vm = this;

    vm.user = {};
    vm.userName;
    vm.password;
    vm.login = login;
    vm.errorMessage = false;

    function login() {
      AuthService.login(vm.userName, vm.password)
        .then(function() {
          $state.go('main');
        })
        .catch(function(err) {
            vm.errorMessage = err.message;
            $log.info("Error generate", err);
        });
    }
  }
})();
