import {LOADING_SUCCESS, QUIZES_SUCCESS} from "../actions/actionTypes";
import axios from "../../axios/axios-quiz";

const initialState = {
    quizes: [],
    loading: true
};

export const quiz = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_SUCCESS:
            return {
                ...state, loading: false
            };
        case QUIZES_SUCCESS:
            return {
                ...state, quizes: [...action.quizes]
            };
        default :
            return state
    }
};

export const loadingSuccess = () => ({type: LOADING_SUCCESS,loading: true});
export const getQuizesSuccess = (quizes) => ({type: QUIZES_SUCCESS, quizes});

export const getQuizes = () => async (dispatch) => {
    try {
        const quizes = [];

        const response = await axios.get('quizes.json');

        Object.keys(response.data).forEach((key, index) => {
            quizes.push({
                id: key,
                name: `Test №${index + 1}`
            })
        });
        dispatch(getQuizesSuccess(quizes));
        dispatch(loadingSuccess());
    } catch (e) {

    }
};