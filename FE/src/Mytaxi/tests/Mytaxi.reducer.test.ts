import mytaxiReducer, { MytaxiState } from '../Mytaxi.reducer';
import { MytaxiAction, getMytaxiVehiculesSuccess } from '../Mytaxi.actions';
import { Vehicule } from '../../types/Vehicule';

describe('mytaxi reducer', () => {
  const initialState: MytaxiState = {
    mytaxiVehicules: [],
  };
  it('should return initial state', () => {
    expect(mytaxiReducer(undefined, {} as MytaxiAction)).toEqual(initialState);
  });

  it('should return mytaxi vehicules state', () => {
    const mytaxiVehicules: Vehicule[] = [
      {
        id: 1,
        company: 'mytaxi',
        coordinates: { latitude: 0.2, longitude: 0.1 },
        data: {},
      },
    ];
    expect(
      mytaxiReducer(
        {} as MytaxiState,
        getMytaxiVehiculesSuccess(mytaxiVehicules),
      ),
    ).toEqual({ mytaxiVehicules });
  });
});
