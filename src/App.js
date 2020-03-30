import React from 'react';
import Layout from "./hoc/Layout/Layout";
import Quiz from './containers/Quiz/Quiz'
import {Route, Switch} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import QuizCreator from "./components/QuizCreator/QuizCreator";
import QuizList from "./components/QuizList/QuizList";
import {connect} from "react-redux";

function App(props) {
    // let routes = [
    //     <Route path={'/quiz/:id'} render={() => <Quiz/>}/>,
    //     <Route path={'/'} render={() => <QuizList/>}/>
    // ];
    //
    // if(props.auth){
    //     routes.push(<Route path={'/quiz-creator'} render={()=> <QuizCreator/>}/>)
    // }
    // else{
    //     routes.push(<Route path={'/auth'} render={() => <Auth/>}/>)
    // }

    return (
        <Layout>
            <Switch>
                {
                    props.auth
                        ? <>
                            <Route path={'/quiz/:id'} render={() => <Quiz/>}/>
                            <Route path={'/'} render={() => <QuizList/>}/>
                            <Route path={'/quiz-creator'} render={()=> <QuizCreator/>}/>
                        </>
                        : <>
                            <Route path={'/quiz/:id'} render={() => <Quiz/>}/>
                            <Route path={'/'} render={() => <QuizList/>}/>
                            <Route path={'/auth'} render={() => <Auth/>}/>
                        </>
                }
                {/*<Route path={'/auth'} render={()=> <Auth/>}/>*/}
                {/*<Route path={'/quiz-creator'} render={()=> <QuizCreator/>}/>*/}
                {/*<Route path={'/quiz/:id'} render={()=> <Quiz/>}/>*/}
                {/*<Route path={'/'} render={()=> <QuizList/>}/>*/}
            </Switch>
        </Layout>
    );
}

const mapStateToProps = state => {
  return {
      auth: state.auth.token
  }
};

export default connect(mapStateToProps, null)(App);
