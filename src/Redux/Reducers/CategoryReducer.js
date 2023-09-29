import { ActionTypes } from "../Constants/ActionTypes";
const initialState = {
    category:[]
}
export const categoryReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.GET_CATEGORY :
            return {state, category : payload};
        default:
            return state;
    }
}