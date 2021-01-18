import {
  Component,
  Host,
  h,
  State,
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
  @State() todoList: TodoItem[] = [];

  @Event() todoChange: EventEmitter<TodoItem[]>;

  @Listen("submitTodo")
  handleSubmit(event: CustomEvent<TodoItem>) {
    this.todoList = [...this.todoList, event.detail];
    this.todoChange.emit(this.todoList);
  }

  @Listen("changeTodoCompleted")
  handleComplete(event: CustomEvent<TodoItem>) {
    const item = event.detail;
    this.todoList = this.todoList.map((todo) => {
      if (todo.id === item.id) {
        todo.completed = item.completed;
      }

      return todo;
    });

    this.todoChange.emit(this.todoList);
  }

  @Listen("clickTodoRemove")
  handleRemoveItem(event: CustomEvent<TodoItem>) {
    const item = event.detail;

    this.todoList = this.todoList.filter((todo) => todo.id !== item.id);
    this.todoChange.emit(this.todoList);
  }

  // Lifecycle method
  componentWillLoad() {
    if (this.initTodos) {
      this.todoList = this.initTodos.split(",").map<TodoItem>((item) => {
        return {
          id: cuid(),
          title: item.trim(),
          completed: false,
        };
      });

      // todoStore.set() = this.initTodos.split(",").map<TodoItem>((item) => {
      //   return {
      //     id: cuid(),
      //     title: item.trim(),
      //     completed: false,
      //   };
      // });
    }
  }

  render() {
    const elemNoData = <p>Get started, write your first Todo item now...</p>;

    const elemList = (
      <ul>
        {this.todoList.map((todo) => {
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
        {this.todoList.length <= 0 ? elemNoData : elemList}
      </Host>
    );
  }
}
