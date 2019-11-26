import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import Portal from './components/UserPortal/Portal'
import LoginLanding from "./components/UserLogin/LoginLanding"



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: ''
        };
        let key = 'userId';
    }

    setUserId(value) {
        this.setState({
            userId: value
        });

        sessionStorage.setItem(this.key, this.state.userId);
        let test = sessionStorage.getItem(this.key);
    }

    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/Home" component={Home}/>
                    <Route exact path="/Portal"
                           render={
                               (props) => <Portal userId={sessionStorage.getItem(this.key)}
                               />}
                    />
                    <Route exact path="/">
                        <Redirect to="/Home"/>
                    </Route>
                    <Route exact path="/Login"
                           render={
                               (props) => <LoginLanding setUserId={this.setUserId.bind(this)}
                               />}
                    />
                    <Route component={NotFound}/>
                </Switch>

            </div>
        );
    }
}

export default App;
