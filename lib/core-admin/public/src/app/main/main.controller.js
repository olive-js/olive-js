(function() {
  'use strict';

  angular
    .module('olivejs')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $mdSidenav, $mdBottomSheet, $q) {
    var vm = this;

    vm.toggleSideNav = toggleSideNav;
    vm.selectMenuItem = selectMenuItem;

    function selectMenuItem(menuItem){
      vm.selectedItem = menuItem;
    }

    function toggleSideNav(){
      $mdSidenav('left')
         .toggle();
    }

    /*function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }*/

    vm.menuItems = [
      {
        link : '',
        title: 'Usuarios',
        icon: 'group'
      },
      {
        link : '',
        title: 'Configuracion',
        icon: 'dashboard'
      }
    ];
    vm.admin = [
      {
        link : '',
        title: 'Trash',
        icon: 'delete'
      },
      {
        link : 'showListBottomSheet($event)',
        title: 'Settings',
        icon: 'settings'
      }
    ];
    vm.activity = [
        {
          what: 'Brunch this weekend?',
          who: 'Ali Conners',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        },
        {
          what: 'Summer BBQ',
          who: 'to Alex, Scott, Jennifer',
          when: '3:08PM',
          notes: "Wish I could come out but I'm out of town this weekend"
        },
        {
          what: 'Oui Oui',
          who: 'Sandra Adams',
          when: '3:08PM',
          notes: "Do you have Paris recommendations? Have you ever been?"
        },
        {
          what: 'Birthday Gift',
          who: 'Trevor Hansen',
          when: '3:08PM',
          notes: "Have any ideas of what we should get Heidi for her birthday?"
        },
        {
          what: 'Recipe to try',
          who: 'Brian Holt',
          when: '3:08PM',
          notes: "We should eat this: Grapefruit, Squash, Corn, and Tomatillo tacos"
        }
      ];
  }
})();
