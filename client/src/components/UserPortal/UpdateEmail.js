import React, {Component} from 'react'
import axios from 'axios'

class UpdateEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: 1,
            emailAddress: '',
            emailFieldError: ''
        };

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

            this.findAndUpdate();
        } else {
            alert(`The email address submitted must be in valid form`)
        }
    };

    findAndUpdate() {
        axios.get('/api/userPortal')
            .then(res => {
                console.log(res);
                res.data.find((emailPreference) => {
                        if (emailPreference.userId === this.state.userId) {
                            console.log(`here is the user's info found: ${JSON.stringify(emailPreference)}`);

                            this.updateEmailPreference(emailPreference);

                        }
                    }
                );
            });
    }

    updateEmailPreference(userInfo) {
        let id = userInfo._id;
        axios.put('/api/userPortal/' + id, {
            "userId": userInfo.userId,
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
            <div>
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
