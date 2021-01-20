# Demo web component made in StencilJS


## Installing

```console
$ npm install ghost-todo-stenciljs-webcomponent
```

## Import in javascript module using a bundler

```javascript
import {defineCustomElements} from "ghost-todo-stenciljs-webcomponent";
defineCustomElements();
```

## Import in javascript module not using a bundler

```javascript
import "./node_modules/ghost-todo-stenciljs-webcomponent/dist/ghost-todo/ghost-todo.esm.js";
```

## Insert Web component in HTML

```html
<ghost-todo-comp init-todos="Todo item 1, Todo item 2"></ghost-todo-comp>
```