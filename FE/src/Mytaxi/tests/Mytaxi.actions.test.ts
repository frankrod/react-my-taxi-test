import * as actions from '../Mytaxi.actions';
import * as types from '../constants';
import { Vehicule } from '../../types/Vehicule';

describe('Mytaxi - Actions', () => {
  it('should create an action to get mytaxi vehicules', () => {
    const expectedAction = {
      type: types.GET_MY_TAXI_VEHICULES,
    };
    expect(actions.getMytaxiVehicules()).toEqual(expectedAction);
  });

  it('should create an action to get mytaxi vehicules when success', () => {
    const mytaxiVehicules: Vehicule[] = [
      {
        id: 1,
        company: 'mytaxi',
        coordinates: { latitude: 0.2, longitude: 0.1 },
        data: {},
      },
    ];
    const expectedAction = {
      type: types.GET_MY_TAXI_VEHICULES_SUCCESS,
      payload: mytaxiVehicules,
    };
    expect(actions.getMytaxiVehiculesSuccess(mytaxiVehicules)).toEqual(
      expectedAction,
    );
  });

  it('should create an action to get mytaxi vehicules when fail', () => {
    const error = new Error();
    const expectedAction = {
      type: types.GET_MY_TAXI_VEHICULES_FAIL,
      payload: error,
    };
    expect(actions.getMytaxiVehiculesFail(error)).toEqual(expectedAction);
  });
});
