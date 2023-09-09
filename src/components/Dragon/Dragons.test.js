import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Dragons from './Dragons'; // Update the path as needed
import dragonsReducer from '../../redux/dragons/dragonsSlice';

const store = configureStore({
  reducer: {
    dragons: dragonsReducer,
  },
});

test('renders Dragons component', () => {
  const { asFragment } = render(
    <Provider store={store}>
      <Dragons />
    </Provider>,
  );

  expect(asFragment()).toMatchSnapshot();
});
