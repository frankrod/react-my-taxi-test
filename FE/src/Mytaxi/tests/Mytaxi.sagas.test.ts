import { put, takeLatest } from 'redux-saga/effects';

import * as actions from '../Mytaxi.actions';
import * as ActionTypes from '../constants';
import { watchGetMytaxiVehicules, fetchMytaxiVehicules } from '../Mytaxi.sagas';
import { Vehicule } from '../../types/Vehicule';

describe('fetchMytaxiVehicules', () => {
  let fetchMytaxiVehiculesGenerator: any;

  beforeEach(() => {
    fetchMytaxiVehiculesGenerator = fetchMytaxiVehicules();
    fetchMytaxiVehiculesGenerator.next();
  });

  it('should dispatch getMytaxiVehiculesSuccess action when success', () => {
    const mytaxiVehicules: Vehicule[] = [
      {
        id: 1,
        company: 'mytaxi',
        coordinates: { latitude: 0.2, longitude: 0.1 },
        data: {},
      },
    ];

    const putDescriptor = fetchMytaxiVehiculesGenerator.next(mytaxiVehicules)
      .value;
    expect(putDescriptor).toEqual(
      put(actions.getMytaxiVehiculesSuccess(mytaxiVehicules)),
    );
  });

  it('should dispatch getMytaxiVehiculesFail action when fail', () => {
    const response = new Error();
    const putDescriptor = fetchMytaxiVehiculesGenerator.throw(response).value;

    expect(putDescriptor).toEqual(
      put(actions.getMytaxiVehiculesFail(response)),
    );
  });
});

describe('watchGetMytaxiVehicules', () => {
  const watchGetMytaxiVehiculesGenerator = watchGetMytaxiVehicules();

  it('should start task to watch for GET_MY_TAXI_VEHICULES action', () => {
    const takeLatestDescriptor = watchGetMytaxiVehiculesGenerator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(ActionTypes.GET_MY_TAXI_VEHICULES, fetchMytaxiVehicules),
    );
  });
});
