import {combineReducers} from "redux";
import {quizReducer} from "./quiz";

export const rootReducers = combineReducers({
    quiz: quizReducer
});