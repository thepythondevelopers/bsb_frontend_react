import { ActionTypes } from "../Constants/ActionTypes";
const initialState = {
    user:[]
}
export const userReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SELECCTED_USER :
            return {...state, user : payload };
        default:
            return state;
    }
}