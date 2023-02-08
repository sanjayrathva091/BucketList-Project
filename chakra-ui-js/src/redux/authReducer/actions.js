import axios from 'axios';

const registerUser = (payload) => (dispatch) => {
    return axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/auth/explorer/register`, payload)
        .then((res) => { return dispatch({ type: 'USER_REGISTER_SUCCESS', payload: res }); })
        .catch((error) => { return dispatch({ type: 'USER_REGISTER_FAILURE', payload: error }); });
};

const loginUser = (payload) => (dispatch) => {
    return axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/auth/explorer/login`, payload)
        .then((res) => { return dispatch({ type: 'USER_LOGIN_SUCCESS', payload: res }) })
        .catch((error) => { return dispatch({ type: 'USER_LOGIN_FAILURE', payload: error }); });
};

export { registerUser, loginUser };