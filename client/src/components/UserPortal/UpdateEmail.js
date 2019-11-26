import React, {Component} from 'react'
import axios from 'axios'

class UpdateEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: 1,
            currentEmail: '',
            emailPreferences: [],
            emailPreference: {},
            emailAddress: '',
            emailFieldError: ''
        };

        // This will pull all of the email preferences out of the database
        this.getEmailPreferences();

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.emailValidation = this.emailValidation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        if (emailAddress !== "" && !this.state.emailFieldError) {
            alert(`Updated Email Address: ${emailAddress}`);

            let userInfo = this.findEmailPreference();
            console.log(`email id: ${userInfo._id}`);

            this.updateEmailPreference(userInfo);

            this.resetForm();
        } else {
            alert(`The email address submitted must be in valid form`)
        }
    };

    resetForm = () => {
        this.setState({
            emailAddress: ""
        });
    };

    /***
     * This function will get all of the email preferences out of the database
     */
    getEmailPreferences() {
        axios.get('/api/userPortal')
            .then(res => {
                console.log(res);
                this.setState({emailPreferences: res.data})
            })
    }

    /***
     * This function will get all of the email preferences out of the database
     */
    getEmailPreference() {
        axios.get('/api/userPortal/' + this.state.emailPreference._id)
            .then(res => {
                console.log(res);
                this.setState({emailPreference: res.data})
            })
    }

    /***
     * This function will save an email preference to the database
     */
    updateEmailPreference(userInfo) {
        console.log(`emailAddress: ${this.state.emailAddress}`);
        console.log(`Address: ${userInfo.address}`);
        let id = userInfo._id;

        axios.put('/api/userPortal/' + id, {
            "userId": userInfo.userId,
            "name": userInfo.name,
            "address": userInfo.address,
            "phone": userInfo.phone,
            "emailAddress": this.state.emailAddress,

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
        let userInfo = {};
        this.state.emailPreferences.find((emailPreference) => {
            if (emailPreference.userId === this.state.userId) {
                console.log(`here is the user's info found: ${JSON.stringify(emailPreference)}`);
                userInfo = emailPreference;
                this.setState({
                    emailPreference: emailPreference,
                    currentEmail: JSON.stringify(emailPreference.emailAddress),
                    emailAddress: JSON.stringify(emailPreference.emailAddress)
                });

            }
        });
        return userInfo;
    }

    render() {
        return (
            <div>
                {/*<p>Current Email Address: {}</p>*/}
                {/*<br/>*/}
                <form onSubmit={this.handleSubmit}>
                <div class="form-row d-flex justify-content-center">
                    <div className="form-group col-md-9">
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
                    </div>
                    <div class="form-row d-flex justify-content-center">
                    <button type="submit"
                            className="btn btn-secondary btn-lg">Submit
                    </button>
                    </div>
                </form>
            </div>

        )
    }
}

export default UpdateEmail;
