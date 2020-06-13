import {
    takeLatest, put, select, call, delay
  } from 'redux-saga/effects';
  import _ from 'lodash';
  import axios from 'axios';
  import { ACTIONS_REDUCER, ACTIONS_SAGA, DEFAULTS } from '../shared';
  
  export const getMainSlider = (state) => {
    const mainSlider = state.getIn(['mainSlider']);
    return _.get(mainSlider, 'companySlider');
  };
  
  function* fetchCompanyMainSlider(action) {
    try {
      const fetchedData = yield fetch('https://indxproapi.azurewebsites.net/inproapi/CompanyMainImage/GetAllCompanyMainImage',
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
      yield put({ type: ACTIONS_REDUCER.SET_COMPANY_MAIN_SLIDER, value: fetchedData });
    } catch (error) {
      console.log(error);
    } finally {
      // yield put({ type: ACTIONS_REDUCER.ADD_PROFILE_LOADING, value: false });
    }
  }
  
  function* upsertCompanyMainSlider(action) {
    console.log(action);
    const { value } = action;
    debugger;
    // TODO: improve logic
    const data = new FormData();
    const files = value.image;
    console.log(files);
  
    // if (files && files.length) {
    //   for (let x = 0; x < files.length; x++) {
    //     console.log(files[x]);
    //     data.append('LogoFormFile', files[x]); // append file
    //   }
    // }
    data.append('companyMainImageID', value.companyMainImageID);
    data.append('CompanyId', 1); //HARDCODE FOR NOW
    if (files[0] != undefined) {
      data.append('image', files[0]);
    }
  
    let method = '';
    let url = '';
  
    if (value.CompanyId > 0) {
      method = "put";
      url = `https://indxproapi.azurewebsites.net/inproapi/CompanyMainImage/UpdateCompanyMainImage/${value.companyMainImageID}`
    } else {
      method = "post";
      url = "https://indxproapi.azurewebsites.net/inproapi/CompanyMainImage/create";
    }
  
    yield axios({
      method: method,
      url: url,
      data,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      // handle success
      console.log(response);
    }).catch((response) => {
      // handle error
      console.log(response);
    });
    yield call(fetchCompanyMainSlider, { value: null });
  }
  
  function* deleteCompnayMainSlideData(action) {
    console.log(action);
    debugger;
    const { value } = action;
  
    yield axios({
      method: 'delete',
      url: `https://indxproapi.azurewebsites.net/inproapi/CompanyMainImage/DeleteCompanyMainImage/${value}`,
    }).then((response) => {
      // handle success
      deleteMainSliderData(value);
      console.log(response);
    }).catch((response) => {
      // handle error
      console.log(response);
    });
    yield call(fetchCompanyMainSlider, { value: null });
  }
  
  function convertResults(results) {
    for (let index = 0; index < results.length; index++) {
      results[index].edited = false; // default value;
      results[index].image = 'https://indxproapi.azurewebsites.net/' + results[index].image;
    }
    // console.log(results);
    return results;
  }
  
  function* setMainSliderData() {
    const companySlides = yield select(getMainSlider);
    companySlides.unshift(DEFAULTS.MAINSLIER);
    yield put({ type: ACTIONS_REDUCER.SET_COMPANY_MAIN_SLIDER, value: companySlides });
  }
  
  function* deleteMainSliderData(index) {
    const companySlides = yield select(getMainSlider);
    companySlides.splice(index, 1);
    yield put({ type: ACTIONS_REDUCER.SET_COMPANY_MAIN_SLIDER, value: companySlides });
  }
  
  
  
  const companySliderSagas = [
    takeLatest(ACTIONS_SAGA.FETCH_COMPANY_MAIN_SLIDER, fetchCompanyMainSlider),
    takeLatest(ACTIONS_SAGA.SET_COMPANY_MAIN_SLIDER, setMainSliderData),
    takeLatest(ACTIONS_SAGA.UPSERT_COMPANY_MAIN_SLIDER, upsertCompanyMainSlider),
    takeLatest(ACTIONS_SAGA.DELETE_COMPANY_MAIN_SLIDER_DATA, deleteCompnayMainSlideData),
    // takeLatest(ACTIONS_SAGA.COMPANY_CREATE, companyCreate),
    // takeLatest(ACTIONS_SAGA.UPSERT_COMPANY_DATA, upsertCompany),
    // takeLatest(ACTIONS_SAGA.SET_COMPANY_DATA, setCompnayData),
    // takeLatest(ACTIONS_SAGA.DELETE_COMPANY_DATA, deleteCompnayData),
  
  ];
  
  export default companySliderSagas;
  