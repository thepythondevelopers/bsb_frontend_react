import { createStore } from "redux";
import reactReducers from "./Reducers/Reducers";

const Store = createStore(reactReducers, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default Store;