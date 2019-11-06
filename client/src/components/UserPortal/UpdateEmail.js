import React, {Component} from 'react'
import axios from 'axios'

class UpdateEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailPreferences: [],
            emailPreference: '',
            emailFieldError: ''
        };
    };

    handleEmailChange = event => {
        this.setState({
            emailPreference: event.target.value
        }, () => {
            this.emailValidation();
        })
    };

    emailValidation = () => {
        const email = this.state.emailPreference;
        const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

        this.setState({
            emailFieldError: emailValid ? null : 'Email address entered is not in a valid format'
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        const {emailPreference} = this.state;
        if (this.emailPreference !== "" && !this.state.emailFieldError) {
            alert(`Updated Email Address: ${emailPreference}`)

        } else {
            alert(`The email address submitted must be in valid form`)
        }

        this.saveEmailPreferences(emailPreference);
    };

    getEmailPreferences() {
        axios.get('/api/emailPreferences')
            .then(res => {
                console.log(res);
                this.setState({emailPreferences: res.data})
            })
    }

    saveEmailPreferences(emailPreference) {
        console.log(emailPreference);
        axios.post('/api/emailPreferences', {
            "emailAddress": emailPreference
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        return (


            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="emailPreference">Email</label>
                    <input name="emailPreference"

                           className={`form-control ${this.state.emailFieldError ? 'is-invalid' : ''}`}
                           id="emailPreference"
                           placeholder="Enter email"
                           value={this.state.emailPreference}
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
