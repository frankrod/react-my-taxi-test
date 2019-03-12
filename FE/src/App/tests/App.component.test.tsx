import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import App from '../App.container';
import rootReducer from '../../rootReducer';
import { GlobalState } from '../../types/GlobalState';

const globalState: GlobalState = {
  car2go: {
    car2goVehicules: [
      {
        id: 1,
        coordinates: { latitude: 0.0, longitude: 0.0 },
        company: 'car2go',
        data: { id: 1, name: 'some name', address: 'some address' },
      },
    ],
  },
  mytaxi: {
    mytaxiVehicules: [
      {
        id: 1,
        coordinates: { latitude: 0.0, longitude: 0.0 },
        company: 'mytaxi',
        data: { id: 1, type: 'Taxi', status: 'active' },
      },
    ],
  },
};

afterEach(cleanup);

describe('<App/>', () => {
  it('should render successfully ca2rgo and mytaxi components', () => {
    const { getByText } = renderWithRedux(<App />, {
      initialState: globalState,
    });

    expect(getByText('some name - 1')).toBeDefined();
    expect(getByText('Taxi - 1')).toBeDefined();
  });

  it('should render successfully only ca2rgo component when filter is car2go', () => {
    const { getByValue, getByText, queryByText } = renderWithRedux(<App />, {
      initialState: globalState,
    });
    const radioBtnElement = getByValue('car2go');
    fireEvent.click(radioBtnElement);

    expect(getByText('some name - 1')).toBeDefined();
    expect(queryByText('Taxi - 1')).toBe(null);
  });

  it('should render successfully only mytaxi component when filter is mytaxi', () => {
    const { getByValue, getByText, queryByText } = renderWithRedux(<App />, {
      initialState: globalState,
    });
    const radioBtnElement = getByValue('mytaxi');
    fireEvent.click(radioBtnElement);

    expect(getByText('Taxi - 1')).toBeDefined();
    expect(queryByText('some name - 1')).toBe(null);
  });

  it('should render successfully mytaxi and car2go component when filter is noFilter', () => {
    const { getByValue, getByText, queryByText } = renderWithRedux(<App />, {
      initialState: globalState,
    });
    const mytaxiRadioBtnElement = getByValue('mytaxi');
    fireEvent.click(mytaxiRadioBtnElement);

    expect(getByText('Taxi - 1')).toBeDefined();
    expect(queryByText('some name - 1')).toBe(null);

    const noFilterRadioBtnElement = getByValue('noFilter');
    fireEvent.click(noFilterRadioBtnElement);

    expect(getByText('some name - 1')).toBeDefined();
    expect(getByText('Taxi - 1')).toBeDefined();
  });
});

export interface renderWithReduxOptions {
  initialState: GlobalState;
}

function renderWithRedux(
  ui: React.ReactChild,
  options: renderWithReduxOptions,
) {
  const { initialState } = options;

  const store = createStore(rootReducer, initialState);

  return render(<Provider store={store}>{ui}</Provider>);
}
