import React, {Component} from 'react'

class UpdateContactInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            phone: '',
            address: '',
            nameFieldError: '',
            phoneFieldError: '',
        };
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
            this.nameValidation();
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
            phoneFieldError: phone.length > 10 ? null : 'Phone number must be longer than 10 numbers'
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        const {name, phone, address} = this.state;
        alert(`name: ${name}\n phone number: ${phone}\n address: ${address}`)
    };

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
                           onChange={this.handleAdressChange}
                    />
                    <div className='invalid-feedback'>{this.state.addressFieldError}</div>
                </div>
                <button type="submit"
                        className="btn btn-success btn-block">Submit
                </button>
            </form>
        )

    }
}

export default UpdateContactInfo;
