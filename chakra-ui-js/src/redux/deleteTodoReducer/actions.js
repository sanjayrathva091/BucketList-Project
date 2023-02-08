import axios from "axios";
import * as types from './actionTypes.js';

const deleteTodo = (params) => (dispatch) => {
    const token = JSON.parse(sessionStorage.getItem('token'));
    const configs = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return axios
        .delete(`${process.env.REACT_APP_BASE_URL}/api/explorer/delete/todo/${params._id}`, configs)
        .then((res) => { return dispatch({ type: types.DELETE_TODO_SUCCESS, payload: res }); })
        .catch((err) => { return dispatch({ type: types.DELETE_TODO_FAILURE, payload: err }); });
};

export { deleteTodo };