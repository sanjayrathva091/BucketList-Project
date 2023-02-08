import * as types from './actionTypes.js';

const initialState = {
    todo: {},
    isError: false,
    isLoading: false,
    status: '',
    msg: ''
};

const deleteTodoReducer = (oldState = initialState, actions) => {
    const { type, payload } = actions;

    switch (type) {
        case types.DELETE_TODO_REQUEST:
            return {
                ...oldState,
                isError: false,
                isLoading: true,
                status: 'processing',
                msg: 'Request is under processing!'
            }
        case types.DELETE_TODO_SUCCESS:
            return {
                ...oldState,
                todo: payload.data.doc,
                isError: false,
                isLoading: false,
                status: payload.data.status,
                msg: payload.data.message
            }
        case types.DELETE_TODO_FAILURE:
            return {
                ...oldState,
                isError: true,
                isLoading: false,
                status: payload.response.data.status,
                msg: payload.response.data.message
            }
        default:
            return {
                ...oldState
            }
    }
};

export { deleteTodoReducer };