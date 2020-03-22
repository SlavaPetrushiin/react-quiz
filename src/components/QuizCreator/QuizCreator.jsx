import React, {Component} from 'react';
import classes from './QuizCreator.module.css';
import Button from "../ui/Button/Button";
import {createControl} from './../../form/fromFramework';
import Input from "../ui/Input/Input";
import Select from "../ui/Select/Select";
import {valid, validForm} from "../../form/fromFramework";
import axios from 'axios';

function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number
    }, {
        required: true
    })
}

//обнуление формы после добавления
function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым',
        }, {
            required: true
        }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends Component {
    state = {
        quiz: [],
        isValidForm: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    };

    submitHandle = event => {
        event.preventDefault();
    };

    addQuestionHandler = (event) => {
        event.preventDefault();
        const quiz = [...this.state.quiz];
        const {question, option1, option2, option3, option4} = this.state.formControls;
        const index = quiz.length + 1;

        let questionItem = {
            question: question.value,
            rightAnswerId: this.state.rightAnswerId,
            id: index,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        };

        quiz.push(questionItem);

        this.setState({
            quiz,
            isValidForm: false, //Обнуление сорстояния
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    };

    createQuizHandler = async (event) => {
        event.preventDefault();
        try {
            await axios.post('https://react-quiz-9c3cb.firebaseio.com/quizes.json', this.state.quiz);

            this.setState({
                quiz: [],
                isValidForm: false, //Обнуление сорстояния
                rightAnswerId: 1,
                formControls: createFormControls()
            })
        } catch (e) {
            console.log(e)
        }


        console.log(this.state.quiz)
    };

    //Изменения инпута
    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = formControls[controlName];

        control.value = value;
        control.touched = true;
        control.valid = valid(control.value, control.validation);

        this.setState({
            formControls,
            isValidForm: validForm(formControls)
        });
    };

    selectChangeHandler = (event) => {
        this.setState({
            rightAnswerId: +event.currentTarget.value
        })
    };

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <React.Fragment key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        shouldValidate={!!control.validation}
                        onChange={event => this.changeHandler(event.currentTarget.value, controlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </React.Fragment>
            )
        })
    };

    render() {

        const select = <Select
            label={'Выберите правильный ответ'}
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />;

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h2>Создание тестов</h2>
                    <form onSubmit={this.submitHandle}>
                        {this.renderInputs()}
                        {select}
                        <Button
                            type={'primary'}
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isValidForm}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type={'success'}
                            onClick={this.createQuizHandler}
                            disabled={this.state.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default QuizCreator;
