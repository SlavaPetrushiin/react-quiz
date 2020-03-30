import {combineReducers} from "redux";
import {quizReducer} from "./quiz";
import {createReducer} from "./create";
import {authReducer} from "./auth";

export const rootReducers = combineReducers({
    quiz: quizReducer,
    create: createReducer,
    auth: authReducer
});