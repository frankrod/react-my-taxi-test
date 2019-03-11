import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

export interface MapMarker {
  id: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  icon?: any;
  company: string;
}

export interface InnerMapProps {
  marker?: MapMarker;
  markers?: MapMarker[];
  handleMarkerClicked: (id: number) => (e: React.MouseEvent) => void;
  markerSelectedId: number;
}

const InnerMap = withScriptjs(
  withGoogleMap((props: InnerMapProps) => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 53.5532316, lng: 10.0087783 }}
    >
      {props.markers &&
        props.markers.map(marker => {
          return (
            <Marker
              key={marker.id}
              cursor="pointer"
              position={{
                lat: marker.coordinates.latitude,
                lng: marker.coordinates.longitude,
              }}
              icon={{
                url: marker.icon,
                scaledSize: {
                  width: props.markerSelectedId === marker.id ? 50 : 30,
                  height: props.markerSelectedId === marker.id ? 50 : 30,
                },
              }}
              onClick={props.handleMarkerClicked(marker.id)}
            />
          );
        })}
      {props.marker && (
        <Marker
          cursor="pointer"
          position={{
            lat: props.marker.coordinates.latitude,
            lng: props.marker.coordinates.longitude,
          }}
        />
      )}
    </GoogleMap>
  )),
);

class Map extends React.Component<InnerMapProps> {
  render() {
    const KEY = 'AIzaSyDFwu1MmuOatqW-283LSCbsxqHcp89ouiw';
    const {
      markers,
      marker,
      handleMarkerClicked,
      markerSelectedId,
    } = this.props;
    return (
      <InnerMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        markers={markers}
        marker={marker}
        handleMarkerClicked={handleMarkerClicked}
        markerSelectedId={markerSelectedId}
      />
    );
  }
}

export default Map;
