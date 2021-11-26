import * as type from '../type'

type InitialState = {
    status: boolean,
    todo_list: []
};
const initialState: InitialState = {
    todo_list: [],
    status: false,
};

export const thunkReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.THUNKTODO_SUCCESS:
            return {
                ...state,
                status: "success",
                todo_list: action.payload
            }
        case type.THUNKTODO_ERROR:
            return {
                ...state,
                status: action.payload,
            }
        default:
            return state
    }
}