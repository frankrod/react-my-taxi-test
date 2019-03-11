import { get } from '../utils/request';
import { Vehicule } from '../types/Vehicule';

export interface MyTaxiVehicleData {
  id: number;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  state: 'ACTIVE' | 'INACTIVE';
  type: 'TAXI';
}

export interface MyTaxiResult {
  poiList: MyTaxiVehicleData[];
}

async function getMytaxiVehicules() {
  const taxis: MyTaxiResult = await get('mytaxi/vehicles');

  return taxis.poiList.map(
    (taxi): Vehicule => ({
      id: taxi.id,
      company: 'mytaxi',
      coordinates: { ...taxi.coordinate },
      data: taxi,
    }),
  );
}

export { getMytaxiVehicules };
