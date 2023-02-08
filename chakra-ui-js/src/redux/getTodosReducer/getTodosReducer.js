import * as types from './actionTypes.js';

const initialState = {
    todos: [],
};

const getTodosReducer = (oldState = initialState, actions) => {
    const { type, payload } = actions;

    switch (type) {
        case types.GET_TODOS_SUCCESS:
            return {
                ...oldState,
                todos: payload.data.docs
            }
        case types.GET_TODOS_FAILURE:
            return {
                ...oldState,
                isError: true
            }
        default:
            return {
                ...oldState
            }
    }
};

export { getTodosReducer };