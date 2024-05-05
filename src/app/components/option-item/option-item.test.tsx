import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OptionItem } from './option-item';
import { renderWithRouter } from '@/__tests__/utils';

describe('OptionItem component', () => {
  it('renders title and description', () => {
    renderWithRouter(<OptionItem title="My Title" description="My Description" />);

    expect(screen.getByText('My Title')).toBeInTheDocument();
    expect(screen.getByText('My Description')).toBeInTheDocument();
  });

  it('does not render button when buttonLabel is not provided', () => {
    renderWithRouter(<OptionItem title="My Title" description="My Description" />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders button with correct label and href when buttonLabel is provided', () => {
    renderWithRouter(
      <OptionItem
        title="My Title"
        description="My Description"
        buttonLabel="My Button"
        href="http://my-link.com"
      />,
    );

    const button = screen.getByRole('link', { name: /My Button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', 'http://my-link.com');

    const arrow = document.getElementById('btn-arrow');
    expect(button).toContainElement(arrow);
  });
});
