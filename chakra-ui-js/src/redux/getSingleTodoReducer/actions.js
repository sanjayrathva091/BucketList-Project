import axios from 'axios';
import * as types from './actionTypes.js';

const fetchSingleTodo = (params) => (dispatch) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const configs = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/explorer/get/todo/${params._id}`, configs)
        .then((res) => { return dispatch({ type: types.GET_SINGLE_TODO_SUCCESS, payload: res }) })
        .catch((err) => { return dispatch({ type: types.GET_SINGLE_TODO_FAILURE, payload: err }) });
};

export { fetchSingleTodo };