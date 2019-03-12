import car2goReducer, { Car2goState } from '../Car2go.reducer';
import { Car2goAction, getCar2goVehiculesSuccess } from '../Car2go.actions';
import { Vehicule } from '../../types/Vehicule';

describe('car2go reducer', () => {
  const initialState: Car2goState = {
    car2goVehicules: [],
  };
  it('should return initial state', () => {
    expect(car2goReducer(undefined, {} as Car2goAction)).toEqual(initialState);
  });

  it('should return car2go vehicules state', () => {
    const car2goVehicules: Vehicule[] = [
      {
        id: 1,
        company: 'car2go',
        coordinates: { latitude: 0.2, longitude: 0.1 },
        data: {},
      },
    ];
    expect(
      car2goReducer(
        {} as Car2goState,
        getCar2goVehiculesSuccess(car2goVehicules),
      ),
    ).toEqual({ car2goVehicules });
  });
});
