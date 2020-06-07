import {
  takeLatest, put, select, call, delay
} from 'redux-saga/effects';
import _ from 'lodash';
import { ACTIONS_REDUCER, ACTIONS_SAGA } from '../shared';

function* addProfile(action) {
  try {
    // yield put({ type: ACTIONS_REDUCER.ADD_PROFILE_LOADING, value: true });
    // const account = yield APICall({
    //     method: 'get',
    //     url: `/account/getAccountById/1`
    // }).then((response) => response, (error) => null);
    yield put({ type: ACTIONS_REDUCER.ADD_PROFILE, value: action.value });
  } catch (error) {
    console.log(error);
  } finally {
    // yield put({ type: ACTIONS_REDUCER.ADD_PROFILE_LOADING, value: false });
  }
}


const appSagas = [
  takeLatest(ACTIONS_SAGA.ADD_PROFILE, addProfile)
];

export default appSagas;
