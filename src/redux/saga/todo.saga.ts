import * as types from '../type';
import { takeLatest, call, put } from 'redux-saga/effects';

//alert
import { AlertType, showNotification } from '../../utils/Alerts';
import axios from 'axios';

//constant
import { BACKEND_URL } from '../../constant';

const axiosGetTodoList = async () => {
    const result = await axios.get(`${BACKEND_URL}/todo`)
    return result
}

function* getTodoList() {
    try {
        yield put({ type: types.LOADING_REQUEST, payload: false })
        const resonse = yield call(axiosGetTodoList)
        if(resonse) {
            yield put({ type: types.TODO_SUCCESS, payload: resonse.data })
        } else {
            throw new Error("Get todo list fail!")
        }
        yield put({ type: types.LOADING_SUCCESS, payload: true })
    } catch (error) {
        yield put({ type: types.TODO_ERROR, payload: [] })
        yield put({ type: types.LOADING_SUCCESS, payload: false })
        showNotification({
            type: AlertType.ERROR,
            msg: error
        })
    }
}

export default function* watchTodo() {
    yield takeLatest(types.TODO_REQUEST, getTodoList);
}