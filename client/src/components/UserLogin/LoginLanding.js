import React, {Component} from 'react'
import Login from "./Login";
import Register from "./Register"
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab"
import './Login.css'

class LoginLanding extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: ''
        }
    }

    loginUpdate(value) {
        this.setState({
            userId: value
        });
        console.log(`UserId of logged in user: ${this.state.userId}`)
    }

    render() {
        return (
            <Col className="justify-content-center" id="myLoginBox">
                <Container id="loginContainer">
                    <Tabs
                        defaultActiveKey="Login"
                        id="UserLoginRegister"
                        className="justify-content-around"
                    >
                        <Tab eventKey="Login" title="Login">
                            <Login
                                loginUpdate={this.loginUpdate.bind(this)}
                            />
                        </Tab>
                        <Tab eventKey="Register" title="Register">
                            <Register/>
                        </Tab>
                    </Tabs>
                </Container>
            </Col>
        )
    }
};

export default LoginLanding
