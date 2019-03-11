import { all } from 'redux-saga/effects';
import { myTaxiSagas } from '../Mytaxi/Mytaxi.sagas';

export default function* rootSagas() {
  yield all([...myTaxiSagas]);
}
