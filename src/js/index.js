/* eslint-disable wrap-iife */
/* eslint-disable no-eval */
/* eslint-disable no-implied-eval */
(function() {
  const scope = window;
  const watchers = [];
  const directives = {};

  scope.$watch = (checker, watcher) => watchers.push({ checker, watcher });
  scope.$apply = () => {
    watchers.forEach(el => el.watcher());
  };

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
      const restAtrs = atribs.reduce((acc, atr) => {
        if (!atr.includes('ng-')) {
          acc[atr] = node.getAttribute(atr);
        }
        return acc;
      }, {});

      atribs.forEach(atr => {
        if (directives[atr]) {
          directives[atr].forEach(cb => cb(scope, node, restAtrs));
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

  smallAngular.directive('ng-model', function(scope, node) {
    const value = node.getAttribute('ng-model');
    node.value = eval(value);

    node.addEventListener('input', event => {
      scope[value] = event.target.value;
      scope.$apply();
    });
    scope.$watch(value, () => (node.value = eval(value)));
  });

  smallAngular.directive('ng-show', function(scope, node) {
    const value = node.getAttribute('ng-show');
    node.style.display = eval(value) ? 'block' : 'none';
    scope.$watch(() => eval(value), () => {
      node.style.display = eval(value) ? 'block' : 'none';
    });
  });

  smallAngular.directive('ng-bind', function(scope, node) {
    const value = node.getAttribute('ng-bind');
    scope.$watch(() => eval(value), () => (node.innerText = eval(value)));
  });

  smallAngular.directive('ng-hide', function(scope, node) {
    const value = node.getAttribute('ng-hide');
    node.style.display = eval(value) ? 'none' : 'block';
    scope.$watch(() => eval(value), () => {
      node.style.display = eval(value) ? 'none' : 'block';
    });
  });

  smallAngular.directive('ng-click', function(scope, node) {
    const value = node.getAttribute('ng-click');
    node.addEventListener('click', () => {
      eval(value);
      scope.$apply();
    });
  });

  smallAngular.directive('ng-repeat', function(scope, node) {
    function appendFromIterable(node, iterable) {
      const currEl = node.nextSibling;
      node.innerText = iterable[0] || '';

      for (let i = 1; i < iterable.length; i++) {
        const newEl = node.cloneNode(false);
        newEl.innerText = iterable[i];
        node.parentNode.insertBefore(newEl, currEl);
      }
    }

    const variableName = node.getAttribute('ng-repeat').split('in')[1].trim();
    const iterable = eval(variableName);
    const endEl = node.nextSibling;
    appendFromIterable(node, iterable);

    scope.$watch(() => eval(variableName), () => {
      const iterable = eval(variableName);
      let currEl = node.nextSibling;

      // delete repeated elements
      while (currEl !== endEl) {
        node.parentNode.removeChild(currEl);
        currEl = node.nextSibling;
      }

      // and add new elements
      appendFromIterable(node, iterable);
    });
  });

  smallAngular.directive('ng-uppercase', function(scope, node) {
    node.style.textTransform = 'uppercase';
  });

  smallAngular.directive('ng-make-short', function(scope, node, restAtrs) {
    const preparedText = node.innerText.slice(0, restAtrs.length || 5);
    node.innerText = `${preparedText}...`;
  });

  smallAngular.directive('ng-random-color', function(scope, node) {
    const getRandCol = () => Math.floor(Math.random() * 256);
    node.style.backgroundColor = `rgb(${getRandCol()}, ${getRandCol()}, ${getRandCol()})`;

    node.addEventListener('click', () => {
      node.style.backgroundColor = `rgb(${getRandCol()}, ${getRandCol()}, ${getRandCol()})`;
    });
  });

  smallAngular.directive('ng-init', function(scope, node) {
    const value = node.getAttribute('ng-init');
    eval(value);
  });

  window.smallAngular = smallAngular;
})();