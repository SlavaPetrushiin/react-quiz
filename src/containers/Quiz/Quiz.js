import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import {withRouter} from "react-router";
import Loader from "../../components/Loadar/Loader";
import {compose} from "redux";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";

class Quiz extends Component {
    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.retryQuiz();
    }

    onAnswerClickHandle = (answerId) => {
        this.props.quizAnswerClick(answerId);
    };

    render() {
        console.log(this.props)
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответье на все вопросы</h1>

                    {
                        this.props.loading || !this.props.quiz // true
                            ? <Loader/>
                            : this.props.isFinished
                            ? <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onRetry={this.props.retryQuiz}
                            />
                            : <ActiveQuiz
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                question={this.props.quiz[this.props.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandle}
                                quezLength={this.props.quiz.length}
                                numberQuestion={this.props.activeQuestion + 1}
                                answerState={this.props.answerState}
                            />
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
};

export default compose(
    connect(
        mapStateToProps, {
            fetchQuizById,
            quizAnswerClick,
            retryQuiz
        }
    ), withRouter)(Quiz);