import {combineReducers} from "redux";
import {quiz} from "./quiz";

export const rootReducers = combineReducers({
    quiz: quiz
});