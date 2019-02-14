/* eslint-disable no-empty-function */
/* eslint-disable wrap-iife */
(function() {
  const data = {};
  const directives = {};
  const update = [];

  const smallAngular = {
    get data() {
      return data;
    },

    directive(key, cb) {
      if (directives[key]) {
        directives[key].push(cb);
        return;
      }

      directives[key] = [cb];
    },

    compile(node) {
      if (!(node instanceof HTMLElement)) {
        throw new Error('Diidko');
      }

      const atribs = node.getAttributeNames();

      atribs.forEach(atr => {
        if (directives[atr]) {
          const value = node.getAttribute(atr);
          directives[atr].forEach(cb => cb(node, atr, value));
        }
      });
    },

    bootstrap(node) {
      let appNode = node;

      if (!node) {
        appNode = document.querySelector('[ng-app]');
      }

      const childNodes = appNode.querySelectorAll('*');
      childNodes.forEach(el => {
        this.saveForModel(el);
        this.compile(el);
      });
    },

    saveForModel(element) {
      const res = (/(?<={{).*(?=}})/).exec(element.innerText);

      if (res) {
        update.push({ name: [res[0]], element });
      }
    },

    updateElements() {
      update.forEach(({ name, element }) => (element.innerText = data['ng-app'][name]));
    }
  };

  smallAngular.directive('ng-model', function(el, key, value) {
    if (!data['ng-app']) {
      data['ng-app'] = {};
    }
    data['ng-app'][value] = null;
    el.value = data['ng-app'][value];

    el.oninput = event => {
      data['ng-app'][value] = event.target.value;
      smallAngular.updateElements();
    };
  });

  smallAngular.bootstrap();

  smallAngular.directive('ng-click', function(el) {});
  smallAngular.directive('ng-show', function(el) {});
  smallAngular.directive('ng-hide', function(el) {});
  smallAngular.directive('ng-uppercase', function(el) {});

  window.smallAngular = smallAngular;
})();