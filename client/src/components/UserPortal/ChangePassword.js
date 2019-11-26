import React, {Component} from 'react';

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
    };

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
                <button type="submit"
                        className="btn btn-secondary btn-lg">Submit
                </button>
                </div>
            </form>
        )
    }
}

export default ChangePassword;