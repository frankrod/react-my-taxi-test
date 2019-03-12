import React from 'react';
import classNames from 'classnames';
import { Vehicule } from '../types/Vehicule';
import { CardVehiculesRefs } from '../App/App.component';
import car2goLogo from '../images/Car2go_logo.png';
import Card from '../components/Card';
import './Car2go.css';

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
            const title = `${vehicule.name} - ${vehicule.id}`;
            const lowFuel = vehicule.fuel < 40;
            return (
              <Card
                key={vehicule.id}
                title={title}
                vehicule={vehicule}
                handleCardClicked={handleCardClicked}
                cardVehiculesRefs={cardVehiculesRefs}
                logo={car2goLogo}
                markerSelectedId={markerSelectedId}
              >
                <p>Address: {vehicule.address}</p>
                <p>
                  Fuel:{' '}
                  <span
                    className={classNames(
                      'fuel-text',
                      {
                        'low-fuel': lowFuel,
                      },
                      {
                        'ok-fuel': !lowFuel,
                      },
                    )}
                  >
                    {vehicule.fuel}
                  </span>
                </p>
              </Card>
              // <div
              //   className={classNames('card-container', {
              //     'selected-row': vehicule.id === markerSelectedId,
              //   })}
              //   key={vehicule.id}
              //   ref={cardVehiculesRefs[vehicule.id]}
              //   onClick={handleCardClicked(vehicule.id)}
              // >
              //   <figure className="logo-fig">
              //     <img src={car2goLogo} alt="logo" width="50" />
              //   </figure>
              //   <div>
              //     <p data-testid="card-title-text">{`${vehicule.name} - ${
              //       vehicule.id
              //     }`}</p>
              //   </div>
              // </div>
            );
          })}
      </React.Fragment>
    );
  }
}

export default Car2go;
