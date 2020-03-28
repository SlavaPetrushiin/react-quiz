import {CREATE_QUESTION_QUIZ} from "../actions/actionTypes";

const initialState = {
    quiz: []
};

export const createReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_QUESTION_QUIZ:
            return {
                ...state,
                quiz: [...state.quiz, action.quiz]
            };
        default:
            return state
    }
};