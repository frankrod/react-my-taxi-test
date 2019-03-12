import React from 'react';
import classNames from 'classnames';
import { Vehicule } from '../types/Vehicule';
import mytaxiLogo from '../images/Mytaxi_logo.png';
import { CardVehiculesRefs } from '../App/App.component';
import Card from '../components/Card';
import './Mytaxi.css';

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
            const title = `${vehicule.type} - ${vehicule.id}`;
            const isActive = vehicule.state === 'ACTIVE';
            return (
              <Card
                key={vehicule.id}
                title={title}
                vehicule={vehicule}
                handleCardClicked={handleCardClicked}
                cardVehiculesRefs={cardVehiculesRefs}
                logo={mytaxiLogo}
                markerSelectedId={markerSelectedId}
              >
                <p>
                  State:{' '}
                  <span
                    className={classNames(
                      'status-text',
                      { 'status-active': isActive },
                      { 'status-inactive': !isActive },
                    )}
                  >
                    {vehicule.state}
                  </span>
                </p>
              </Card>
            );
          })}
      </React.Fragment>
    );
  }
}

export default Mytaxi;
