import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Mytaxi from './Mytaxi.component';
import * as MytaxiActions from './Mytaxi.actions';
import { GlobalState } from '../types/GlobalState';

export const mapStateToProps = ({ mytaxi }: GlobalState) => ({
  mytaxiVehicules: mytaxi.mytaxiVehicules,
});

export const mapDispatchToProps = (
  dispatch: Dispatch<MytaxiActions.MytaxiAction>,
) => ({
  getMytaxiVehicules: () => dispatch(MytaxiActions.getMytaxiVehicules()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Mytaxi);
