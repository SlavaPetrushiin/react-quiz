import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = (props) => {
    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>1.</strong>&nbsp;
                    {props.question}
                </span>
                <small>{props.numberQuestion} из {props.quezLength}</small>
            </p>
            <AnswersList
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}
                answerState={props.answerState}
            />
        </div>
    )
};

export default ActiveQuiz;