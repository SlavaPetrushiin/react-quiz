import {combineReducers} from "redux";
import {quizReducer} from "./quiz";
import {createReducer} from "./create";

export const rootReducers = combineReducers({
    quiz: quizReducer,
    create: createReducer
});