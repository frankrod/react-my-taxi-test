import { combineReducers } from 'redux';
import mytaxi from '../Mytaxi/Mytaxi.reducer';
import car2go from '../Car2go/Car2go.reducer';

export default combineReducers({
  mytaxi,
  car2go,
});
