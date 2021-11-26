import { combineReducers } from 'redux';

//reducer
import { todoReducer } from './todo.reducer';
import { loadingReducer } from './loading.reducer';
import { thunkReducer } from './thunk.reducer';


export const rootReducer = combineReducers({
  todoList: todoReducer,
  loading: loadingReducer,
  thunk: thunkReducer
});
