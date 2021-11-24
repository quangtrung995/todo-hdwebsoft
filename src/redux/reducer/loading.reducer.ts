import * as type from '../type'

type InitialState = {
    status: boolean,
};
const initialState: InitialState = {
    status: false,
};

export const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.LOADING_SUCCESS:
            return {
                status: action.payload
            }
        case type.LOADING_REQUEST:
            return {
                status: action.payload
            }
        default:
            return state
    }
}