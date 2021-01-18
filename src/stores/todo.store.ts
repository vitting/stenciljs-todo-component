import { createStore } from "@stencil/store";
import { TodoItem } from "../interfaces/todo_item.interface";

type Todos = {
  todos: TodoItem[];
};

// https://stenciljs.com/docs/stencil-store
const todoStore = createStore<Todos>({
  todos: [],
});

export default todoStore;
