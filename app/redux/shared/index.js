import _ from 'lodash';

export const common = {
  ADD_PROFILE: 'ADD_PROFILE',
  ADD_PROFILE_LOADING: 'ADD_PROFILE_LOADING',
  FETCH_COMPANY_DATA: 'FETCH_COMPANY_DATA',
};

const iterateOverActions = (obj, toAppend) => {
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (typeof obj[property] === 'object') {
        iterateOverActions(obj[property], toAppend);
      } else {
        obj[property] += '_' + toAppend;
      }
    }
  }
};
const clonedReducer = _.cloneDeep(common); const clonedSaga = _.cloneDeep(common);
iterateOverActions(clonedSaga, 'SAGA');
iterateOverActions(clonedReducer, 'REDUCER');
export const ACTIONS_SAGA = clonedSaga;
export const ACTIONS_REDUCER = clonedReducer;
