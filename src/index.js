/* eslint-disable no-empty-function */
/* eslint-disable wrap-iife */
(function() {
  const directives = [];

  const smallAngular = {
    directive() {

    },
    compile(node) {

    },
    bootstrap(node) {

    }
  };

  smallAngular.directive('ng-model', function(el) {});
  smallAngular.directive('ng-click', function(el) {});
  smallAngular.directive('ng-show', function(el) {});
  smallAngular.directive('ng-hide', function(el) {});

  window.smallAngular = smallAngular;
})();