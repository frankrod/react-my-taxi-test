import * as ActionTypes from './constants';
import { Car2goAction } from './Car2go.actions';
import { Vehicule } from '../types/Vehicule';

export interface Car2goState {
  car2goVehicules: Vehicule[];
}

const initialState: Car2goState = {
  car2goVehicules: [],
};

function car2goReducer(
  state: Car2goState = initialState,
  action: Car2goAction,
): Car2goState {
  switch (action.type) {
    case ActionTypes.GET_CAR_2_GO_VEHICULES_SUCCESS: {
      const car2goVehicules = action.payload;
      return { ...state, car2goVehicules };
    }

    default:
      return state;
  }
}

export default car2goReducer;
