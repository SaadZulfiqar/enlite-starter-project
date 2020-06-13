/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import history from 'utils/history';

// Global Reducers
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import authReducer from './modules/authReducer';
import uiReducer from './modules/uiReducer';
import { appReducer } from './modules/appReducer';
import { companySliderReducer } from './modules/companySliderReducer';
import initval from './modules/initFormReducer';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    form,
    ui: uiReducer,
    app: appReducer,
    mainSlider: companySliderReducer,
    initval,
    authReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
