import React from 'react';
import classNames from 'classnames';
import { Vehicule } from '../types/Vehicule';
import { CardVehiculesRefs } from '../App/App';
import car2goLogo from '../images/Car2go_logo.png';

export interface Car2goProps {
  getCar2goVehicules: () => void;
  car2goVehicules: Vehicule[];
  vehiculeFilterBy: string;
  markerSelectedId: number;
  handleCardClicked: (id: number) => () => void;
  cardVehiculesRefs: CardVehiculesRefs;
}

class Car2go extends React.Component<Car2goProps> {
  componentDidMount() {
    this.props.getCar2goVehicules();
  }

  showCar2goVehicules() {
    const { car2goVehicules, vehiculeFilterBy } = this.props;
    return (
      car2goVehicules.length > 0 &&
      (vehiculeFilterBy === 'car2go' || vehiculeFilterBy === 'noFilter')
    );
  }

  render() {
    const {
      car2goVehicules,
      markerSelectedId,
      handleCardClicked,
      cardVehiculesRefs,
    } = this.props;
    return (
      <React.Fragment>
        {this.showCar2goVehicules() &&
          car2goVehicules.map(({ data: vehicule }) => {
            cardVehiculesRefs[vehicule.id] = React.createRef<HTMLElement>();
            return (
              <div
                className={classNames('card-container', {
                  'selected-row': vehicule.id === markerSelectedId,
                })}
                key={vehicule.id}
                ref={cardVehiculesRefs[vehicule.id]}
                onClick={handleCardClicked(vehicule.id)}
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
      </React.Fragment>
    );
  }
}

export default Car2go;
