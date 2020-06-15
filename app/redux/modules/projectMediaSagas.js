import {
    takeLatest, put, select, call, delay
} from 'redux-saga/effects';
import _ from 'lodash';
import axios from 'axios';
import { ACTIONS_REDUCER, ACTIONS_SAGA, DEFAULTS } from '../shared';

export const getProjectsMedia = (state) => {
    const projectMedia = state.getIn(['projectMedia']);
    return _.get(projectMedia, 'projectMedias');
};

function* fetchProjectMediaData(action) {
    try {
        const fetchedData = yield axios({
            method: 'get',
            url: 'https://indxproapi.azurewebsites.net/inproapi/projectMedia/GetAllProjectMedia'
        }).then((response) => {
            console.log(response);
            return response.data;
        }).catch((error) => {
            throw error;
        });

        yield put({ type: ACTIONS_REDUCER.SET_PROJECT_MEDIA_DATA, value: fetchedData });
    } catch (error) {
        console.log(error);
    } finally {
        // yield put({ type: ACTIONS_REDUCER.ADD_PROFILE_LOADING, value: false });
    }
}

function* upsertProjectMediaData(action) {
    console.log(action);
    const { value } = action;
    // TODO: improve logic
    const data = new FormData();
    data.append('ProjectMediaID', value.ProjectMediaID);
    data.append('ProjectID', value.ProjectID);
    data.append('IsPublished', value.IsPublished);
    data.append('ProjectLocation', value.ProjectLocation);
    data.append('Brand', value.Brand);
    data.append('ScopeOfWork', value.ScopeOfWork);
    data.append('DateOfCompletion', new Date(value.DateOfCompletion).toLocaleDateString());
    data.append('ProjectDescription', value.ProjectDescription);

    let method = '';
    let url = '';

    if (value.ProjectMediaID > 0) {
        method = "put";
        url = `https://indxproapi.azurewebsites.net/inproapi/projectMedia/updateProjectMedia/${value.ProjectMediaID}`
    } else {
        method = "post";
        url = "https://indxproapi.azurewebsites.net/inproapi/projectMedia/create";
    }

    yield axios({
        method: method,
        url: url,
        data,
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
        // handle success
        // console.log(response);
    }).catch((error) => {
        // handle error
        console.log(error);
    });
    yield call(fetchProjectMediaData, { value: null });
}

function* deleteProjectMediaData(action) {
    const { value } = action;
    yield axios({
        method: 'delete',
        url: `https://indxproapi.azurewebsites.net/inproapi/projectMedia/deleteProjectMedia/${value}`,
    }).then((response) => {
        // handle success
        // console.log(response);
    }).catch((error) => {
        // handle error
        console.log(error);
    });
    yield call(fetchProjectMediaData, { value: null });
}

function* setCompnayMediaData() {
    const projectMedias = yield select(getProjectsMedia);
    projectMedias.unshift(DEFAULTS.PROJECT_MEDIA);
    yield put({ type: ACTIONS_REDUCER.SET_PROJECT_MEDIA_DATA, value: projectMedias });
}

const projectMediaSagas = [
    takeLatest(ACTIONS_SAGA.FETCH_PROJECT_MEDIA_DATA, fetchProjectMediaData),
    takeLatest(ACTIONS_SAGA.SET_PROJECT_MEDIA_DATA, setCompnayMediaData),
    takeLatest(ACTIONS_SAGA.UPSERT_PROJECT_MEDIA_DATA, upsertProjectMediaData),
    takeLatest(ACTIONS_SAGA.DELETE_PROJECT_MEDIA_DATA, deleteProjectMediaData)
];

export default projectMediaSagas;
