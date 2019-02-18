<h1>Small angularJs</h1>

<h2>Directives for using:</h2>

<ol>
<li>ng-init</li>
<li>ng-model</li>
<li>ng-bind</li>
<li>ng-show</li>
<li>ng-hide</li>
<li>ng-click</li>
<li>ng-repeat</li>
<li>ng-uppercase</li>
<li>ng-make-short</li>
<li>ng-random-color</li>
</ol>

<h2>How to add own directive:</h2>

There is directive method, that allows you to add your own directive:

```directive(directiveName, callback)```

After declaration your directive you can use it in HTML. And then callback will be invoked.

<h2>Existing directives:</h2>

<ul>
<li>
ng-init - set initial values at start of app:

```ng-init="name = 'alex'" ```
</li>
<li>
ng-model - bind some variable to input:

```ng-model="name" ```
</li>
<li>
ng-bind - bind element value to variable:

```ng-bind="name" ```
</li>
<li>
ng-show - set condition of showing  element:

```ng-show="true" ```
</li>
<li>
ng-hide - set condition of hiding  element:

```ng-hide="true" ```
</li>
<li>
ng-click - invoke code inside this attribute when click on element:

```ng-click="console.log(1)" ```
</li>
<li>
ng-repeat - repeate element with values from given variable:

```ng-repeat="l in name" ```
</li>
<li>
ng-uppercase - make element text be upper-case, attribute hasn't value:

```ng-uppercase```
</li>
<li>
ng-make-short - set length of element text, take length from length attribute:

```ng-make-short```
</li>
<li>
ng-random-color - make random background-color  when click on element:

```ng-random-color```
</li>
</ul>