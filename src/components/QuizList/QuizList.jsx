import React, {Component} from 'react';
import classes from './QuizList.module.css';
import {NavLink} from "react-router-dom";
import axios from 'axios';
import Loader from "../Loadar/Loader";

class QuizList extends Component {
    state = {
        quizes: [],
        loading: true
    };

    async componentDidMount() {//запрос на получение списка тестов
        try {
            const quizes = [];

            const response = await axios.get('https://react-quiz-9c3cb.firebaseio.com/quizes.json');
            console.log(response.data)

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test №${index + 1}`
                })
            });

            this.setState({
                quizes, loading: false
            });
        } catch (e) {

        }
    }

    renderQuizes = () => {
        return this.state.quizes.map(quiz => {
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
                        this.state.loading
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

export default QuizList;