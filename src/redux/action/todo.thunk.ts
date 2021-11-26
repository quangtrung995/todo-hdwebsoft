import * as type from '../type'

//repo
import * as api from '../../service/axiosApi';

export const getThunkRequest = () => {
    return {
        type: type.THUNKTODO_REQUEST,
    }
}

export const getThunkSuccess = (todo) => {
    return {
        type: type.THUNKTODO_SUCCESS,
        payload: todo
    }
}

export const getThunkError = (error) => {
    return {
        type: type.THUNKTODO_ERROR,
        payload: error
    }
}

export const thunkAsyncAction = () => {
    return (dispatch) => {
        dispatch({ type: type.LOADING_REQUEST, payload: false })
        api.getAll()
            .then(resp => {
                dispatch({ type: type.LOADING_SUCCESS, payload: true });
                dispatch(getThunkSuccess(resp))
            })
            .catch(err => {
                dispatch({ type: type.LOADING_SUCCESS, payload: true });
                dispatch(getThunkError(err))
            })
    }
}