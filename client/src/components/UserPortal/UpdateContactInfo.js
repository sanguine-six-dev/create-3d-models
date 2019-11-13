import React, {Component} from 'react'
import axios from 'axios'

class UpdateContactInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: 1,
            allContactInfo: [],
            contactInfo: {},
            name: '',
            phone: '',
            address: '',
            nameFieldError: '',
            phoneFieldError: '',
        };

        // This will pull all of the contact info out of the database
        this.getAllContactInfo();

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

            let userInfo = this.findContactInfo();
            console.log(`contact info id: ${userInfo._id}`);
            this.updateContactInfo(userInfo);

            console.log(`contact info preference: ${JSON.stringify(this.state.contactInfo)}`);
            this.resetForm();

        } else {
            alert(`Submission requires Name and Phone Number fields must be filled out.`)
        }

    };

    resetForm = () => {
        this.setState({
            name: "",
            phone: "",
            address: ""
        });
    };

    /***
     * This function will get every user's contact info out of the database
     */
    getAllContactInfo() {
        axios.get('/api/userPortal')
            .then(res => {
                console.log(res);
                this.setState({allContactInfo: res.data})
            })
    }

    /***
     * This function will get a particular user's contact info out of the database
     */
    getContactInfo() {
        axios.get('/api/userPortal/' + this.state.contactInfo._id)
            .then(res => {
                console.log(res);
                this.setState({contactInfo: res.data})
            })
    }

    /***
     * This function will save an contact info to the database
     */
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
                console.log(res);
                console.log(res.data);
            })
    }

    /***
     * This function will find the contact info based on userId
     */
    findContactInfo() {
        let userInfo = {};

        this.state.allContactInfo.find((info) => {
            if (info.userId === this.state.userId) {
                console.log(`here is the contact info found: ${JSON.stringify(info)}`);

                userInfo = info;
                this.setState(
                    {
                        contactInfo: info,
                        name: JSON.stringify(info.name),
                        phone: JSON.stringify(info.phone),
                        address: JSON.stringify(info.address)
                    }
                );
            }
        });
        return userInfo;
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
