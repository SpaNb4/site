import { screen } from '@testing-library/react';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { Courses } from './courses';
import { renderWithRouter } from '@/__tests__/utils';
import { useWindowSize } from '@/app/hooks';

describe('Courses', () => {
  vi.mock('@/app/hooks', () => ({
    useWindowSize: vi.fn().mockReturnValue({ width: 1440, height: 900 }),
  }));

  beforeEach(() => {
    renderWithRouter(<Courses />);
  });

  it('renders the title correctly', () => {
    const titleElement = screen.getByText('Upcoming courses');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders course info correctly', () => {
    const courseElement = screen.getByText('AWS Fundamentals');
    expect(courseElement).toBeInTheDocument();
  });

  it('renders three course cards', () => {
    const courseCards = screen.getAllByRole('link', { name: 'More' });
    expect(courseCards.length).toBe(5);
  });

  it('renders link with arrow only on window size 810px', () => {
    (useWindowSize as Mock).mockReturnValue({ width: 810, height: 900 });
    renderWithRouter(<Courses />);
    const courseCards = screen.getAllByRole('link', { name: /^(More)/gi });
    expect(courseCards.length).toBe(5);
  });

  it('renders link with "More details arrow_forward" on window size 810px', () => {
    (useWindowSize as Mock).mockReturnValue({ width: 1441, height: 900 });
    renderWithRouter(<Courses />);
    const courseCards = screen.getAllByRole('link', { name: 'More details' });
    expect(courseCards.length).toBe(5);
  });

  it('renders the Go to RS School button', () => {
    const goButton = screen.getByText('Go to RS School');
    expect(goButton).toBeInTheDocument();
  });

  it('should render RsBanner', () => {
    const rsBanner = screen.getByTestId('rs-banner');
    expect(rsBanner).toBeInTheDocument();
  });
});
