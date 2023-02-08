import * as types from './actionTypes.js';

const initialState = {
    todo: {},
    status: ''
};

const addTodoReducer = (oldState = initialState, actions) => {
    const { type, payload } = actions;

    switch (type) {
        case types.ADD_TODO_SUCCESS:
            return {
                ...oldState,
            };
        case types.ADD_TODO_FAILURE:
            return {
                ...oldState,
                status: 'failure'
            }
        default:
            return {
                ...oldState
            }
    }
};

export { addTodoReducer };