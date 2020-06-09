import {
  takeLatest, put, select, call, delay
} from 'redux-saga/effects';
import _ from 'lodash';
import { ACTIONS_REDUCER, ACTIONS_SAGA } from '../shared';

function* fetchCompanyData(action) {
  try {
    // yield put({ type: ACTIONS_REDUCER.ADD_PROFILE_LOADING, value: true });
    // const account = yield APICall({
    //     method: 'get',
    //     url: `/account/getAccountById/1`
    // }).then((response) => response, (error) => null);
    // yield put({ type: ACTIONS_REDUCER.ADD_PROFILE, value: action.value });

    const aa = yield fetch('https://indxproapi.azurewebsites.net/inproapi/company/GetAllCompany',
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
    yield put({ type: 'app/FETCH_DATA', branch: 'app', items: aa });
  } catch (error) {
    console.log(error);
  } finally {
    // yield put({ type: ACTIONS_REDUCER.ADD_PROFILE_LOADING, value: false });
  }
}

function convertResults(results) {
  for (let index = 0; index < results.length; index++) {
    results[index].id = results[index].companyID;// adding id for datatables converting
    results[index].edited = false; // default value;
    results[index].logoPath = 'https://indxproapi.azurewebsites.net/' + results[index].logoPath;
  }
  console.log(results);
  return results;
}


const appSagas = [
  takeLatest(ACTIONS_SAGA.FETCH_COMPANY_DATA, fetchCompanyData)
];

export default appSagas;
