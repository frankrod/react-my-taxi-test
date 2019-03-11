import * as ActionTypes from './constants';
import { Vehicule } from '../types/Vehicule';

export interface GetCar2goVehicules {
  type: 'GET_CAR_2_GO_VEHICULES';
}

export interface GetCar2goVehiculesSuccess {
  type: 'GET_CAR_2_GO_VEHICULES_SUCCESS';
  payload: Vehicule[];
}

export interface GetCar2goVehiculesFail {
  type: 'GET_CAR_2_GO_VEHICULES_FAIL';
  payload: Error;
}

export type Car2goAction =
  | GetCar2goVehicules
  | GetCar2goVehiculesSuccess
  | GetCar2goVehiculesFail;

export function getCar2goVehicules(): Car2goAction {
  return {
    type: ActionTypes.GET_CAR_2_GO_VEHICULES,
  };
}

export function getCar2goVehiculesSuccess(result: Vehicule[]): Car2goAction {
  return {
    type: ActionTypes.GET_CAR_2_GO_VEHICULES_SUCCESS,
    payload: result,
  };
}

export function getCar2goVehiculesFail(error: Error): Car2goAction {
  return {
    type: ActionTypes.GET_CAR_2_GO_VEHICULES_FAIL,
    payload: error,
  };
}
