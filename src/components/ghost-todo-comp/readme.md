# ghost-todo-comp



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type     | Default     |
| ----------- | ------------ | ----------- | -------- | ----------- |
| `initTodos` | `init-todos` |             | `string` | `undefined` |


## Events

| Event        | Description | Type                      |
| ------------ | ----------- | ------------------------- |
| `todoChange` |             | `CustomEvent<TodoItem[]>` |


## Dependencies

### Depends on

- [ghost-todo-item-comp](../ghost-todo-item-comp)
- [ghost-todo-form-comp](../ghost-todo-form-comp)

### Graph
```mermaid
graph TD;
  ghost-todo-comp --> ghost-todo-item-comp
  ghost-todo-comp --> ghost-todo-form-comp
  style ghost-todo-comp fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
