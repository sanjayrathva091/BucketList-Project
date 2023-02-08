
const initialState = {
    todos: [],
    token: '',
    msg: '',
}

const authReducer = (oldState = initialState, actions) => {
    const { type, payload } = actions;

    switch (type) {
        case 'USER_REGISTER_SUCCESS':
            return {
                ...oldState,
                msg: payload.data.message
            }
        case 'USER_REGISTER_FAILURE':
            return {
                ...oldState,
                msg: payload.response.data.message
            }
        case 'USER_LOGIN_SUCCESS':
            sessionStorage.setItem('token', JSON.stringify(payload.data.accessToken));
            return {
                ...oldState,
                token: payload.data.accessToken
            }
        case 'USER_LOGIN_FAILURE':
            return {
                ...oldState,
                msg: payload.response.data.message
            }
        default:
            const token = JSON.parse(sessionStorage.getItem('token')) || '';
            return {
                ...oldState,
                token: token
            }
    }
};

export { authReducer };