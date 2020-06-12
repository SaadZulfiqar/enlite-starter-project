import axios from "axios";
import {
  call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import { firebaseAuth, firebaseDb } from '../../firebase';
import history from '../../utils/history';
import {
  LOGIN_REQUEST,
  LOGIN_WITH_EMAIL_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_WITH_EMAIL_REQUEST,
  REGISTER_WITH_EMAIL_SUCCESS,
  REGISTER_WITH_EMAIL_SAGA_SUCCESS,
  PASSWORD_FORGET_REQUEST,
} from '../constants/authConstants';
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  loginWithEmailSuccess,
  loginWithEmailFailure,
  syncUser,
  registerWithEmailSuccess,
  registerWithEmailSagaSuccess,
  registerWithEmailFailure,
  createUserSuccess,
  createUserFailure,
  passwordForgetSuccess,
  passwordForgetFailure,
} from '../actions/authActions';

function getUrlVars() {
  const vars = {};
  const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) { // eslint-disable-line
    vars[key] = value;
  });
  return vars;
}

function* loginSaga(provider) {
  try {
    const data = yield call(firebaseAuth.signInWithPopup, provider.payload.authProvider);
    yield put(loginSuccess(data));
    if (getUrlVars().next) {
      // Redirect to next route
      yield history.push(getUrlVars().next);
    } else {
      // Redirect to dashboard if no next parameter
      yield history.push('/app');
    }
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* loginWithEmailSaga(action) {
  try {
    const data = {
      UserName: action.value.getIn(['username']),
      Password: action.value.getIn(['password'])
    };

    const token = yield axios({
      method: 'post',
      url: 'https://indxproapi.azurewebsites.net/inproapi/auth/login',
      data,
    }).then((response) => {
      return response.data;
    }).catch((error) => {
      throw error;
    });

    if (token) {
      localStorage.setItem('id', token);
      yield put(loginWithEmailSuccess(token));
      if (getUrlVars().next) {
        // Redirect to next route
        yield history.push('/app/' + getUrlVars().next);
      } else {
        // Redirect to dashboard if no next parameter
        yield history.push('/app');
      }
    }
  } catch (error) {
    localStorage.removeItem('id');
    yield put(loginWithEmailFailure(error));
  }
}

function* registerWithEmailSaga(action) {
  try {
    const data = {
      Email: action.value.getIn(['email']),
      FirstName: action.value.getIn(['firstName']),
      LastName: action.value.getIn(['lastName']),
      Password: action.value.getIn(['password'])
    };

    yield axios({
      method: 'post',
      url: 'https://indxproapi.azurewebsites.net/inproapi/account/Register',
      data,
    }).then((response) => {
      alert("User has been registered. Please login to continue.");
      return response.data;
    }).catch((error) => {
      throw error;
    });

    yield put(registerWithEmailSagaSuccess());
    // Redirect to dashboard
    yield history.push('/app');
  } catch (error) {
    yield put(registerWithEmailFailure(error));
  }
}

function* logoutSaga() {
  try {
    const data = yield call(firebaseAuth.signOut);
    yield put(logoutSuccess(data));
    // Redirect to home
    yield history.replace('/');
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

function* syncUserSaga() {
  const channel = yield call(firebaseAuth.channel);
  while (true) {
    const { user } = yield take(channel);
    if (user) {
      yield put(syncUser(user));
    } else {
      yield put(syncUser(null));
    }
  }
}

function* createUserSaga({ credential }) {
  try {
    yield call(firebaseDb.create, 'user', {
      email: credential.email,
      displayName: credential.displayName,
      creationTime: credential.metadata.creationTime,
    });
    yield put(createUserSuccess(credential));
  } catch (error) {
    yield put(createUserFailure(error));
  }
}

function* passwordForgetSaga({ email }) {
  try {
    yield call(firebaseAuth.sendPasswordResetEmail, email);
    yield put(passwordForgetSuccess());
  } catch (error) {
    yield put(passwordForgetFailure(error));
  }
}


//= ====================================
//  WATCHERS
//-------------------------------------

function* loginRootSaga() {
  yield fork(syncUserSaga);
  yield all([
    // takeEvery(LOGIN_REQUEST, loginSaga),
    takeEvery(LOGIN_WITH_EMAIL_REQUEST, loginWithEmailSaga),
    takeEvery(REGISTER_WITH_EMAIL_REQUEST, registerWithEmailSaga),
    takeEvery(REGISTER_WITH_EMAIL_SUCCESS, createUserSaga),
    takeEvery(LOGOUT_REQUEST, logoutSaga),
    takeEvery(PASSWORD_FORGET_REQUEST, passwordForgetSaga)
  ]);
}

const authSagas = [
  fork(loginRootSaga),
];

export default authSagas;
