import { Component, EventEmitter, Event, h, Prop, State } from "@stencil/core";
import { TodoItem } from "../../interfaces/todo_item.interface";

@Component({
  tag: "ghost-todo-item-comp",
  styleUrl: "ghost-todo-item-comp.scss",
})
export class GhostTodoItemComp {
  @Prop() item: string;
  @State() todo: TodoItem;
  @Event() clickTodoRemove: EventEmitter<TodoItem>;
  @Event() changeTodoCompleted: EventEmitter<TodoItem>;

  handleComplete(item: TodoItem, checked: boolean): void {
    item.completed = checked;
    this.changeTodoCompleted.emit(item);
  }

  handleRemoveItem(item: TodoItem) {
    this.clickTodoRemove.emit(item);
  }

  componentWillLoad() {
    if (this.item) {
      this.todo = JSON.parse(this.item);
    }
  }

  render() {
    return (
      <li>
        <div class="remove">
          <button
            type="button"
            title="Remove"
            onClick={() => this.handleRemoveItem(this.todo)}
          >
            ❌
          </button>
          <div class={{ completed: this.todo.completed, item: true }}>
            <span>{this.todo.title}</span>
            <input
              type="checkbox"
              onChange={(e) =>
                this.handleComplete(
                  this.todo,
                  (e.target as HTMLInputElement).checked
                )
              }
            />
          </div>
        </div>
      </li>
    );
  }
}
