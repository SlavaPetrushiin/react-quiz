import {FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export function fetchQuizes(){
    return async function (dispatch) {
        dispatch(fetchQuizesStart())
        try {
            const quizes = [];

            const response = await axios.get('quizes.json');

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test №${index + 1}`
                })
            });
            dispatch(fetchQuizesSuccess(quizes));
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

//Старт загрузки списка тестов
export function fetchQuizesStart(){
    return {
        type: FETCH_QUIZES_START
    }
}

//Загрузка списка тестов завершилась
export function fetchQuizesSuccess(quizes){
    return {type: FETCH_QUIZES_SUCCESS, quizes}
}

//Загрузка списка тестов завершилась
export function fetchQuizesError(error){
    return {type: FETCH_QUIZES_ERROR, error}
}


