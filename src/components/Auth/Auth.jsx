import React, {Component} from 'react';
import Button from '../ui/Button/Button';
import classes from './Auth.module.css'
import Input from '../ui/Input/Input';
import is from 'is_js';
import axios from 'axios';

class Auth extends Component {
    state = {
        isFormValid: false,
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

    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        };
        try{
            const response = await axios.post(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDg1jCeefcPioaiXSoGbozj2A1i4f9vAsc',
                authData
            );

            console.log(response.data);
        }catch(e){
            console.error(e);
        }
    };

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        };
        try{
            const response = await axios.post(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDg1jCeefcPioaiXSoGbozj2A1i4f9vAsc',
                authData
            );

            console.log(response.data);
        }catch(e){
            console.error(e);
        }
    };

    submitForm = (e) => {
        e.preventDefault();
    };

    validateControl(value, validation){
        if(!validation){ //Валидация не нужна
           return true;
        }

        let isValid = true;

        if(validation.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(validation.email){
            isValid = is.email(value) && isValid;
        }

        if(validation.minLength){
            isValid = value.length >= 6 && isValid;
        }

        return isValid;
    };

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        let isFormValid = true;

        control.value = event.currentTarget.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation); //проверка на валидацию

        formControls[controlName] = control;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid; //Проверка на валидацию всех полей!
        });

        this.setState({
            formControls,
            isFormValid
        });
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
                        <Button
                            type={'success'}
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Авторизация
                        </Button>
                        <Button
                            type={'primary'}
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Регистрация
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Auth;