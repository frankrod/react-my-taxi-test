import * as ActionTypes from './constants';
import { Vehicule } from '../types/Vehicule';

export interface GetMyTaxiVehicules {
  type: 'GET_MY_TAXI_VEHICULES';
}

export interface GetMyTaxiVehiculesSuccess {
  type: 'GET_MY_TAXI_VEHICULES_SUCCESS';
  payload: Vehicule[];
}

export interface GetMyTaxiVehiculesFail {
  type: 'GET_MY_TAXI_VEHICULES_FAIL';
  payload: Error;
}

export type MytaxiAction =
  | GetMyTaxiVehiculesSuccess
  | GetMyTaxiVehicules
  | GetMyTaxiVehiculesFail;

export function getMytaxiVehicules(): MytaxiAction {
  return {
    type: ActionTypes.GET_MY_TAXI_VEHICULES,
  };
}

export function getMytaxiVehiculesSuccess(result: Vehicule[]): MytaxiAction {
  return {
    type: ActionTypes.GET_MY_TAXI_VEHICULES_SUCCESS,
    payload: result,
  };
}

export function getMytaxiVehiculesFail(error: Error): MytaxiAction {
  return {
    type: ActionTypes.GET_MY_TAXI_VEHICULES_FAIL,
    payload: error,
  };
}
