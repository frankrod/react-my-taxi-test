import * as actions from '../Car2go.actions';
import * as types from '../constants';
import { Vehicule } from '../../types/Vehicule';

describe('Car2go - Actions', () => {
  it('should create an action to get car2go vehicules', () => {
    const expectedAction = {
      type: types.GET_CAR_2_GO_VEHICULES,
    };
    expect(actions.getCar2goVehicules()).toEqual(expectedAction);
  });

  it('should create an action to get car2go vehicules when success', () => {
    const car2goVehicules: Vehicule[] = [
      {
        id: 1,
        company: 'car2go',
        coordinates: { latitude: 0.2, longitude: 0.1 },
        data: {},
      },
    ];
    const expectedAction = {
      type: types.GET_CAR_2_GO_VEHICULES_SUCCESS,
      payload: car2goVehicules,
    };
    expect(actions.getCar2goVehiculesSuccess(car2goVehicules)).toEqual(
      expectedAction,
    );
  });

  it('should create an action to get car2go vehicules when fail', () => {
    const error = new Error();
    const expectedAction = {
      type: types.GET_CAR_2_GO_VEHICULES_FAIL,
      payload: error,
    };
    expect(actions.getCar2goVehiculesFail(error)).toEqual(expectedAction);
  });
});
