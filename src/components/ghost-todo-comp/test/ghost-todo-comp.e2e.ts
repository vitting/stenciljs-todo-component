import { newE2EPage } from '@stencil/core/testing';

describe('ghost-todo-comp', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ghost-todo-comp></ghost-todo-comp>');

    const element = await page.find('ghost-todo-comp');
    expect(element).toHaveClass('hydrated');
  });
});
