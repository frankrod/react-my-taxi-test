import React from 'react';

export interface HeaderProps {
  vehiculeFilterBy: string;
  handleVehiculeFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  vehiculeFilterBy,
  handleVehiculeFilter,
}) => {
  return (
    <React.Fragment>
      <p> List of vehicules </p>
      <label>
        <input
          type="radio"
          name="vehicules-filter"
          value="noFilter"
          checked={vehiculeFilterBy === 'noFilter'}
          onChange={handleVehiculeFilter}
          className="form-check-input"
        />
        All
      </label>
      <label>
        <input
          type="radio"
          name="vehicules-filter"
          value="mytaxi"
          onChange={handleVehiculeFilter}
          className="form-check-input"
        />
        Mytaxi
      </label>
      <label>
        <input
          type="radio"
          name="vehicules-filter"
          value="car2go"
          onChange={handleVehiculeFilter}
          className="form-check-input"
        />
        Car2go
      </label>
    </React.Fragment>
  );
};

export default Header;
