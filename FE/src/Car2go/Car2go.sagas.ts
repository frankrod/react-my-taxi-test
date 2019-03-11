import { put, takeLatest, call } from 'redux-saga/effects';

import * as ActionTypes from './constants';
import * as car2goActions from './Car2go.actions';
import { getCar2GoVehicules } from '../services/car2go';

export function* fetchCar2goVehicules() {
  try {
    const result = yield call(getCar2GoVehicules);
    yield put(car2goActions.getCar2goVehiculesSuccess(result));
  } catch (err) {
    yield put(car2goActions.getCar2goVehiculesFail(err));
  }
}

export function* watchGetCar2goVehicules() {
  yield takeLatest(ActionTypes.GET_CAR_2_GO_VEHICULES, fetchCar2goVehicules);
}

export const car2goSagas = [watchGetCar2goVehicules()];
