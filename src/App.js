import React from 'react';
import Layout from "./hoc/Layout/Layout";
import Quiz from './containers/Quiz/Quiz'
import {Route, Switch} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import QuizCreator from "./components/QuizCreator/QuizCreator";
import QuizList from "./components/QuizList/QuizList";

function App() {
    return (
        <Layout>
            <Switch>
                <Route path={'/auth'} render={()=> <Auth/>}/>
                <Route path={'/quiz-creator'} render={()=> <QuizCreator/>}/>
                <Route path={'/quiz/:id'} render={()=> <Quiz/>}/>
                <Route path={'/'} render={()=> <QuizList/>}/>
            </Switch>
        </Layout>
    );
}

export default App;
