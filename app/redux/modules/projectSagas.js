import {
    takeLatest, put, select, call, delay
} from 'redux-saga/effects';
import _ from 'lodash';
import axios from 'axios';
import { ACTIONS_REDUCER, ACTIONS_SAGA, DEFAULTS } from '../shared';

export const getProjects = (state) => {
    const project = state.getIn(['project']);
    return _.get(project, 'projects');
};

function* fetchProjectData(action) {
    try {
        const fetchedData = yield axios({
            method: 'get',
            url: 'https://indxproapi.azurewebsites.net/inproapi/project/GetAllProject'
        }).then((response) => {
            console.log(response);
            return response.data;
        }).catch((error) => {
            throw error;
        });

        yield put({ type: ACTIONS_REDUCER.SET_PROJECT_DATA, value: fetchedData });
    } catch (error) {
        console.log(error);
    } finally {
        // yield put({ type: ACTIONS_REDUCER.ADD_PROFILE_LOADING, value: false });
    }
}

function* upsertProjectData(action) {
    console.log(action);
    const { value } = action;
    // TODO: improve logic
    const data = new FormData();
    data.append('ProjectID', value.ProjectID);
    data.append('ClientID', value.ClientID);
    data.append('ProjectRefNo', value.ProjectRefNo);
    data.append('DepartmentID', value.DepartmentID);
    data.append('ProjectName', value.ProjectName);
    data.append('ProjectStatus', value.ProjectStatus);
    data.append('TotalProjectBudget', value.TotalProjectBudget);
    data.append('StartingDate', new Date(value.StartingDate).toLocaleDateString());
    data.append('Deadline', new Date(value.Deadline).toLocaleDateString());
    data.append('CompletionDate', new Date(value.CompletionDate).toLocaleDateString());
    data.append('ContractID', value.ContractID);

    let method = '';
    let url = '';

    if (value.ProjectID > 0) {
        method = "put";
        url = `https://indxproapi.azurewebsites.net/inproapi/project/updateproject/${value.ProjectID}`
    } else {
        method = "post";
        url = "https://indxproapi.azurewebsites.net/inproapi/project/create";
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
    yield call(fetchProjectData, { value: null });
}

function* deleteProjectData(action) {
    const { value } = action;
    yield axios({
        method: 'delete',
        url: `https://indxproapi.azurewebsites.net/inproapi/project/deleteproject/${value}`,
    }).then((response) => {
        // handle success
        // console.log(response);
    }).catch((error) => {
        // handle error
        console.log(error);
    });
    yield call(fetchProjectData, { value: null });
}

function* setCompnayData() {
    const projects = yield select(getProjects);
    projects.unshift(DEFAULTS.PROJECT);
    yield put({ type: ACTIONS_REDUCER.SET_PROJECT_DATA, value: projects });
}

const projectSagas = [
    takeLatest(ACTIONS_SAGA.FETCH_PROJECT_DATA, fetchProjectData),
    takeLatest(ACTIONS_SAGA.SET_PROJECT_DATA, setCompnayData),
    takeLatest(ACTIONS_SAGA.UPSERT_PROJECT_DATA, upsertProjectData),
    takeLatest(ACTIONS_SAGA.DELETE_PROJECT_DATA, deleteProjectData)
];

export default projectSagas;
