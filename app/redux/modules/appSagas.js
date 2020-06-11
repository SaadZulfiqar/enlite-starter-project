import {
  takeLatest, put, select, call, delay
} from 'redux-saga/effects';
import _ from 'lodash';
import axios from 'axios';
import { ACTIONS_REDUCER, ACTIONS_SAGA } from '../shared';

function* fetchCompanyData(action) {
  try {
    // yield put({ type: ACTIONS_REDUCER.ADD_PROFILE_LOADING, value: true });
    // const account = yield APICall({
    //     method: 'get',
    //     url: `/account/getAccountById/1`
    // }).then((response) => response, (error) => null);
    // yield put({ type: ACTIONS_REDUCER.ADD_PROFILE, value: action.value });

    const fetchedData = yield fetch('https://indxproapi.azurewebsites.net/inproapi/company/GetAllCompany',
      {
        method: 'GET'
      }
    )
      .then(res => res.json())
      .then(
        (results) => {
          console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
          console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
          console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
          console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
          console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
          // console.log(results);
          if (results && results.length > 0) {
            return convertResults(results);
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          Console.length(error);
        });
    yield put({ type: ACTIONS_REDUCER.FETCH_COMPANY_DATA, value: fetchedData });
  } catch (error) {
    console.log(error);
  } finally {
    // yield put({ type: ACTIONS_REDUCER.ADD_PROFILE_LOADING, value: false });
  }
}

export const DEFAULTS = {
  COMPANY: {
    companyID: 0,
    companyName: '',
    logo: null,
    logoPath: null,
    officeNoAndBuilding: '',
    city: '',
    country: '',
    email: '',
    phone: '',
    mobile: '',
    contactName: '',
    contactTitle: '',
  }
};

function* upsertCompany(action) {
  console.log(action);
  const { value } = action;
  
  // TODO: improve logic
  const data = new FormData();
  const files = value.logoPath;
  // console.log(files);

  // if (files && files.length) {
  //   for (let x = 0; x < files.length; x++) {
  //     console.log(files[x]);
  //     data.append('LogoFormFile', files[x]); // append file
  //   }
  // }
  data.append('CompanyId', value.CompanyId);
  data.append('CompanyName', value.CompanyName);
  data.append('OfficeNoAndBuilding', value.OfficeNoAndBuilding);
  data.append('City', value.City);
  data.append('Country', value.Country);
  data.append('Email', value.Email);
  data.append('Phone', value.Phone);
  data.append('Mobile', value.Mobile);
  data.append('ContactName', value.ContactName);
  data.append('ContactTitle', value.ContactTitle);
  if(files[0] != undefined){
    data.append('LogoFormFile', files[0]);
  }

  yield axios({
    method: 'put',
    url: `https://indxproapi.azurewebsites.net/inproapi/Company/UpdateCompany/${value.CompanyId}`,
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then((response) => {
    // handle success
    console.log(response);
  }).catch((response) => {
    // handle error
    console.log(response);
  });
  yield call(fetchCompanyData, { value: null });
}

function convertResults(results) {
  for (let index = 0; index < results.length; index++) {
    results[index].id = results[index].companyID;// adding id for datatables converting
    results[index].edited = false; // default value;
    results[index].logoPath = 'https://indxproapi.azurewebsites.net/' + results[index].logoPath;
  }
  // console.log(results);
  return results;
}

const appSagas = [
  takeLatest(ACTIONS_SAGA.FETCH_COMPANY_DATA, fetchCompanyData),
  // takeLatest(ACTIONS_SAGA.COMPANY_CREATE, companyCreate),
  takeLatest(ACTIONS_SAGA.UPSERT_COMPANY_DATA, upsertCompany),
  
];

export default appSagas;
