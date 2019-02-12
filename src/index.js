/* eslint-disable no-empty-function */
/* eslint-disable wrap-iife */
(function() {
  const directives = {};

  const smallAngular = {
    directive(key, cb) {
      if (directives[key]) {
        directives[key].push(cb);
        return;
      }

      directives[key] = [cb];
    },
    compile(node) {
      const atribs = node.getAttributeNames();

      atribs.forEach(atr => {
        if (directives[atr]) {
          directives[atr](node);
        }
      });
    },
    bootstrap(node) {
      let appNode = node;

      if (!node) {
        appNode = document.querySelector('*[ng-app]');
      }

      const childNodes = appNode.querySelectorAll('*');
      childNodes.forEach(el => {
        this.compile(el);
      });
    }
  };

  smallAngular.directive('ng-model', function(el) {});
  smallAngular.directive('ng-click', function(el) {});
  smallAngular.directive('ng-show', function(el) {});
  smallAngular.directive('ng-hide', function(el) {});
  smallAngular.directive('ng-uppercase', function(el) {});

  window.smallAngular = smallAngular;
})();