import React from 'react';
import classNames from 'classnames';
import './App.css';

import car2goLogo from '../images/Car2go_logo.png';
import car2goMarker from '../images/car2go_marker.png';
import Map, { MapMarker } from '../components/Map';
import { getCar2GoVehicules } from '../services/car2go';
import { Vehicule } from '../types/Vehicule';
import Mytaxi from '../Mytaxi';

export interface AppState {
  mytaxiVehicules: Vehicule[];
  car2goVehicules: Vehicule[];
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
    mytaxiVehicules: [],
    car2goVehicules: [],
    markers: this.props.markers,
    allMarkers: this.props.allMarkers,
    markerSelectedId: 0,
    vehiculeFilterBy: 'noFilter',
  };

  cardVehiculesRefs: CardVehiculesRefs = {};

  async componentDidMount() {
    const car2goData = await getCar2GoVehicules();

    const car2goMarkers = car2goData.map(
      ({ id, coordinates, company }): MapMarker => ({
        id,
        coordinates,
        icon: car2goMarker,
        company: company,
      }),
    );

    this.setState({
      car2goVehicules: car2goData,
    });
  }

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

  showCar2goVehicules() {
    const { car2goVehicules, vehiculeFilterBy } = this.state;
    return (
      car2goVehicules.length > 0 &&
      (vehiculeFilterBy === 'car2go' || vehiculeFilterBy === 'noFilter')
    );
  }

  render() {
    const { car2goVehicules, markerSelectedId, vehiculeFilterBy } = this.state;
    return (
      <div className="App">
        <div className="app-sidebar">
          <header className="app-header">
            <p> List of vehicules </p>
            <label>
              <input
                type="radio"
                name="vehicules-filter"
                value="noFilter"
                checked={vehiculeFilterBy === 'noFilter'}
                onChange={this.handleVehiculeFilter}
                className="form-check-input"
              />
              All
            </label>
            <label>
              <input
                type="radio"
                name="vehicules-filter"
                value="mytaxi"
                onChange={this.handleVehiculeFilter}
                className="form-check-input"
              />
              Mytaxi
            </label>
            <label>
              <input
                type="radio"
                name="vehicules-filter"
                value="car2go"
                onChange={this.handleVehiculeFilter}
                className="form-check-input"
              />
              Car2go
            </label>
          </header>
          <section className="vehicules-list">
            <Mytaxi
              vehiculeFilterBy={vehiculeFilterBy}
              markerSelectedId={markerSelectedId}
              cardVehiculesRefs={this.cardVehiculesRefs}
              handleCardClicked={this.handleCardClicked}
            />
            {/* Car2go starts here */}
            {this.showCar2goVehicules() &&
              car2goVehicules.map(({ data: vehicule }) => {
                this.cardVehiculesRefs[vehicule.id] = React.createRef<
                  HTMLElement
                >();
                return (
                  <div
                    className={classNames('card-container', {
                      'selected-row': vehicule.id === markerSelectedId,
                    })}
                    key={vehicule.id}
                    ref={this.cardVehiculesRefs[vehicule.id]}
                    onClick={this.handleCardClicked(vehicule.id)}
                  >
                    <figure>
                      <img src={car2goLogo} alt="logo" width="50" />
                    </figure>
                    <p>{`${vehicule.name} - ${vehicule.id}`}</p>
                    <div className="card-content">
                      <p>State: {vehicule.address}</p>
                    </div>
                  </div>
                );
              })}
          </section>
        </div>
        <div className="map-container">
          <Map
            markers={this.props.markers}
            handleMarkerClicked={this.markerClicked}
            markerSelectedId={markerSelectedId}
          />
        </div>
      </div>
    );
  }
}

export default App;
