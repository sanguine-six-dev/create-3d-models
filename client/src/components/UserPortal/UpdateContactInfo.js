import React, {Component} from 'react'
import axios from 'axios'

class UpdateContactInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: 1,
            name: '',
            phone: '',
            address: '',
            nameFieldError: '',
            phoneFieldError: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleNameChange = event => {
        this.setState({
            name: event.target.value
        }, () => {
            this.nameValidation();
        })
    };

    handlePhoneChange = event => {
        this.setState({
            phone: event.target.value
        }, () => {
            this.phoneValidation();
        })
    };

    handleAddressChange = event => {
        this.setState({
            address: event.target.value
        })
    };

    nameValidation = () => {
        const name = this.state.name;
        this.setState({
                nameFieldError: name.length > 1 ? null :
                    'Name must be longer than 1 character'
            }
        )
    };

    phoneValidation = () => {
        const phone = this.state.phone;
        this.setState({
            phoneFieldError: phone.length > 9 ? null : 'Phone number must be longer than 10 numbers'
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        const {name, phone, address, nameFieldError, phoneFieldError} = this.state;
        if (name !== "" && !nameFieldError && phone !== "" && !phoneFieldError) {
            alert(`name: ${name}\n phone number: ${phone}\n address: ${address}`);
            this.findAndUpdate();
        } else {
            alert(`Submission requires Name and Phone Number fields must be filled out.`)
        }

    };

    findAndUpdate() {
        axios.get('/api/userPortal')
            .then(res => {
                console.log(res);
                res.data.find((info) => {
                        if (info.userId === this.state.userId) {
                            console.log(`here is the user's info found: ${JSON.stringify(info)}`);

                            this.updateContactInfo(info);
                        }
                    }
                );
            });
    }

    updateContactInfo(userInfo) {
        let id = userInfo._id;
        axios.put('/api/userPortal/' + id, {
            "userId": userInfo.userId,
            "name": this.state.name,
            "phone": this.state.phone,
            "address": this.state.address,
            "emailAddress": userInfo.emailAddress
        })
            .then(res => {
                this.setState({
                    name: "",
                    phone: "",
                    address: ""
                });
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input name="name"
                           className={`form-control ${this.state.nameFieldError ? 'is-invalid' : ''}`}
                           id="name" placeholder="Enter name"
                           value={this.state.name}
                           onChange={this.handleNameChange}
                           onBlur={this.nameValidation}
                    />
                    <div className='invalid-feedback'>{this.state.nameFieldError}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input name="phone"

                           className={`form-control ${this.state.phoneFieldError ? 'is-invalid' : ''}`}
                           id="phone"
                           placeholder="Enter phone number"
                           value={this.state.phone}
                           onChange={this.handlePhoneChange}
                           onBlur={this.phoneValidation}
                    />
                    <div className='invalid-feedback'>{this.state.phoneFieldError}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input name="address"

                           className={`form-control`}
                           id="address"
                           placeholder="Enter address (optional)"
                           value={this.state.address}
                           onChange={this.handleAddressChange}
                    />
                </div>
                <button type="submit"
                        className="btn btn-success btn-block">Submit
                </button>
            </form>
        )

    }
}

export default UpdateContactInfo;
