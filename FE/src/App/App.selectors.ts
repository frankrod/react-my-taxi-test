import { createSelector } from 'reselect';
import { MapMarker } from '../components/Map';
import mytaxiMarker from '../images/mytaxi_marker.png';
import car2goMarker from '../images/car2go_marker.png';
import { GlobalState } from '../types/GlobalState';

const getMytaxiState = (mytaxiState: GlobalState) => mytaxiState;

export const getMarkers = createSelector(
  getMytaxiState,
  ({ mytaxi, car2go }) => {
    const mitaxiMarkers = mytaxi.mytaxiVehicules.map(
      ({ id, coordinates, company }): MapMarker => ({
        id,
        coordinates,
        icon: mytaxiMarker,
        company: company,
      }),
    );

    const car2goMarkers = car2go.car2goVehicules.map(
      ({ id, coordinates, company }): MapMarker => ({
        id,
        coordinates,
        icon: car2goMarker,
        company: company,
      }),
    );

    return [...mitaxiMarkers, ...car2goMarkers];
  },
);
