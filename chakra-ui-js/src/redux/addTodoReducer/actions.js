import axios from "axios";
import * as types from './actionTypes';

const sendTodo = (payload) => (dispatch) => {
    const token = JSON.parse(sessionStorage.getItem('token'));
    const configs = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/explorer/create/todo`, payload, configs)
        .then((res) => { return dispatch({ type: types.ADD_TODO_SUCCESS, payload: res }) })
        .catch((err) => { return dispatch({ type: types.ADD_TODO_FAILURE, payload: err }) });

};

export { sendTodo };