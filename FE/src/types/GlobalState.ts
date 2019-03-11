import { MytaxiState } from '../Mytaxi/Mytaxi.reducer';
import { Car2goState } from '../Car2go/Car2go.reducer';

export interface GlobalState {
  mytaxi: MytaxiState;
  car2go: Car2goState;
}
