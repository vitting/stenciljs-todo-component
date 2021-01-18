import { Component, EventEmitter, Event, h, State } from "@stencil/core";
import cuid from "cuid";
import { TodoItem } from "../../interfaces/todo_item.interface";
@Component({
  tag: "ghost-todo-form-comp",
  styleUrl: "ghost-todo-form-comp.scss",
  shadow: true,
})
export class GhostTodoFormComp {
  @State() formControls = {
    todo: null,
  };

  @Event() submitTodo: EventEmitter<TodoItem>;

  handleSubmit(e: Event) {
    e.preventDefault();
    if (this.formControls.todo) {
      const newTodoItem: TodoItem = {
        id: cuid(),
        title: this.formControls.todo,
        completed: false,
      };

      this.submitTodo.emit(newTodoItem);
      this.formControls.todo = "";
      this.formControls = { ...this.formControls };
    }
  }

  handleControlChange(controlName: string, value: string): void {
    this.formControls = {
      ...this.formControls,
      [controlName]: value,
    };
  }

  render() {
    return (
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
    );
  }
}
