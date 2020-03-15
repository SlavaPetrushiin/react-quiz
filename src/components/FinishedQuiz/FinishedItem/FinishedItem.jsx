import React from 'react';
import classes from '../FinishedQuiz.module.css'

const FinishedItem = props => {
    const {answerResult} = props;
    const cls = [
        classes[props.answerResult],
        'fa'
    ];

    if(answerResult === 'success'){
        cls.push('fa-check');
    } else {
        cls.push('fa-times');
    }

    return (
        <li>
            <strong>{`${props.num}`} </strong>
            {props.question}
            <i className={cls.join(' ')}/>
        </li>
    );
}

export default FinishedItem;