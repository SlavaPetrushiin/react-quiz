import {CREATE_QUESTION_QUIZ} from "./actionTypes";
import axios from "axios";

export function createQuizQuestion(quiz){
    return {
        type: CREATE_QUESTION_QUIZ,
        quiz
    }
}

//Отправка теста на сервер
export function finishCreateQuiz(){
    return async function(dispatch, getState){
        const state = getState().create.quiz;
        debugger
        await axios.post('https://react-quiz-9c3cb.firebaseio.com/quizes.json', state);
    }
}