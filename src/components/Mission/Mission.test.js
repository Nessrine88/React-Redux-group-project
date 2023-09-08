import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import { jest } from '@jest/globals';
import Mission from './Mission';

const mockStore = configureStore();

describe('Missions Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      missions: {
        missions: [
          {
            mission_name: 'Thaicom',
            mission_id: '9D1B7E0',
            description:
            'Thaicom is the name of a series of',
          },
          {
            mission_name: 'Telstar',
            mission_id: 'F4F83DE',
            description:
            'Telstar 19V (Telstar 19 Vantage) is a communication.',
          },
        ],
        status: 'succeeded',
        error: null,
      },
    });

    store.dispatch = jest.fn();
  });

  test('renders mission names', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Mission />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Thaicom')).toBeInTheDocument();
    expect(screen.getByText('Telstar')).toBeInTheDocument();
  });

  test('renders mission descriptions', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Mission />
        </MemoryRouter>
      </Provider>,
    );

    expect(
      screen.getByText(
        'Thaicom is the name of a series of',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Telstar 19V (Telstar 19 Vantage) is a communication.',
      ),
    ).toBeInTheDocument();
  });
});
