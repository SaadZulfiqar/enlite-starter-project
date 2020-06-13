import { fromJS, List, Map } from 'immutable';
import notif from '../constants/notifMessage';
import _ from "lodash";

import { ACTIONS_REDUCER } from '../shared';

const initialState = {
  projects: [],
  notifMsg: '',
};

export const projectReducer = (state = initialState, action) => {
  const newState = _.cloneDeep({ ...state });
  switch (action.type) {

    case ACTIONS_REDUCER.SET_PROJECT_DATA:
      newState.projects = action.value;
      break;

    default:
      break;
  }
  return newState;
}

