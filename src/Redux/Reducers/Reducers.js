import { combineReducers } from "redux";
import { userReducer } from "./UserReducer";
import { locationReducer, locationIdReducer } from "./LocationReducer";
import { sidebarReducer } from "./SidebarReducer";
import { categoryReducer } from "./CategoryReducer";
import { planCategoryReducer } from "./PlanCategoryReducer";
import { documentReducer } from "./DocumentReducer";
import { planReducer } from "./PlanReducer";

const reactReducers = combineReducers({
    userReducer: userReducer,
    locationReducer: locationReducer,
    locationIdReducer: locationIdReducer,
    sidebarReducer: sidebarReducer,
    categoryReducer: categoryReducer,
    planCategoryReducer: planCategoryReducer,
    documentReducer: documentReducer,
    planReducer: planReducer,
})

export default reactReducers;