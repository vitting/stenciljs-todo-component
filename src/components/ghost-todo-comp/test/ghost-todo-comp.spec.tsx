import { newSpecPage } from '@stencil/core/testing';
import { GhostTodoComp } from '../ghost-todo-comp';

describe('ghost-todo-comp', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GhostTodoComp],
      html: `<ghost-todo-comp></ghost-todo-comp>`,
    });
    expect(page.root).toEqualHtml(`
      <ghost-todo-comp>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ghost-todo-comp>
    `);
  });
});
