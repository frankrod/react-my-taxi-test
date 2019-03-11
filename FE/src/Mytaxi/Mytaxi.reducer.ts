import * as ActionTypes from './constants';
import { MytaxiAction } from './Mytaxi.actions';
import { Vehicule } from '../types/Vehicule';

export interface MytaxiState {
  mytaxiVehicules: Vehicule[];
}

const initialState: MytaxiState = {
  mytaxiVehicules: [],
};

function mytaxiReducer(
  state: MytaxiState = initialState,
  action: MytaxiAction,
): MytaxiState {
  switch (action.type) {
    case ActionTypes.GET_MY_TAXI_VEHICULES_SUCCESS: {
      const mytaxiVehicules = action.payload;
      return { ...state, mytaxiVehicules };
    }

    default:
      return state;
  }
}

export default mytaxiReducer;
