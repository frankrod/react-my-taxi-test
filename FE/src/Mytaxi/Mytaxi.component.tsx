import React from 'react';
import classNames from 'classnames';
import { Vehicule } from '../types/Vehicule';
import mytaxiLogo from '../images/Mytaxi_logo.png';
import { CardVehiculesRefs } from '../App/App';

export interface MyTaxiProps {
  getMytaxiVehicules: () => void;
  mytaxiVehicules: Vehicule[];
  vehiculeFilterBy: string;
  markerSelectedId: number;
  handleCardClicked: (id: number) => () => void;
  cardVehiculesRefs: CardVehiculesRefs;
}

class Mytaxi extends React.Component<MyTaxiProps> {
  componentDidMount() {
    this.props.getMytaxiVehicules();
  }

  showMytaxiVehicules() {
    const { mytaxiVehicules, vehiculeFilterBy } = this.props;
    return (
      mytaxiVehicules.length > 0 &&
      (vehiculeFilterBy === 'mytaxi' || vehiculeFilterBy === 'noFilter')
    );
  }

  render() {
    const {
      mytaxiVehicules,
      markerSelectedId,
      handleCardClicked,
      cardVehiculesRefs,
    } = this.props;
    return (
      <React.Fragment>
        {this.showMytaxiVehicules() &&
          mytaxiVehicules.map(({ data: vehicule }) => {
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
                  <img src={mytaxiLogo} alt="logo" width="50" />
                </figure>
                <p>{`${vehicule.type} - ${vehicule.id}`}</p>
                <div className="card-content">
                  <p>State: {vehicule.state}</p>
                </div>
              </div>
            );
          })}
      </React.Fragment>
    );
  }
}

export default Mytaxi;
