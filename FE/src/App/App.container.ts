import { connect } from 'react-redux';
import { GlobalState } from '../types/GlobalState';
import { getMarkers } from './App.selectors';
import App from './App';

export const mapStateToProps = (globalState: GlobalState) => ({
  markers: getMarkers(globalState),
  allMarkers: getMarkers(globalState),
});

export default connect(mapStateToProps)(App);
