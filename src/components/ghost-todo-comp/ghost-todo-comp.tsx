import {
  Component,
  Host,
  h,
  Event,
  EventEmitter,
  Prop,
  Listen,
} from "@stencil/core";
import cuid from "cuid";
import { TodoItem } from "../../interfaces/todo_item.interface";
import todoStore from "../../stores/todo.store";

@Component({
  tag: "ghost-todo-comp",
  styleUrl: "ghost-todo-comp.scss",
  shadow: true,
})
export class GhostTodoComp {
  @Prop() initTodos: string;

  @Event() todoChange: EventEmitter<TodoItem[]>;

  @Listen("submitTodo")
  handleSubmit(event: CustomEvent<TodoItem>) {
    todoStore.state.todos = [...todoStore.state.todos, event.detail];
  }

  @Listen("changeTodoCompleted")
  handleComplete(event: CustomEvent<TodoItem>) {
    const item = event.detail;
    todoStore.state.todos = todoStore.state.todos.map((todo) => {
      if (todo.id === item.id) {
        todo.completed = item.completed;
      }

      return todo;
    });
  }

  @Listen("clickTodoRemove")
  handleRemoveItem(event: CustomEvent<TodoItem>) {
    const item = event.detail;

    todoStore.state.todos = todoStore.state.todos.filter(
      (todo: TodoItem) => todo.id !== item.id
    );
  }

  // Lifecycle method
  componentWillLoad() {
    todoStore.onChange("todos", (todos) => {
      this.todoChange.emit(todos);
    });

    if (this.initTodos) {
      const todos = this.initTodos.split(",").map<TodoItem>((item) => {
        return {
          id: cuid(),
          title: item.trim(),
          completed: false,
        };
      });

      todoStore.state.todos = todos;
    }
  }

  render() {
    const elemNoData = <p>Get started, write your first Todo item now...</p>;

    const elemList = (
      <ul>
        {todoStore.state.todos.map((todo: TodoItem) => {
          return (
            <ghost-todo-item-comp
              key={todo.id}
              item={JSON.stringify(todo)}
            ></ghost-todo-item-comp>
          );
        })}
      </ul>
    );

    return (
      <Host>
        <h2>StencilJS Web Component</h2>
        <ghost-todo-form-comp></ghost-todo-form-comp>
        {todoStore.state.todos.length <= 0 ? elemNoData : elemList}
      </Host>
    );
  }
}
