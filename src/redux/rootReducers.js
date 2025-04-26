import { combineReducers } from "redux";
import { adminLoginReducer } from "./reducers/reducers";

const combinedReducers = combineReducers({
    loginAdminReducer: adminLoginReducer
})
export { combinedReducers }