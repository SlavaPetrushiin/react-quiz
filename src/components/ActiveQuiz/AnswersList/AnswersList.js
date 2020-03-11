import React from 'react';
import classes from './AnswersList.module.css'
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = props => {
        return (
            <ul className={classes.AnswersList}>
                {
                    props.answers.map((answer, index) => {
                        return <AnswerItem
                            answer={answer}
                            key={index}
                            onAnswerClick={props.onAnswerClick}
                            answerState={props.answerState ? props.answerState[answer.id] : null} //вытаскиваю занчение
                        />})
                }
            </ul>
        );
}

export default AnswersList;