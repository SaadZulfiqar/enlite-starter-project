import { fromJS, List, Map } from 'immutable';
import notif from '../constants/notifMessage';
import _ from "lodash";

import { ACTIONS_REDUCER } from '../shared';

const initialState = {
  companySlider: [],
  notifMsg: '',
};

export const companySliderReducer = (state = initialState, action) => {
  const newState = _.cloneDeep({ ...state });
  switch (action.type) {

    case ACTIONS_REDUCER.SET_COMPANY_MAIN_SLIDER:
      newState.companySlider = action.value;
      break;

    case ACTIONS_REDUCER.ADD_PROFILE:
      break;

    default:
      break;
  }
  return newState;
}

