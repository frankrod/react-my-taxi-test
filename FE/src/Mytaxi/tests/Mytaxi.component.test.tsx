import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Mytaxi from '../Mytaxi.container';
import rootReducer from '../../rootReducer';
import { GlobalState } from '../../types/GlobalState';

const props = {
  vehiculeFilterBy: 'noFilter',
  markerSelectedId: 0,
  cardVehiculesRefs: jest.fn(),
  handleCardClicked: jest.fn(),
};

const globalState: GlobalState = {
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
  car2go: {
    car2goVehicules: [],
  },
};

afterEach(cleanup);

describe('<Mytaxi/>', () => {
  it('should render successfully when vehicule filter is no filter', () => {
    const { getByTestId } = renderWithRedux(<Mytaxi {...props} />, {
      initialState: globalState,
    });

    expect(getByTestId('card-title-text')).toHaveTextContent('Taxi - 1');
  });

  it('should render nothing when vehicule filter is mytaxi', () => {
    const newProps = { ...props, vehiculeFilterBy: 'mytaxi' };

    const { getByTestId } = renderWithRedux(<Mytaxi {...newProps} />, {
      initialState: globalState,
    });

    expect(getByTestId('card-title-text')).toHaveTextContent('Taxi - 1');
  });

  it('should render successfully when vehicule filter is car2go', () => {
    const newProps = { ...props, vehiculeFilterBy: 'car2go' };

    const { queryByTestId } = renderWithRedux(<Mytaxi {...newProps} />, {
      initialState: globalState,
    });

    expect(queryByTestId('card-title-text')).toBe(null);
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
