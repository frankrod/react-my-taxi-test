import React from 'react';
import classNames from 'classnames';
import { CardVehiculesRefs } from '../../App/App.component';
import { Vehicule } from '../../types/Vehicule';
import './Card.css';

export interface CardProps {
  vehicule: Vehicule;
  markerSelectedId: number;
  cardVehiculesRefs: CardVehiculesRefs;
  handleCardClicked: (id: number) => () => void;
  logo: string;
  title: string;
}

const Card: React.FunctionComponent<CardProps> = ({
  vehicule,
  markerSelectedId,
  cardVehiculesRefs,
  handleCardClicked,
  logo,
  children,
  title,
}) => {
  return (
    <div
      className={classNames('card-container', {
        'selected-row': vehicule.id === markerSelectedId,
      })}
      key={vehicule.id}
      ref={cardVehiculesRefs[vehicule.id]}
      onClick={handleCardClicked(vehicule.id)}
    >
      <figure className="logo-fig">
        <img src={logo} alt="logo" width="50" />
      </figure>
      <div>
        <p data-testid="card-title-text">{title}</p>
        {children}
      </div>
    </div>
  );
};

export default Card;
