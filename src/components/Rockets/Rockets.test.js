import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import { jest } from '@jest/globals';
import Rockets from './Rockets';

const mockStore = configureStore();

describe('Rockets Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      rockets: {
        rockets: [
          {
            id: '1',
            name: 'Falcon 1',
            description: 'Description 1',
            booked: false,
            flickr_images: ['http://image1.com'],
          },
          {
            id: '2',
            name: 'Falcon 2',
            description: 'Description 2',
            booked: true,
            flickr_images: ['http://image2.com'],
          },
        ],
        status: 'succeeded',
        error: null,
      },
    });

    // Mockeamos el dispatch
    store.dispatch = jest.fn();
  });

  test('renders rocket names', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Rockets />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Falcon 1')).toBeInTheDocument();
    expect(screen.getByText('Falcon 2')).toBeInTheDocument();
  });

  test('renders booking status', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Rockets />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Book Rocket')).toBeInTheDocument();
    expect(screen.getByText('Cancel Booking')).toBeInTheDocument();
  });

  test('renders rocket descriptions', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Rockets />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  test('renders rocket images', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Rockets />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByAltText('Falcon 1')).toHaveAttribute('src', 'http://image1.com');
    expect(screen.getByAltText('Falcon 2')).toHaveAttribute('src', 'http://image2.com');
  });
});
