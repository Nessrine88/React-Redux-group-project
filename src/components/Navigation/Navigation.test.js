import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';
import '@testing-library/jest-dom/extend-expect';

test('renders the logo', () => {
  render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>,
  );

  const logo = screen.getByAltText('Space Travelers Hub');
  expect(logo).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>,
  );

  const rocketsLink = screen.getByText('Rockets');
  const missionLink = screen.getByText('Mission');
  const dragonsLink = screen.getByText('Dragons');
  const profileLink = screen.getByText('My Profile');

  expect(rocketsLink).toBeInTheDocument();
  expect(missionLink).toBeInTheDocument();
  expect(dragonsLink).toBeInTheDocument();
  expect(profileLink).toBeInTheDocument();
});
