import React, {Component} from 'react'

class UpdateEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            emailFieldError: ''
        };
    };

    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        }, () => {
            this.emailValidation();
        })
    };

    emailValidation = () => {
        const email = this.state.email;
        const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

        this.setState({
            emailFieldError: emailValid ? null : 'Email address entered is not in a valid format'
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        const {email} = this.state;
        if (this.email !== "" && !this.state.emailFieldError) {
            alert(`Updated Email Address: ${email}`)

        } else {
            alert(`The email address submitted must be in valid form`)
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input name="email"

                           className={`form-control ${this.state.emailFieldError ? 'is-invalid' : ''}`}
                           id="email"
                           placeholder="Enter email"
                           value={this.state.email}
                           onChange={this.handleEmailChange}
                           onBlur={this.emailValidation}
                    />
                    <div className='invalid-feedback'>{this.state.emailFieldError}</div>
                </div>
                <button type="submit"
                        className="btn btn-success btn-block">Submit
                </button>
            </form>
        )
    }
}

export default UpdateEmail;
