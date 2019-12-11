import React, {Component, useState} from 'react';
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newpass: '',
            newpassconfirm: '',
            passwordFieldError: '',
            has_submit: '',
        };
    };

    //When called it will update the state of the password and then check
    //If newpass === newpassconfirm
    handlePasswordChange = event => {
        this.setState({
            newpass: event.target.value
        }, () => {
            this.passwordValidation();
        })
    };

    //Sets the secondary confirmation password, then checks same as above
    handlePasswordChangeConfirm = event => {
        this.setState({
            newpassconfirm: event.target.value
        }, () => {
            this.passwordValidation();
        })
    };

    //Check if the passwords are the same, if they are great, if they aren't change the error text.
    passwordValidation = () => {
        const password1 = this.state.newpass;
        const password2 = this.state.newpassconfirm;
        this.setState({
                passwordFieldError: password1 === password2 ? null :
                    'The passwords do not match.'
            }
        )
    };

    handleSubmit = event => {
        //Prevent from submitting empty forms.
        event.preventDefault();
        const {newpass} = this.state;
        const {newpassconfirm} = this.state;
        if (newpass !== "" && !this.state.passwordFieldError) {
            //If they passed the above logic, they've submitted
            this.state.has_submit = 'true';
            //Have to call set state to get the state to update immediately for the modal alert.
            this.setState({has_submit:this.state.has_submit});
            //Update the users password
            this.findAndUpdate();
        } else {
            //They didn't pass the logic, either because the password was empty
            //or the error field was populated.
            this.state.has_submit = 'false';
            //Have to call set to get the state to update immediately for the modal alert
            this.setState({has_submit:this.state.has_submit});
        }
    };

    findAndUpdate() {
        axios.get('/api/userPortal/' + sessionStorage.getItem(this.key))
            .then(res => {
                console.log(res);
                this.updatePasswordPreference(res.data);
            });
    }

    updatePasswordPreference(userInfo) {
        let id = userInfo._id;
        axios.put('/api/userPortal/' + id, {
            "name": userInfo.name,
            "address": userInfo.address,
            "phone": userInfo.phone,
            "emailAddress": userInfo.emailAddress,
            "password": this.state.newpass,
            "listings": userInfo.listings
        })
            .then(res => {
                this.setState({
                    newpass: "",
                    newpassconfirm: ""
                });
                console.log(res);
                console.log(res.data);
            })
    }
    /* onSubmit, onChange, and onBlur are all the important callers to the functions
    // Some one line conditional logic to change whether or not the form provides form feedback (line 106).
    // Submit button is in the modal function call, which is provided has_submit to be able to recognize
    // when the user has submit.
    */
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div class="form-row d-flex justify-content-center">
                <div className="form-group col-md-9">
                    <label htmlFor="password">Enter your new password</label>
                    <input name="name"
                           className={`form-control ${this.state.passwordFieldError ? 'is-invalid' : ''}`}
                           id="password"
                           placeholder="Enter your new password"
                           value={this.state.newpass}
                           onChange={this.handlePasswordChange}
                           onBlur={this.passwordValidation}
                    />
                    <div className='invalid-feedback'></div>
                    </div>
                </div>
                <div class="form-row d-flex justify-content-center">
                <div className="form-group col-md-9">
                    <label htmlFor="password2">Confirm your new password</label>
                    <input name="password2"
                           className={`form-control ${this.state.passwordFieldError ? 'is-invalid' : ''}`}
                           id="password2"
                           placeholder="Enter your new password again"
                           value={this.state.newpassconfirm}
                           onChange={this.handlePasswordChangeConfirm}
                           onBlur={this.passwordValidation}
                    />
                    <div className='invalid-feedback'>{this.state.passwordFieldError}</div>
                </div>
                </div>
                <div class="form-row d-flex justify-content-center">
                    <Modal_display
                        has_submit={this.state.has_submit}/>
                </div>
            </form>
        )
    }
}

    /* The button will be displayed in the components render, but is tied to this function to use these
    // functions. When clicked it will call handleShow, which checks if the user is logged in and
    // sets the modal to be displayed. Passed has submit from initial render to know whether or not the user has submit the form
    */

function Modal_display(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const has_submit = props.has_submit;

    if (has_submit==='true') {
        return (
            <>
                <button type="submit"
                        className="btn btn-secondary btn-lg"
                        onClick={handleShow}>Submit
                </button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Your Password has been updated successfully!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    } else if (has_submit === 'false' || has_submit ===''){
        return (
            <>
                <button type="submit"
                        className="btn btn-secondary btn-lg"
                        onClick={handleShow}>Submit
                </button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Your password was not changed, please try again.</Modal.Body>
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
                Login
            </button>
        );
    }
}

export default ChangePassword;
