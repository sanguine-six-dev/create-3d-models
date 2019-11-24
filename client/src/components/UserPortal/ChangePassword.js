import React, {Component} from 'react';
import axios from "axios";

class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newpass: '',
            newpassconfirm: '',
            passwordFieldError: '',
        };
    };

    handlePasswordChange = event => {
        this.setState({
            newpass: event.target.value
        }, () => {
            this.passwordValidation();
        })
    };

    handlePasswordChangeConfirm = event => {
        this.setState({
            newpassconfirm: event.target.value
        }, () => {
            this.passwordValidation();
        })
    };

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
        event.preventDefault();
        const {newpass} = this.state;
        const {newpassconfirm} = this.state;
        if (newpass !== "" && !this.state.passwordFieldError) {
            alert(`Updated Password: ${newpass}`);

            this.findAndUpdate();
        } else {
            alert(`The email address submitted must be in valid form`)
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
            "emailAddress": this.state.emailAddress,
        })
            .then(res => {
                this.setState({
                    emailAddress: ""
                });
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
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
                <div className="form-group">
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
                <button type="submit"
                        className="btn btn-success btn-block">Submit
                </button>
            </form>
        )
    }
}

export default ChangePassword;
