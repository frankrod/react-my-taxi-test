import { put, takeLatest, call } from 'redux-saga/effects';

import * as ActionTypes from './constants';
import * as mytaxiActions from './Mytaxi.actions';
import { getMytaxiVehicules } from '../services/mytaxi';

export function* fetchMytaxiVehicules() {
  try {
    const result = yield call(getMytaxiVehicules);
    yield put(mytaxiActions.getMytaxiVehiculesSuccess(result));
  } catch (err) {
    yield put(mytaxiActions.getMytaxiVehiculesFail(err));
  }
}

export function* watchGetMytaxiVehicules() {
  yield takeLatest(ActionTypes.GET_MY_TAXI_VEHICULES, fetchMytaxiVehicules);
}

export const myTaxiSagas = [watchGetMytaxiVehicules()];
