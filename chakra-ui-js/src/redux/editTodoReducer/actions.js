import axios from 'axios';
import * as types from './actionTypes.js';

const editTodo = (params, payload) => (dispatch) => {
    const token = JSON.parse(sessionStorage.getItem('token')) || '';
    const configs = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return axios
        .patch(`${process.env.REACT_APP_BASE_URL}/api/explorer/update/todo/${params._id}`, payload, configs)
        .then((res) => { return dispatch({ type: types.UPDATE_TODO_SUCCESS, payload: res }) })
        .catch((err) => { return dispatch({ type: types.UPDATE_TODO_FAILURE, payload: err }) });
};

export { editTodo };