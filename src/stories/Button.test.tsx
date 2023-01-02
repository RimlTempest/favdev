import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Button.stories';

const { Primary } = composeStories(stories);

test('render button with default args', () => {
  render(<Primary></Primary>);
  const buttonElement = screen.getByText(/Button/i);
  expect(buttonElement).not.toBeNull();
});
