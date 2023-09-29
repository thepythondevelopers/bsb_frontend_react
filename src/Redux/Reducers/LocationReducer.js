import { ActionTypes } from "../Constants/ActionTypes";
const initialState = {
    locations:[]
}
export const locationReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.GET_LOCATION :
            return {state, locations : payload};
        default:
            return state;
    }
}

const initialLocationId = "";
export const locationIdReducer = (state = initialLocationId, {type, payload}) => {
    console.log("intial location id::",initialLocationId);
    console.log("state::",state);
    console.log("type::",type);
    switch (type) {
        case ActionTypes.GET_SELECTED_LOCATION_ID :
            return payload;
        default:
            return state;
    }
}