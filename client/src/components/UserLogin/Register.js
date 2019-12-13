import React, {Component, useState} from 'react'
import axios from 'axios'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

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
            pass2FieldError: '',
            registration_successful: '',
        };
    };

    handleRegister = event => {
        event.preventDefault();

        axios.get('/api/userPortal/register')
            .then(res => {
                axios.post('/api/userPortal/register', {
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
                        console.log(res);
                        console.log(res.data);
                        if (res.status === 200) {
                            this.state.registration_successful = 'true';
                            this.setState({registration_successful:this.state.registration_successful});
                        }
                    }).catch((error) => {
                    console.log(error.response);
                    this.state.registration_successful = 'false';
                    this.setState({registration_successful:this.state.registration_successful});
                })
            }).catch((error) => {
            console.log(error.response);
            this.state.registration_successful = 'false';
            this.setState({registration_successful:this.state.registration_successful});
        });
    };

    //As the user types their first name, this updates the state
    handleFirstChange = e => {
        this.setState({
            first_name: e.target.value
        });
    };
    //As the user types their last name, this updates the state
    handleLastChange = e => {
        this.setState({
            last_name: e.target.value
        });
    };
    //As the user types their email, this updates the state
    handleEmailChange = e => {
        this.setState({
            email_address: e.target.value
        });
    };
    //As the user types their password, this updates the state
    handlePasswordChange = e => {
        this.setState({
            password: e.target.value
        });
    };
    //As the user types their confirming password, this updates the state
    handlePassword2Change = e => {
        this.setState({
            passwordconfirm: e.target.value
        });
    };
    //This function checks to see if all the necessary characters in an email are in the form.
    //If they are not, it populates the form feedback with the error message.
    emailValidation = () => {
        const email = this.state.email_address;
        this.setState({
                emailFieldError: (email.length > 1 && email.includes("@") && email.includes(".")) ? null :
                    'Please enter a valid email address'
            }
        )
    };
    //This function checks to see if the first name form is filled in.
    //If they are not, it populates the form feedback with the error message.
    firstValidation = () => {
        const first = this.state.first_name;
        this.setState({
                firstFieldError: (first.length > 0) ? null :
                    'Please enter a first name'
            }
        )
    };

    //This function checks to see if the last name form is filled in.
    //If they are not, it populates the form feedback with the error message.
    lastValidation = () => {
        const last = this.state.last_name;
        this.setState({
                lastFieldError: (last.length > 0) ? null :
                    'Please enter a last name'
            }
        )
    };
    //This function checks to see if the password is at least 5 characters.
    //If they are not, it populates the form feedback with the error message.
    passwordValidation = () => {
        const password = this.state.password;
        this.setState({
                passFieldError: (password.length >= 5) ? null :
                    'Please enter a password with more than 5 characters.'
            }
        )
    };

    //This function checks to see if the first password matches the second.
    //If they are not, it populates the form feedback with the error message.
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
                    <Modal_display
                        registration_successful={this.state.registration_successful}/>
                </form>
            </div>
        )
    }
}
       /* The button will be displayed in the components render, but is tied to this function to use these
       // functions. When clicked it will call handleShow, which checks if the registration was successful and
       // sets the modal to be displayed. Nothing happens when the modal is closed.
       */

function Modal_display(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let registration_successful = props.registration_successful;

    if (registration_successful === 'true') {
        return (
            <>
                <button type="submit" onClick={handleShow} className="btn btn-secondary btn-block">
                    Register
                </button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registered</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Congratulations, you've successfully registered!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
      
    } else if (registration_successful === 'false' || registration_successful === ''){
        return (
            <>
                <button type="submit" onClick={handleShow} className="btn btn-secondary btn-block">
                    Register
                </button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please check your forms again, you have not been registered.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    } else {
        return (
            <button type="submit" onClick={handleShow} className="btn btn-secondary btn-block">
                Register
            </button>
        );
    }
}

export default Register
