import { get } from '../utils/request';

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

async function getTaxis() {
  const taxis: MyTaxiResult = await get('mytaxi/vehicles');

  return taxis.poiList.map(taxi => ({
    company: 'mytaxy',
    ...taxi,
  }));
}

export { getTaxis };
