import React, {Component} from 'react';
import classes from './FinishedQuiz.module.css'
import FinishedItem from "./FinishedItem/FinishedItem";
import Button from "../ui/Button/Button";

const FinishedQuiz = props => {
    const {quiz, results} = props;
    const successAnswer = Object.keys(results).reduce((sum, answerId) => {
        if(results[answerId] === 'success'){
            sum++
        }
        return sum;
    }, 0);

    return (
        <div className={classes.Finished}>
            <ul>
                {
                    quiz.map((quizItem, index) => {
                        return <FinishedItem
                            {...quizItem}
                            key={index}
                            num={index + 1}
                            answerResult={results[quizItem.id]}
                        />
                    })
                }
            </ul>
            <p>{`Правильно ${successAnswer} из ${quiz.length}`}</p>
            <div>
                <Button onClick={props.onRetry} type={'primary'}>
                    Повторить
                </Button>
                <Button type={'success'}>
                    Перейти в список тестов
                </Button>
            </div>
        </div>
    );
}

export default FinishedQuiz;