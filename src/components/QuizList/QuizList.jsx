import React, {Component} from 'react';
import classes from './QuizList.module.css';
import {NavLink} from "react-router-dom";
import axios from '../../axios/axios-quiz';
import Loader from "../Loadar/Loader";
import {connect} from "react-redux";
import {getQuizes, loadingSuccess} from "../../store/reducers/quiz";

class QuizList extends Component {
    async componentDidMount() {//запрос на получение списка тестов
        this.props.getQuizes()
    }

    renderQuizes = () => {

        return this.props.quizes.map(quiz => {
            debugger
            return (

                <li
                    key={quiz.id}
                >
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    };

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    {
                        this.props.loading
                            ? <Loader/>
                            : <ul>
                                {this.renderQuizes()}
                            </ul>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
};


export default connect(mapStateToProps, {getQuizes})(QuizList);