import React, {Component} from 'react'
import axios from 'axios'

class UpdateEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: 1,
            emailPreferences: [],
            emailPreference: {},
            emailAddress: '',
            emailFieldError: ''
        };

        // This will pull all of the email preferences out of the database
        this.getEmailPreferences();
    };

    handleEmailChange = event => {
        this.setState({
            emailAddress: event.target.value
        }, () => {
            this.emailValidation();
        })
    };

    emailValidation = () => {
        const email = this.state.emailAddress;
        const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

        this.setState({
            emailFieldError: emailValid ? null : 'Email address entered is not in a valid format'
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        const {emailAddress} = this.state;
        if (this.emailAddress !== "" && !this.state.emailFieldError) {
            alert(`Updated Email Address: ${emailAddress}`)
        } else {
            alert(`The email address submitted must be in valid form`)
        }

        this.findEmailPreference();
        console.log(`email id: ${JSON.stringify(this.state.emailPreference._id)}`);
        this.updateEmailPreference();

        console.log(`email preferences: ${JSON.stringify(this.state.emailPreference)}`);
        console.log(`email preferences array: ${JSON.stringify(this.state.emailPreferences)}`);
    };

    /***
     * This function will get all of the email preferences out of the database
     */
    getEmailPreferences() {
        axios.get('/api/emailPreferences')
            .then(res => {
                console.log(res);
                this.setState({emailPreferences: res.data})
            })
    }

    /***
     * This function will get all of the email preferences out of the database
     */
    getEmailPreference() {
        axios.get('/api/emailPreferences/' + this.state.emailPreference._id)
            .then(res => {
                console.log(res);
                this.setState({emailPreference: res.data})
            })
    }

    /***
     * This function will save an email preference to the database
     */
    saveEmailPreference() {
        axios.post('/api/emailPreferences', {
            "userId": this.state.userId,
            "emailAddress": this.state.emailPreference.emailAddress
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    /***
     * This function will save an email preference to the database
     */
    updateEmailPreference() {
        axios.put('/api/emailPreferences/' + this.state.emailPreference._id, {
            "userId": this.state.userId,
            "emailAddress": this.state.emailAddress
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    /***
     * This function will find the emailPreference based on userId
     */
    findEmailPreference() {
        this.state.emailPreferences.find((emailPreference) => {
            if (emailPreference.userId === this.state.userId) {
                console.log(`here is the email found: ${JSON.stringify(emailPreference)}`)
                this.state.emailPreference = emailPreference;
            }
        });
    }

    render() {
        return (
            <div>
                <p>Current Email Adrress: {}</p>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="emailPreference">Email</label>
                        <input name="emailPreference"

                               className={`form-control ${this.state.emailFieldError ? 'is-invalid' : ''}`}
                               id="emailPreference"
                               placeholder="Enter email"
                               value={this.state.emailAddress}
                               onChange={this.handleEmailChange}
                               onBlur={this.emailValidation}
                        />
                        <div className='invalid-feedback'>{this.state.emailFieldError}</div>
                    </div>
                    <button type="submit"
                            className="btn btn-success btn-block">Submit
                    </button>
                </form>
            </div>

        )
    }
}

export default UpdateEmail;
