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
              `Thaicom is the name of a series of communications 
              satellites operated from Thailand, and also the name of 
              Thaicom Public Company Limited, which is the company that
               owns and operates the Thaicom satellite fleet and other
                telecommunication businesses in Thailand and throughout
                 the Asia-Pacific region. The satellite projects were named
                  Thaicom by the King of Thailand, His Majesty the King Bhumibol
                   Adulyadej, as a symbol of the linkage between Thailand and
                    modern communications technology.`,
          },
          {
            mission_name: 'Telstar',
            mission_id: 'F4F83DE',
            description:
              `Telstar 19V (Telstar 19 Vantage) is a communication
               satellite in the Telstar series of the Canadian satellite 
               communications company Telesat. It was built by Space System
                Loral (MAXAR) and is based on the SSL-1300 bus. As of 26 July 2018,
                 Telstar 19V is the heaviest commercial communications satellite ever 
                 launched, weighing at 7,076 kg (15,600 lbs) and surpassing the previous 
                 record, set by TerreStar-1 (6,910 kg/15230lbs), launched by Ariane 5ECA on 1
                  July 2009.`,
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
        `Thaicom is the name of a series of
         communications satellites operated
          from Thailand, and also the name of
           Thaicom Public Company Limited,
            which is the company that owns and 
            operates the Thaicom satellite fleet
             and other telecommunication businesses
              in Thailand and throughout the Asia-Pacific
               region. The satellite projects were named 
               Thaicom by the King of Thailand, His Majesty
                the King Bhumibol Adulyadej, as a symbol of 
                the linkage between Thailand and modern communications technology.`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Telstar 19V (Telstar 19 Vantage) is a communication
         satellite in the Telstar series of the Canadian satellite
          communications company Telesat. It was built by Space Systems
           Loral (MAXAR) and is based on the SSL-1300 bus. As of 26 July
            2018, Telstar 19V is the heaviest commercial communications satellite
             ever launched, weighing at 7,076 kg (15,600 lbs) and surpassing the
              previous record, set by TerreStar-1 (6,910 kg/15230lbs), launched by
               Ariane 5ECA on 1 July 2009.`,
      ),
    ).toBeInTheDocument();
  });
});
