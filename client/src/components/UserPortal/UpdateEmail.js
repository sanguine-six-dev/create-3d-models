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
        this.setState({
            emailFieldError: email.length > 1 ? null : 'Email address must be longer than 3 characters'
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        const {email} = this.state;
        alert(`email address: ${email}`)
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
