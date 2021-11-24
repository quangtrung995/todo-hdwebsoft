import { combineReducers } from 'redux';

//reducer
import { todoReducer } from './todo.reducer';
import { loadingReducer } from './loading.reducer';


export const rootReducer = combineReducers({
  todoList: todoReducer,
  loading: loadingReducer
});
