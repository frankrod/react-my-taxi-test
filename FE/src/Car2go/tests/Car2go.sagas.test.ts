import { put, takeLatest } from 'redux-saga/effects';

import * as actions from '../Car2go.actions';
import * as ActionTypes from '../constants';
import { watchGetCar2goVehicules, fetchCar2goVehicules } from '../Car2go.sagas';
import { Vehicule } from '../../types/Vehicule';

describe('fetchCar2goVehicules', () => {
  let fetchCar2goVehiculesGenerator: any;

  beforeEach(() => {
    fetchCar2goVehiculesGenerator = fetchCar2goVehicules();
    fetchCar2goVehiculesGenerator.next();
  });

  it('should dispatch getCar2goVehiculeSuccess action when success', () => {
    const car2goVehicules: Vehicule[] = [
      {
        id: 1,
        company: 'car2go',
        coordinates: { latitude: 0.2, longitude: 0.1 },
        data: {},
      },
    ];

    const putDescriptor = fetchCar2goVehiculesGenerator.next(car2goVehicules)
      .value;
    expect(putDescriptor).toEqual(
      put(actions.getCar2goVehiculesSuccess(car2goVehicules)),
    );
  });

  it('should dispatch getCar2goVehiculeFail action when fail', () => {
    const response = new Error();
    const putDescriptor = fetchCar2goVehiculesGenerator.throw(response).value;

    expect(putDescriptor).toEqual(
      put(actions.getCar2goVehiculesFail(response)),
    );
  });
});

describe('watchGetCar2goVehicules', () => {
  const watchGetCar2goVehiculesGenerator = watchGetCar2goVehicules();

  it('should start task to watch for GET_CAR_2_GO_VEHICULES action', () => {
    const takeLatestDescriptor = watchGetCar2goVehiculesGenerator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(ActionTypes.GET_CAR_2_GO_VEHICULES, fetchCar2goVehicules),
    );
  });
});
