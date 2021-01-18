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

@Component({
  tag: "ghost-todo-comp",
  styleUrl: "ghost-todo-comp.scss",
  shadow: true,
})
export class GhostTodoComp {
  @Prop() initTodos: string;
  @State() todoList: TodoItem[] = [];

  @State() formControls = {
    todo: null,
  };

  @Event() todoChange: EventEmitter<TodoItem[]>;

  handleSubmit(e: Event) {
    e.preventDefault();
    if (this.formControls.todo) {
      const newTodoItem: TodoItem = {
        id: cuid(),
        title: this.formControls.todo,
        completed: false,
      };

      this.todoList = [...this.todoList, newTodoItem];
      this.formControls.todo = "";
      this.formControls = { ...this.formControls };
      this.todoChange.emit(this.todoList);
    }
  }

  handleControlChange(controlName: string, value: string): void {
    this.formControls = {
      ...this.formControls,
      [controlName]: value,
    };
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
    }
  }

  render() {
    const elemNoData = (
      <p>Get started, write your first Todo item now...</p>
    );

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
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div class="control">
            <input
              type="text"
              value={this.formControls.todo}
              onInput={(e) =>
                this.handleControlChange(
                  "todo",
                  (e.target as HTMLInputElement).value
                )
              }
            />
            <button type="submit">Add</button>
          </div>
        </form>
        {this.todoList.length <= 0 ? elemNoData : elemList}
      </Host>
    );
  }
}
