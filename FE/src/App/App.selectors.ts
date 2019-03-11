import { createSelector } from 'reselect';
import { MapMarker } from '../components/Map';
import mytaxiMarker from '../images/mytaxi_marker.png';
import { GlobalState } from '../types/GlobalState';

const getMytaxiState = (mytaxiState: GlobalState) => mytaxiState;

export const getMarkers = createSelector(
  getMytaxiState,
  ({ mytaxi }) => {
    const mitaxiMarkers = mytaxi.mytaxiVehicules.map(
      ({ id, coordinates, company }): MapMarker => ({
        id,
        coordinates,
        icon: mytaxiMarker,
        company: company,
      }),
    );
    return [...mitaxiMarkers];
  },
);
