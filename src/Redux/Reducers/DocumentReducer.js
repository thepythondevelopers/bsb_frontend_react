import { ActionTypes } from "../Constants/ActionTypes";
const initialState = {
    document:[]
}
export const documentReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.GET_DOCUMENT :
            return {state, document : payload};
        default:
            return state;
    }
}