import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'ghost-todo-form-comp',
  styleUrl: 'ghost-todo-form-comp.scss',
  shadow: true,
})
export class GhostTodoFormComp {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
