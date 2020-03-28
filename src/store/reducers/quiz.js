import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS, QUIZ_IS_FINISHED, QUIZ_NEXT_QUESTION, QUIZ_RETRY, QUIZ_SET_STATE,
} from "../actions/actionTypes";

const initialState = {
    quizes: [],
    loading: false,
    error: null,
    results: {}, //{[id]: success error}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, //{[id]: success error} цвет ответа
    quiz: null,
};

export const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state, loading: true
            };
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                loading: false,
                quizes: [...action.quizes]
            };
        case FETCH_QUIZES_ERROR:
            return {
                ...state, error: action.error
            };
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: action.quiz,
            };
        case QUIZ_SET_STATE:
            return {
                ...state,
                results: action.results,
                answerState: action.answerState
            };
        case QUIZ_IS_FINISHED:
            return {
                ...state,
                isFinished: true
            };
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                activeQuestion: action.number,
                answerState: null
            };
        case QUIZ_RETRY:
            return {
                ...state,
                results: {}, //{[id]: success error}
                isFinished: false,
                activeQuestion: 0,
                answerState: null, //{[id]: success error} цвет ответа
            };
        default :
            return state
    }
};

