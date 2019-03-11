import React from 'react';
import classNames from 'classnames';
import './App.css';
import mytaxiLogo from '../images/Mytaxi_logo.png';
import car2goLogo from '../images/Car2go_logo.png';
import mytaxiMarker from '../images/mytaxi_marker.png';
import car2goMarker from '../images/car2go_marker.png';
import { getMytaxiVehicules } from '../services/mytaxi';
import Map, { MapMarker } from '../components/Map';
import { getCar2GoVehicules } from '../services/car2go';
import { Vehicule } from '../types/Vehicule';

export interface AppState {
  mytaxiVehicules: Vehicule[];
  car2goVehicules: Vehicule[];
  markers: MapMarker[];
  Allmarkers: MapMarker[];
  markerSelectedId: number;
  vehiculeFilterBy: string;
}

export interface CardVehiculesRefs {
  [key: number]: any;
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    mytaxiVehicules: [],
    car2goVehicules: [],
    markers: [],
    Allmarkers: [],
    markerSelectedId: 0,
    vehiculeFilterBy: 'noFilter',
  };

  cardVehiculesRefs: CardVehiculesRefs = {};

  async componentDidMount() {
    const mytaxiData = await getMytaxiVehicules();
    const car2goData = await getCar2GoVehicules();

    const mytaxiMarkers = mytaxiData.map(
      ({ id, coordinates, company }): MapMarker => ({
        id,
        coordinates,
        icon: mytaxiMarker,
        company: company,
      }),
    );

    const car2goMarkers = car2goData.map(
      ({ id, coordinates, company }): MapMarker => ({
        id,
        coordinates,
        icon: car2goMarker,
        company: company,
      }),
    );

    this.setState({
      mytaxiVehicules: mytaxiData,
      car2goVehicules: car2goData,
      markers: [...mytaxiMarkers, ...car2goMarkers],
      Allmarkers: [...mytaxiMarkers, ...car2goMarkers],
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
    const { Allmarkers } = this.state;
    let markers;

    if (e.target.value === 'noFilter') {
      markers = Allmarkers;
    } else {
      markers = Allmarkers.filter(marker => marker.company === e.target.value);
    }

    this.setState({
      vehiculeFilterBy: e.target.value,
      markers,
    });
  };

  showMytaxiVehicules() {
    const { mytaxiVehicules, vehiculeFilterBy } = this.state;
    return (
      mytaxiVehicules.length > 0 &&
      (vehiculeFilterBy === 'mytaxi' || vehiculeFilterBy === 'noFilter')
    );
  }

  showCar2goVehicules() {
    const { car2goVehicules, vehiculeFilterBy } = this.state;
    return (
      car2goVehicules.length > 0 &&
      (vehiculeFilterBy === 'car2go' || vehiculeFilterBy === 'noFilter')
    );
  }

  render() {
    const {
      mytaxiVehicules,
      car2goVehicules,
      markerSelectedId,
      vehiculeFilterBy,
      markers,
    } = this.state;
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
            {this.showMytaxiVehicules() &&
              mytaxiVehicules.map(({ data: vehicule }) => {
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
                      <img src={mytaxiLogo} alt="logo" width="50" />
                    </figure>
                    <p>{`${vehicule.type} - ${vehicule.id}`}</p>
                    <div className="card-content">
                      <p>State: {vehicule.state}</p>
                    </div>
                  </div>
                );
              })}
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
