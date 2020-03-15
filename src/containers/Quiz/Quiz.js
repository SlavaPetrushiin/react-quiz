import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";


class Quiz extends Component {
    state = {
        results: {}, //{[id]: success error}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, //{[id]: success error} цвет ответа
        quiz: [
            {
                question: 'Столица России',
                rightAnswerId: 1,
                id: 1,
                answers: [
                    {text: 'Москва', id: '1'},
                    {text: 'Ростов', id: '2'},
                    {text: 'Вологда', id: '3'},
                    {text: 'Анадырь', id: '4'}
                ]
            },
            {
                question: 'Столица Италии',
                rightAnswerId: 2,
                id: 2,
                answers: [
                    {text: 'Милан', id: '1'},
                    {text: 'Рим', id: '2'},
                    {text: 'Лацо', id: '3'},
                    {text: 'Верона', id: '4'}
                ]
            },
        ]
    };

    onAnswerClickHandle = (answerId) => {
        if (this.state.answerState) {//двойной клик
            let key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') return
        }

        let currentQuestion = this.state.quiz[this.state.activeQuestion]; //текущий вопрос
        const results = this.state.results;

        if (currentQuestion.rightAnswerId === Number(answerId)) {

            if (!this.state.results[answerId]) {
                results[currentQuestion.id] = 'success';
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            });

            const timeout = window.setTimeout(() => { //проверка для переключения вопроса
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    });
                }
                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[currentQuestion.id] = 'error'; //пишем в массив ответы
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            });
        }
    };

    isQuizFinished = () => this.state.activeQuestion + 1 === this.state.quiz.length;

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответье на все вопросы</h1>

                    {
                        this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                            />
                            : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandle}
                                quezLength={this.state.quiz.length}
                                numberQuestion={this.state.activeQuestion + 1}
                                answerState={this.state.answerState}
                            />
                    }

                </div>
            </div>
        );
    }
}

export default Quiz;