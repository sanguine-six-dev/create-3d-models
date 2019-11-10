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

        // preserve the initial state in a new object
        this.baseState = this.state;

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

            let id = this.findContactInfo();
            console.log(`contact info id: ${id}`);
            this.updateContactInfo(id);

            console.log(`contact info preferences: ${JSON.stringify(this.state.contactInfo)}`);
            console.log(`contact info preferences array: ${JSON.stringify(this.state.contactInfo)}`);
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
        axios.get('/api/contactInfo')
            .then(res => {
                console.log(res);
                this.setState({allContactInfo: res.data})
            })
    }

    /***
     * This function will get a particular user's contact info out of the database
     */
    getContactInfo() {
        axios.get('/api/contactInfo/' + this.state.contactInfo._id)
            .then(res => {
                console.log(res);
                this.setState({contactInfo: res.data})
            })
    }

    /***
     * This function will save an contact info to the database
     */
    saveContactInfo() {
        axios.post('/api/contactInfo', {
            "userId": this.state.userId,
            "name": this.state.contactInfo.name,
            "phone": this.state.contactInfo.phone,
            "address": this.state.contactInfo.address,

        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    /***
     * This function will save an contact info to the database
     */
    updateContactInfo(id) {
        axios.put('/api/contactInfo/' + id, {
            "userId": this.state.userId,
            "name": this.state.name,
            "phone": this.state.phone,
            "address": this.state.address,
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
        let id = "";
        this.state.allContactInfo.find((info) => {
            if (info.userId === this.state.userId) {
                console.log(`here is the contact info found: ${JSON.stringify(info)}`);

                let parsedInfo = JSON.parse(JSON.stringify(info));

                this.setState(
                    {
                        contactInfo: info,
                        name: JSON.stringify(info.name),
                        phone: JSON.stringify(info.phone),
                        address: JSON.stringify(info.address)
                    }
                );
                id = info._id;
            }
        });
        return id;
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
