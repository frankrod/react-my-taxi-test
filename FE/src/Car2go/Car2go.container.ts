import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Car2go from './Car2go.component';
import * as Car2goActions from './Car2go.actions';
import { GlobalState } from '../types/GlobalState';

export const mapStateToProps = ({ car2go }: GlobalState) => ({
  car2goVehicules: car2go.car2goVehicules,
});

export const mapDispatchToProps = (
  dispatch: Dispatch<Car2goActions.Car2goAction>,
) => ({
  getCar2goVehicules: () => dispatch(Car2goActions.getCar2goVehicules()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Car2go);
