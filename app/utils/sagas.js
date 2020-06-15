import { all } from 'redux-saga/effects';
import authSagas from 'enl-redux/modules/authSagas';
import appSagas from 'enl-redux/modules/appSagas';
import companySliderSagas from 'enl-redux/modules/companySliderSagas';
import projectSagas from 'enl-redux/modules/projectSagas';
import projectMediaSagas from 'enl-redux/modules/projectMediaSagas';

export default function* sagas() {
  yield all([
    ...authSagas, ...appSagas, ...companySliderSagas, ...projectSagas,
    ...projectMediaSagas
  ]);
}
