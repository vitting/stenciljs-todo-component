import {
  Component,
  Host,
  h,
  State,
  Event,
  EventEmitter,
  Prop,
} from "@stencil/core";
import cuid from "cuid";

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

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

  handleComplete(item: TodoItem, checked: boolean): void {
    this.todoList = this.todoList.map((todo) => {
      if (todo.id === item.id) {
        todo.completed = checked;
      }

      return todo;
    });

    this.todoChange.emit(this.todoList);
  }

  handleRemoveItem(item: TodoItem) {
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
    return (
      <Host>
        <h2>Stencil JS Web Component</h2>
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
        <ul>
          {this.todoList.map((todo) => {
            return (
              <li key={todo.id}>
                <div class="remove">
                  <button
                    type="button"
                    onClick={() => this.handleRemoveItem(todo)}
                  >
                    ❌
                  </button>
                  <div class={{ completed: todo.completed, item: true }}>
                    <span>{todo.title}</span>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        this.handleComplete(
                          todo,
                          (e.target as HTMLInputElement).checked
                        )
                      }
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Host>
    );
  }
}
