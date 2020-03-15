import React, {Component} from 'react';
import classes from './FinishedQuiz.module.css'
import FinishedItem from "./FinishedItem/FinishedItem";

const FinishedQuiz = props => {
    const {quiz, results} = props;
    const successAnswer = Object.keys(results).reduce((sum, answer) => {
        if(answer === 'success'){
            return sum++
        }
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
                <button>Повторить</button>
            </div>
        </div>
    );
}

export default FinishedQuiz;