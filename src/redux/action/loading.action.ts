import * as type from '../type'

export const getLoading = () => {
    return {
        type: type.LOADING_REQUEST,
        payload: false
    }
}