import { all } from 'redux-saga/effects';

//saga
import watchTodo from './todo.saga';

export function* rootSaga() {
    yield all([
        watchTodo()
    ])
}