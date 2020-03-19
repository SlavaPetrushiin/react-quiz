import React, {Component} from 'react';
import Button from "../ui/Button/Button";
import classes from './Auth.module.css'
import Input from "../ui/Input/Input";

class Auth extends Component {
    state = {
        formControls:{
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                shouldValidate: true,
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation:{ //Правила для валидации
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                shouldValidate: true,
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation:{
                    required: true,
                    minLength: 6
                }
            }
        }
    };

    loginHandler = () => {

    };

    registerHandler = () => {

    };

    submitForm = (e) => {
        e.preventDefault();
    };


    onChangeHandler = (event, controlName) => {
        const newInput = {
            ...this.state.formControls[controlName],
            value: event.target.value,
            touched: true,
        };
        debugger

        console.log(`${controlName} ${event.target.value}`)
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    {...control}
                    key={controlName + index}
                    shouldValidate={!!control.validation}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        });
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h2>
                        Авторизация
                    </h2>
                    <form onSubmit={this.submitForm} className={classes.AuthForm}>
                        {this.renderInputs()}
                        <Button type={'success'} onClick={this.loginHandler}>Авторизация</Button>
                        <Button type={'primary'} onClick={this.registerHandler}>Регистрация</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Auth;