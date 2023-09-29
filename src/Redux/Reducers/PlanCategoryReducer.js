import { ActionTypes } from "../Constants/ActionTypes";
const initialState = {
    planCategory:[]
}
export const planCategoryReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.GET_PLAN_CATEGORY :
            return {state, planCategory : payload};
        default:
            return state;
    }
}