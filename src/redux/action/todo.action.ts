import * as type from '../type'

export const getTodo = (payload?: any) => {
    return {
        type: type.TODO_REQUEST,
        payload: payload
    }
}