import { ActionTypes } from "../Constants/ActionTypes";
export const getUser= (user) => {
    return {
        type: ActionTypes.SELECCTED_USER,
        payload: user
    }
};
export const getLocation = (locations) => {
    return {
        type: ActionTypes.GET_LOCATION,
        payload: locations
    }
};

export const getSelectedLocationId = (locationId) => {
    return {
        type: ActionTypes.GET_SELECTED_LOCATION_ID,
        payload: locationId
    }
};
export const getCategory = (category) => {
    return {
        type: ActionTypes.GET_CATEGORY,
        payload: category
    }
};
export const getPlanCategory = (planCategory) => {
    return {
        type: ActionTypes.GET_PLAN_CATEGORY,
        payload: planCategory
    }
};
export const getSidebarData = (sidebar) => {
    return {
        type: ActionTypes.GET_SIDEBAR,
        payload: sidebar
    }
};
export const getDocuemntAllData = (document) => {
    return {
        type: ActionTypes.GET_DOCUMENT,
        payload: document
    }
};
export const getPlanAllData = (plan) => {
    return {
        type: ActionTypes.GET_PLAN,
        payload: plan
    }
};