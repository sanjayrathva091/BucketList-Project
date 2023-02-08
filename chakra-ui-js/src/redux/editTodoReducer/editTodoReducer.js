import * as types from './actionTypes.js';

const initialState = {
    todo: {},
    isError: false,
    isLoading: false,
    status: '',
    msg: ''
};

const editTodoReducer = (oldState = initialState, actions) => {
    const { type, payload } = actions;

    switch (type) {
        case types.UPDATE_TODO_FAILURE:
            return {
                ...oldState,
                isError: true,
                status: payload.response.data.status,
                msg: payload.response.data.message
            };
        case types.UPDATE_TODO_SUCCESS:
            return {
                ...oldState,
                isError: false,
                isLoading: false,
                status: payload.data.status,
                msg: payload.data.message
            }
        default:
            return {
                ...oldState
            }
    }
};

export { editTodoReducer };