import _ from 'lodash';

export const DEFAULTS = {
  COMPANY: {
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
  },
  MAINSLIER: {
    companyID: 0,
    companyMainImageID: 0,
    image: "",
    isPublished: false,
    edited: true
  },
  PROJECT: {
    projectID: 0,
    clientID: 0,
    projectRefNo: '',
    departmentID: 0,
    projectName: '',
    projectStatus: 'Live',
    totalProjectBudget: 0,
    startingDate: new Date(),
    deadline: new Date(),
    completionDate: new Date(),
    contractID: 0,
    edited: true
  },
  PROJECT_MEDIA: {
    projectMediaID: 0,
    projectID: 0,
    isPublished: true,
    projectLocation: '',
    brand: '',
    scopeOfWork: '',
    dateOfCompletion: new Date(),
    projectDescription: '',
    edited: true
  }
};

export const common = {
  ADD_PROFILE: 'ADD_PROFILE',
  ADD_PROFILE_LOADING: 'ADD_PROFILE_LOADING',
  FETCH_COMPANY_DATA: 'FETCH_COMPANY_DATA',
  UPSERT_COMPANY_DATA: 'UPSERT_COMPANY_DATA',
  SET_COMPANY_DATA: 'SET_COMPANY_DATA',
  DELETE_COMPANY_DATA: 'DETELE_COMPANY_DATA',

  COMPANY_CREATE: 'COMPANY_CREATE',
  COMPANY_CREATE_LOADING: 'COMPANY_CREATE_LOADING',

  // Main Slider
  FETCH_COMPANY_MAIN_SLIDER: 'FETCH_COMPANY_MAIN_SLIDER',
  SET_COMPANY_MAIN_SLIDER: 'SET_COMPANY_MAIN_SLIDER',
  UPSERT_COMPANY_MAIN_SLIDER: 'UPSERT_COMPANY_MAIN_SLIDER',
  DELETE_COMPANY_MAIN_SLIDER_DATA: 'DELETE_COMPANY_MAIN_SLIDER_DATA',

  // Project
  FETCH_PROJECT_DATA: 'FETCH_PROJECT_DATA',
  SET_PROJECT_DATA: 'SET_PROJECT_DATA',
  UPSERT_PROJECT_DATA: 'UPSERT_PROJECT_DATA',
  DELETE_PROJECT_DATA: 'DELETE_PROJECT_DATA',

  // Project Media
  FETCH_PROJECT_MEDIA_DATA: 'FETCH_PROJECT_MEDIA_DATA',
  SET_PROJECT_MEDIA_DATA: 'SET_PROJECT_MEDIA_DATA',
  UPSERT_PROJECT_MEDIA_DATA: 'UPSERT_PROJECT_MEDIA_DATA',
  DELETE_PROJECT_MEDIA_DATA: 'DELETE_PROJECT_MEDIA_DATA'
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
