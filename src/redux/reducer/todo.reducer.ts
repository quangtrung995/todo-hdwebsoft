import * as type from '../type'

type InitialState = {
    status: boolean,
    todo_list: []
};
const initialState: InitialState = {
    todo_list: [],
    status: false,
};

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.TODO_SUCCESS:
            return {
                ...state,
                todo_list: action.payload
            }
        default:
            return state
    }
}