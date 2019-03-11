import React from 'react';

import Header from '../components/Header';
import Map, { MapMarker } from '../components/Map';
import Mytaxi from '../Mytaxi/Mytaxi.container';
import Car2go from '../Car2go/Car2go.container';
import './App.css';

export interface AppState {
  markers: MapMarker[];
  allMarkers: MapMarker[];
  markerSelectedId: number;
  vehiculeFilterBy: string;
}

export interface CardVehiculesRefs {
  [key: number]: any;
}

export interface AppProps {
  markers: MapMarker[];
  allMarkers: MapMarker[];
}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    markers: [],
    allMarkers: [],
    markerSelectedId: 0,
    vehiculeFilterBy: 'noFilter',
  };

  static getDerivedStateFromProps(props: AppProps, state: AppState) {
    if (props.allMarkers !== state.allMarkers) {
      return {
        allMarkers: props.allMarkers,
        markers: props.markers,
      };
    }

    return null;
  }

  cardVehiculesRefs: CardVehiculesRefs = {};

  markerClicked = (id: number) => (e: React.MouseEvent) => {
    this.setState({ markerSelectedId: id }, () => {
      this.cardVehiculesRefs[
        this.state.markerSelectedId
      ].current.scrollIntoView({
        behavior: 'instant',
      });
    });
  };

  handleCardClicked = (id: number) => () => {
    this.setState({ markerSelectedId: id });
  };

  handleVehiculeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { allMarkers } = this.state;
    let markers;

    if (e.target.value === 'noFilter') {
      markers = allMarkers;
    } else {
      markers = allMarkers.filter(marker => marker.company === e.target.value);
    }

    this.setState({
      vehiculeFilterBy: e.target.value,
      markers,
    });
  };

  render() {
    const { markerSelectedId, vehiculeFilterBy, markers } = this.state;
    return (
      <div className="App">
        <div className="app-sidebar">
          <header className="app-header">
            <Header
              handleVehiculeFilter={this.handleVehiculeFilter}
              vehiculeFilterBy={vehiculeFilterBy}
            />
          </header>
          <section className="vehicules-list">
            <Mytaxi
              vehiculeFilterBy={vehiculeFilterBy}
              markerSelectedId={markerSelectedId}
              cardVehiculesRefs={this.cardVehiculesRefs}
              handleCardClicked={this.handleCardClicked}
            />
            <Car2go
              vehiculeFilterBy={vehiculeFilterBy}
              markerSelectedId={markerSelectedId}
              cardVehiculesRefs={this.cardVehiculesRefs}
              handleCardClicked={this.handleCardClicked}
            />
          </section>
        </div>
        <div className="map-container">
          <Map
            markers={markers}
            handleMarkerClicked={this.markerClicked}
            markerSelectedId={markerSelectedId}
          />
        </div>
      </div>
    );
  }
}

export default App;
