import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { MyTaxiVehicleData } from '../../services/mytaxi';

export interface MapMarker {
  lat?: number;
  lng?: number;
}

export interface InnerMapProps {
  marker?: MapMarker;
  vehicules?: MyTaxiVehicleData[];
}

const InnerMap = withScriptjs(
  withGoogleMap((props: InnerMapProps) => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 53.5532316, lng: 10.0087783 }}
    >
      {props.vehicules &&
        props.vehicules.map(vehicule => {
          return (
            <Marker
              key={vehicule.id}
              cursor="pointer"
              position={{
                lat: vehicule.coordinate.latitude,
                lng: vehicule.coordinate.longitude,
              }}
            />
          );
        })}
      {props.marker && (
        <Marker
          cursor="pointer"
          position={{
            lat: props.marker.lat,
            lng: props.marker.lng,
          }}
        />
      )}
    </GoogleMap>
  )),
);

class Map extends React.Component<InnerMapProps> {
  render() {
    const KEY = 'AIzaSyDFwu1MmuOatqW-283LSCbsxqHcp89ouiw';
    const { vehicules, marker } = this.props;
    return (
      <InnerMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        vehicules={vehicules}
        marker={marker}
      />
    );
  }
}

export default Map;
