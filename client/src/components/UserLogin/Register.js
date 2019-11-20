import React, {Component} from 'react'
import axios from 'axios'

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            email_address: '',
            password: '',
            passwordconfirm: '',
            phone_number: '',
            address: '',
            emailFieldError: '',
            firstFieldError: '',
            lastFieldError: '',
            passFieldError: '',
            pass2FieldError: ''
        };
    };

    handleRegister = event => {
        event.preventDefault();
        let registrationInfo = {
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "email_address": this.state.email_address,
            "password": this.state.password,
            "passwordconfirm": this.state.passwordconfirm
        };

        axios.get('/api/userPortal')
            .then(res => {
                console.log(res.data.length);
                let userId = res.data.length + 1;
                axios.post('/api/userPortal', {
                    "userId": userId,
                    "name": this.state.first_name + " " + this.state.last_name,
                    "emailAddress": this.state.email_address,
                    "password": this.state.password
                })
                    .then(res => {
                        this.setState({
                            first_name: "",
                            last_name: "",
                            email_address: "",
                            password: "",
                            passwordconfirm: ""
                        });
                    });
                alert(`You have been successfully registered`)
            });
    };

    handleFirstChange = e => {
        this.setState({
            first_name: e.target.value
        });
    };

    handleLastChange = e => {
        this.setState({
            last_name: e.target.value
        });
    };

    handleEmailChange = e => {
        this.setState({
            email_address: e.target.value
        });
    };

    handlePasswordChange = e => {
        this.setState({
            password: e.target.value
        });
    };

    handlePassword2Change = e => {
        this.setState({
            passwordconfirm: e.target.value
        });
    };

    emailValidation = () => {
        const email = this.state.email_address;
        this.setState({
                emailFieldError: (email.length > 1 && email.includes("@") && email.includes(".")) ? null :
                    'Please enter a valid email address'
            }
        )
    };

    firstValidation = () => {
        const first = this.state.first_name;
        this.setState({
                firstFieldError: (first.length > 0) ? null :
                    'Please enter a first name'
            }
        )
    };

    lastValidation = () => {
        const last = this.state.last_name;
        this.setState({
                lastFieldError: (last.length > 0) ? null :
                    'Please enter a last name'
            }
        )
    };

    passwordValidation = () => {
        const password = this.state.password;
        this.setState({
                passFieldError: (password.length >= 5) ? null :
                    'Please enter a password with more than 5 characters.'
            }
        )
    };

    password2Validation = () => {
        const password = this.state.password;
        const password2 = this.state.passwordconfirm;
        this.setState({
                pass2FieldError: (password === password2) ? null :
                    'Passwords must match'
            }
        )
    };

    render() {
        return (
            <div>
                <form className="justify-content-center" onSubmit={this.handleRegister}>
                    <div class="form-row d-flex justify-content-around">
                        <div class="form-group col-md-6">
                            <label htmlFor="First name">First Name</label>
                            <input
                                name="first_name"
                                type="text"
                                placeholder="First"
                                value={this.state.first_name}
                                onChange={this.handleFirstChange}
                                onBlur={this.firstValidation}
                                class="form-control"
                            />
                            <div className='text-danger'>{this.state.firstFieldError}</div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="Last name">Last name</label>
                            <input
                                name="last_name"
                                type="text"
                                placeholder="Last"
                                value={this.state.last_name}
                                onChange={this.handleLastChange}
                                onBlur={this.lastValidation}
                                class="form-control"
                            />
                            <div className='text-danger'>{this.state.lastFieldError}</div>
                        </div>
                    </div>
                    <div class="form-row d-flex justify-content-center">
                        <div className="form-group col-md-12">
                            <label>Email Address</label>
                            <input
                                name="email_address"
                                placeholder="example@example.com"
                                type="email"
                                value={this.state.email_address}
                                onChange={this.handleEmailChange}
                                onBlur={this.emailValidation}
                                class="form-control"
                            />
                            <div className='text-danger'>{this.state.emailFieldError}</div>
                        </div>
                    </div>
                    <div className="form-row d-flex justify-content-around">
                        <div className="form-group col-md-6">
                            <label htmlFor="Password">Enter your password</label>
                            <input
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                className="form-control"
                                onBlur={this.passwordValidation}
                            />
                            <div className='text-danger'>{this.state.passFieldError}</div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="Password2">Confirm your password</label>
                            <input
                                name="passwordconfirm"
                                type="password"
                                value={this.state.passwordconfirm}
                                onChange={this.handlePassword2Change}
                                className="form-control"
                                onBlur={this.password2Validation}
                            />
                            <div className='text-danger'>{this.state.pass2FieldError}</div>
                        </div>
                    </div>
                    <button type="submit"
                            className="btn btn-primary btn-block">Register
                    </button>
                </form>
            </div>
        )
    }
}

export default Register
