import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './authReducer/authReducer';
import { addTodoReducer } from './addTodoReducer/addTodoReducer';
import { getTodosReducer } from './getTodosReducer/getTodosReducer';
import { getSingleTodoReducer } from './getSingleTodoReducer/getSingleTodoReducer';
import { editTodoReducer } from './editTodoReducer/editTodoReducer';

const rootReducer = combineReducers({ authReducer, addTodoReducer, getTodosReducer, getSingleTodoReducer, editTodoReducer });

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export { store };