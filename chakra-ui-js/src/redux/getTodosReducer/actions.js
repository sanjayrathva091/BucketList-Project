import axios from "axios";
import * as types from './actionTypes.js';

const fetchTodos = () => (dispatch) => {
    const token = JSON.parse(sessionStorage.getItem('token'));
    const configs = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/explorer/get/todos`, configs)
        .then((res) => { return dispatch({ type: types.GET_TODOS_SUCCESS, payload: res }) })
        .catch((error) => { return dispatch({ type: types.GET_TODOS_FAILURE, payload: error }) });
};

export { fetchTodos };