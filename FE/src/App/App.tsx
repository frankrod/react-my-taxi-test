import React from 'react';
import './App.css';
import mytaxiLogo from '../images/Mytaxi_logo.png';
import { getTaxis, MyTaxiVehicleData } from '../services/mytaxi';
import Map from '../components/Map';

export interface AppState {
  mytaxiVehicules: MyTaxiVehicleData[];
}
class App extends React.Component<{}, AppState> {
  state: AppState = {
    mytaxiVehicules: [],
  };

  async componentDidMount() {
    const taxyData = await getTaxis();
    // const car2goData = await get('car2go/vehicles');

    this.setState({ mytaxiVehicules: taxyData });
    console.log(taxyData);
    // console.log(car2goData);
  }

  render() {
    const { mytaxiVehicules } = this.state;
    return (
      <div className="App">
        <div className="app-sidebar">
          <header className="app-header">
            <p> List of vehicules </p>
          </header>
          <section className="vehicules-list">
            {mytaxiVehicules.map(vehicule => {
              return (
                <div className="card-container" key={vehicule.id}>
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
          </section>
        </div>
        <div className="map-container">
          <Map vehicules={mytaxiVehicules} />
        </div>
      </div>
    );
  }
}

export default App;
