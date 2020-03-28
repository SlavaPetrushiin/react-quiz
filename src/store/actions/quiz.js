import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS, QUIZ_IS_FINISHED, QUIZ_NEXT_QUESTION, QUIZ_RETRY,
    QUIZ_SET_STATE
} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export function fetchQuizes() {
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
export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

//Загрузка списка тестов завершилась
export function fetchQuizesSuccess(quizes) {
    return {type: FETCH_QUIZES_SUCCESS, quizes}
}

//Загрузка списка тестов завершилась
export function fetchQuizesError(error) {
    return {type: FETCH_QUIZES_ERROR, error}
}

//Запрос get за тестами
export function fetchQuizById(quizId) {
    return async function (dispatch) {
        dispatch(fetchQuizesStart());
        try {
            const response = await axios.get(`quizes/${quizId}.json`);
            const quiz = response.data;
            dispatch(fetchQuizSuccess(quiz));
        } catch (e) {
            dispatch(fetchQuizesError(e));
        }
    }
}

export function fetchQuizSuccess(quiz){
    return {type: FETCH_QUIZ_SUCCESS, quiz}
}

//Обработка клика ответа
export function quizAnswerClick(answerId){
    return function(dispatch, getState){
        let state = getState().quiz;

        if (state.answerState) {//двойной клик
            let key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') return
        }

        let currentQuestion = state.quiz[state.activeQuestion]; //текущий вопрос
        const results = state.results;

        if (currentQuestion.rightAnswerId === Number(answerId)) {

            if (!state.results[answerId]) {
                results[currentQuestion.id] = 'success';
            }

            dispatch(quizSetState({[answerId]: 'success'}, results), results);

            const timeout = window.setTimeout(() => { //проверка для переключения вопроса
               debugger
                if (isQuizFinish(state)) {
                    dispatch(quizIsFinished());
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1));
                }
                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[currentQuestion.id] = 'error'; //пишем в массив ответы
            dispatch(quizSetState({[answerId]: 'error'}, results), results);
        }
    }
}
//Обработка варианта клика пользователя
export function quizSetState(answerState, results){
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}
//Завершение теста
export function quizIsFinished(){
    return { type: QUIZ_IS_FINISHED}
}

export function quizNextQuestion(number) {
    return {type: QUIZ_NEXT_QUESTION, number}
}
//Логига работы
function isQuizFinish (state){
    return state.activeQuestion + 1 === state.quiz.length;
}

export function retryQuiz(){
    return {
        type: QUIZ_RETRY
    }
}
