import { newSpecPage } from '@stencil/core/testing';
import { GhostTodoFormComp } from '../ghost-todo-form-comp';

describe('ghost-todo-form-comp', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GhostTodoFormComp],
      html: `<ghost-todo-form-comp></ghost-todo-form-comp>`,
    });
    expect(page.root).toEqualHtml(`
      <ghost-todo-form-comp>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ghost-todo-form-comp>
    `);
  });
});
