export interface Vehicule {
  id: number;
  company: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  data: any;
}
