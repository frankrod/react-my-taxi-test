import { get } from '../utils/request';
import { Vehicule } from '../types/Vehicule';

export interface Car2GoData {
  id: number;
  address: string;
  coordinates: number[];
  engineType: string;
  exterior: 'UNACCEPTABLE' | 'GOOD';
  fuel: number;
  interior: 'UNACCEPTABLE' | 'GOOD';
  name: string;
  vin: string;
}

export interface Car2GoResult {
  placemarks: Car2GoData[];
}

async function getCar2GoVehicules() {
  const taxis: Car2GoResult = await get('car2go/vehicles');

  return taxis.placemarks.map(
    (taxi): Vehicule => ({
      id: taxi.id,
      company: 'car2go',
      coordinates: {
        longitude: taxi.coordinates[0],
        latitude: taxi.coordinates[1],
      },
      data: taxi,
    }),
  );
}

export { getCar2GoVehicules };
