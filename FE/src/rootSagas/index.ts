import { all } from 'redux-saga/effects';
import { myTaxiSagas } from '../Mytaxi/Mytaxi.sagas';
import { car2goSagas } from '../Car2go/Car2go.sagas';

export default function* rootSagas() {
  yield all([...myTaxiSagas, ...car2goSagas]);
}
