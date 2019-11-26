import React, {Component} from 'react'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            userFieldError: '',
            passwordFieldError: ''
        };
    };

    handleUserChange = e => {
        this.setState({
            username:e.target.value
        });
    };

    handlePassChange = e => {
        this.setState({
            password:e.target.value
        });
    };

    handleLogin = event => {
        event.preventDefault();
    };

    usernameValidation = () => {
        const username = this.state.username;
        this.setState({
                userFieldError: (username.length > 1 && username.includes("@") && username.includes(".")) ? null :
                    'Please enter a valid email address'
            }
        )
    };

    //This can be changed later to meet whatever password requirements are necessary
    //Just add them to the ternary statement
    passwordValidation = () => {
        const password = this.state.password;
        this.setState({
                passwordFieldError: (password.length > 5) ? null :
                    'Please enter a password with more than 5 characters'
            }
        )
    };

    render() {
        return(
            <div id="myLoginBox" className="col-md-9">
                <form className="justify-content-center" onSubmit={this.handleLogin}>
                    <div className="form-group">
                        <label htmlFor="Login">Username</label>
                        <input
                            value = {this.state.username}
                            className={`form-control ${this.state.userFieldError ? 'is-invalid' : ''}`}
                            placeholder="Enter your username"
                            onChange={this.handleUserChange}
                            onBlur={this.usernameValidation}
                        />
                        <div className='text-danger'>{this.state.userFieldError}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Password">Password</label>
                        <input
                            type="password"
                            value = {this.state.password}
                            className={`form-control ${this.state.passwordFieldError ? 'is-invalid' : ''}`}
                            placeholder="Enter your password"
                            onChange={this.handlePassChange}
                            onBlur={this.passwordValidation}
                        />
                        <div className='text-danger'>{this.state.passwordFieldError}</div>
                    </div>
                    <button type="submit"
                            className="btn btn-secondary btn-block">Login
                    </button>
                </form>
            </div>
        )
    }

}

export default Login