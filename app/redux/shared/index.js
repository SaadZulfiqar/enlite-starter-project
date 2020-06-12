import _ from 'lodash';

export const DEFAULTS = {
  COMPANY:{
      id: 0,
      companyID: 0,
      logo: null,
      companyName: "",
      officeNoAndBuilding: "",
      city: "",
      country: "",
      email: "",
      phone: "",
      mobile: "",
      contactName: "",
      contactTitle: "",
      edited: true
  }
};

export const common = {
  ADD_PROFILE: 'ADD_PROFILE',
  ADD_PROFILE_LOADING: 'ADD_PROFILE_LOADING',
  FETCH_COMPANY_DATA: 'FETCH_COMPANY_DATA',
  UPSERT_COMPANY_DATA: 'UPSERT_COMPANY_DATA',
  SET_COMPANY_DATA: 'SET_COMPANY_DATA',

  COMPANY_CREATE: 'COMPANY_CREATE',
  COMPANY_CREATE_LOADING: 'COMPANY_CREATE_LOADING',
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
