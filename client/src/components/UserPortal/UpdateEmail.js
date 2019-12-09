import React, {Component} from 'react'
import axios from 'axios'

class UpdateEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailAddress: '',
            emailFieldError: '',
            currentEmail: ''
        };

        this.getCurrentEmail();
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

    getCurrentEmail() {
        axios.get('/api/userPortal/' + sessionStorage.getItem(this.key))
            .then(res => {
                console.log(res);
                this.setState({currentEmail: res.data.emailAddress})
            });
    }

    findAndUpdate() {
        axios.get('/api/userPortal/' + sessionStorage.getItem(this.key))
            .then(res => {
                console.log(res);
                this.updateEmailPreference(res.data);
            });
    }

    refreshPage() {
        window.location.reload();
        console.log('Refreshing');
    }

    updateEmailPreference(userInfo) {
        let id = userInfo._id;
        axios.put('/api/userPortal/' + id, {
            "name": userInfo.name,
            "address": userInfo.address,
            "phone": userInfo.phone,
            "emailAddress": this.state.emailAddress,
            "password": userInfo.password,
            "listings": userInfo.listings
        })
            .then(res => {
                this.setState({
                    currentEmail: this.state.emailAddress
                }, () => {
                    this.setState({emailAddress: ""})
                });
                console.log(res);
                console.log(res.data);
            });
        this.refreshPage();
    }

    render() {
        return (
            <div>
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
