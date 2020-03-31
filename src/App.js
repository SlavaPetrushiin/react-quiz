import React, {Component} from 'react';
import Layout from "./hoc/Layout/Layout";
import Quiz from './containers/Quiz/Quiz'
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import QuizCreator from "./components/QuizCreator/QuizCreator";
import QuizList from "./components/QuizList/QuizList";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./store/actions/auth";

class App extends Component {
    componentDidMount() {
        this.props.autoLogin();
    }

    render(){
        let routes = (
            <Switch>
                <Route path={'/auth'} render={()=> <Auth/>}/>
                <Route path={'/quiz/:id'} render={()=> <Quiz/>}/>
                <Route path={'/'} render={()=> <QuizList/>}/>
                <Redirect to={'/'}/>
            </Switch>
        );

        if(this.props.isAuthenticated){
            routes = (
                <Switch>
                    <Route path={'/quiz-creator'} render={()=> <QuizCreator/>} />
                    <Route path={'/quiz/:id'} render={()=> <Quiz/>} />
                    <Route path={'/logout'} render={() => <Logout/>} />
                    <Route path={'/'} exact  render={()=> <QuizList/>} />
                    <Redirect to={'/'}/>
                </Switch>
            )
        }

        return (
            <Layout>
                { routes }
            </Layout>
        )
    }
}

const mapStateToProps = state => {
  return {
      isAuthenticated: !!state.auth.token
  }
};

export default withRouter(connect(mapStateToProps, {autoLogin})(App));
