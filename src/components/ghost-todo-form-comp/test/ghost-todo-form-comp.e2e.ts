import { newE2EPage } from '@stencil/core/testing';

describe('ghost-todo-form-comp', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ghost-todo-form-comp></ghost-todo-form-comp>');

    const element = await page.find('ghost-todo-form-comp');
    expect(element).toHaveClass('hydrated');
  });
});
