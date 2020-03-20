import React from 'react';
import classes from './Input.module.css';

function isInvalid({valid, touched, shouldValidate}) {//shouldValidate надо ли валидировать  touched - трогали ли
    return !valid && shouldValidate && touched
}

const Input = props => {

    const inputType = props.type || 'text';
    const cls = [classes.Input];
    const htmlFor = `${inputType}-${Math.random()}`;

    if (isInvalid(props)) {
        cls.push(classes.invalid)
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>
                {props.label}
                <input
                    type={inputType}
                    id={htmlFor}
                    value={props.value}
                    onChange={props.onChange}
                />
            </label>
            {
                isInvalid(props)
                    ? <span>{props.errorMessage || 'Введите верное значение'}</span>
                    : null
            }
        </div>
    )
};

export default Input;