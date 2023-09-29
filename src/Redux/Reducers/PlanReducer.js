import { ActionTypes } from "../Constants/ActionTypes";
const initialState = {
    plan:[]
}
export const planReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.GET_PLAN :
            return {state, plan : payload};
        default:
            return state;
    }
}