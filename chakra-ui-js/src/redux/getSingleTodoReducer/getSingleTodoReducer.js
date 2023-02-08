import * as types from './actionTypes.js';

const initialState = {
    todo: null,
    isError: false,
    isLoading: false,
    status: '',
    msg: ''
};

const getSingleTodoReducer = (oldState = initialState, actions) => {
    const { type, payload } = actions;

    switch (type) {
        case types.GET_SINGLE_TODO_REQUEST:
            return {
                ...oldState,
                isLoading: true
            }
        case types.GET_SINGLE_TODO_SUCCESS:
            return {
                ...oldState,
                isError: false,
                isLoading: false,
                todo: payload.data.doc,
                status: payload.data.status,
                msg: payload.data.message
            }
        case types.GET_SINGLE_TODO_FAILURE:
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

export { getSingleTodoReducer };