import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";


class Quiz extends Component {
    state = {
        activeQuestion : 0,
        answerState: null, //{[id]: success error} цвет ответа
        quiz : [
            {
                question: 'Столица России',
                rightAnswerId: 1,
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
        debugger
        let currentQuestion = this.state.quiz[this.state.activeQuestion]; //текущий вопрос

        if(currentQuestion.rightAnswerId === Number(answerId)){
            this.setState({
                answerState: {[answerId] : 'success'}
            });

            const timeout = window.setTimeout(() => {
                if(this.isQuizFinished()){
                    console.log('Finished!')
                }
                else{
                    this.setState({
                        activeQuestion : this.state.activeQuestion + 1
                    });
                }
                window.clearTimeout(timeout);
            }, 1000);
        }
        else {
            this.setState({
                answerState:  {[answerId] : 'error'}
            });
        }
    };

    isQuizFinished = () => this.state.activeQuestion + 1 === this.state.quiz.length;

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответье на все вопросы</h1>
                    <ActiveQuiz
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick={this.onAnswerClickHandle}
                        quezLength={this.state.quiz.length}
                        numberQuestion={this.state.activeQuestion + 1}
                        answerState={this.answerState}
                    />
                </div>
            </div>
        );
    }
}

export default Quiz;