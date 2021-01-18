import { Component, EventEmitter, Event, h, State } from "@stencil/core";
import cuid from "cuid";
import { TodoItem } from "../../interfaces/todo_item.interface";
@Component({
  tag: "ghost-todo-form-comp",
  styleUrl: "ghost-todo-form-comp.scss",
  shadow: true,
})
export class GhostTodoFormComp {
  @State() todoInput: string = null;

  @Event() submitTodo: EventEmitter<TodoItem>;

  handleSubmit(e: Event) {
    e.preventDefault();
    if (this.todoInput) {
      const newTodoItem: TodoItem = {
        id: cuid(),
        title: this.todoInput,
        completed: false,
      };

      this.submitTodo.emit(newTodoItem);
      this.todoInput = "";
    }
  }

  handleControlChange(value: string): void {
    this.todoInput = value;
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div class="control">
          <input
            type="text"
            value={this.todoInput}
            onInput={(e) =>
              this.handleControlChange((e.target as HTMLInputElement).value)
            }
          />
          <button type="submit">Add</button>
        </div>
      </form>
    );
  }
}
