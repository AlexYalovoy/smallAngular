/* eslint-disable no-empty-function */
/* eslint-disable wrap-iife */
(function() {
  const data = {};
  const scope = window;
  const watchers = [];
  const directives = {};
  const update = [];

  scope.$watch = watcher => watchers.push(watcher);
  scope.$apply = () => watchers.forEach(cb => cb());
  scope.test = true;

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
      const atribs = node.getAttributeNames();
      const restAtrs = atribs.reduce((acc, atr) => {
        if (!atr.includes('ng-')) {
          acc[atr] = node.getAttribute(atr);
        }
        return acc;
      }, {});

      atribs.forEach(atr => {
        if (directives[atr]) {
          const value = node.getAttribute(atr);
          directives[atr].forEach(cb => cb({ scope, node, value, restAtrs }));
        }
      });
    },

    bootstrap(node) {
      let appNode = node;

      if (!node) {
        appNode = document.querySelector('[ng-app]');
      }

      const childNodes = appNode.querySelectorAll('*');

      this.compile(appNode);
      childNodes.forEach(this.compile);
    }
  };

  smallAngular.directive('ng-model', function({ scope, node, value }) {
    node.value = eval(value);

    node.addEventListener('input', event => {
      scope[value] = event.target.value;
      scope.$apply();
    });
    scope.$watch(() => (node.value = eval(value)));
  });

  smallAngular.directive('ng-show', function({ scope, node, value }) {
    node.style.display = eval(value) ? 'block' : 'none';
    scope.$watch(() => (node.style.display = eval(value) ? 'block' : 'none'));
    scope.$apply();
  });

  smallAngular.directive('ng-bind', function({ scope, node, value }) {
    scope.$watch(() => (node.innerText = eval(value)));
  });

  smallAngular.directive('ng-hide', function({ scope, node, value }) {
    node.style.display = eval(value) ? 'none' : 'block';
    scope.$watch(() => (node.style.display = eval(value) ? 'none' : 'block'));
  });

  smallAngular.directive('ng-click', function({ scope, node, value }) {
    node.addEventListener('click', () => {
      eval(value);
      scope.$apply();
    });
  });

  smallAngular.directive('ng-repeat', function({ scope, node, value }) {
    const iterable = eval(value.split('in')[1].trim());

    for (const i in iterable) {
      const newEl = node.cloneNode();
      newEl.innerText = iterable[i];

      const parent = node.parentNode;
      parent.insertBefore(newEl, node);
    }
    // node.parentNode.removeChild(node);

    scope.$watch(() => {
      const iterable = eval(value.split('in')[1].trim());

      for (const i in iterable) {
        const newEl = node.cloneNode();
        newEl.innerText = iterable[i];

        const parent = node.parentNode;
        parent.insertBefore(newEl, node);
      }
      // node.parentNode.removeChild(node);
    });
  });

  smallAngular.directive('ng-uppercase', function({ scope, node, value }) {
    node.style.textTransform = 'uppercase';
  });

  smallAngular.directive('ng-make-short', function({ scope, node, value, restAtrs }) {
    node.innerText = `${node.innerText.slice(0, restAtrs['length'] || 5)}...`;
  });

  smallAngular.directive('ng-random-color', function({ scope, node, value }) {
    const getRand = numb => Math.floor(Math.random() * (numb + 1));
    node.style.backgroundColor = `rgb(${getRand(255)}, ${getRand(255)}, ${getRand(255)})`;

    node.addEventListener('click', () => (node.style.backgroundColor =
      `rgb(${getRand(255)}, ${getRand(255)}, ${getRand(255)})`));
  });

  smallAngular.directive('ng-init', function({ scope, node, value }) {
    eval(value);
  });

  window.smallAngular = smallAngular;

  smallAngular.bootstrap();
})();