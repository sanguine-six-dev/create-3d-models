import React, {Component, useState} from 'react'
import axios from 'axios'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class UpdateContactInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            phone: '',
            address: '',
            nameFieldError: '',
            phoneFieldError: '',
            has_submit: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    /*
    This function sets the state of the user's name after a submission
     */
    handleNameChange = event => {
        this.setState({
            name: event.target.value
        }, () => {
            this.nameValidation();
        })
    };

    /*
    This function sets the state of the user's phone number after a submission
     */
    handlePhoneChange = event => {
        this.setState({
            phone: event.target.value
        }, () => {
            this.phoneValidation();
        })
    };

    /*
    This function sets the state of the user's address after a submission
     */
    handleAddressChange = event => {
        this.setState({
            address: event.target.value
        })
    };

    /*
    This function is a validation checker of the user's name
     */
    nameValidation = () => {
        const name = this.state.name;
        this.setState({
                nameFieldError: name.length > 1 ? null :
                    'Name must be longer than 1 character'
            }
        )
    };

    /*
    This function is a validation checker of the user's phone number
     */
    phoneValidation = () => {
        const phone = this.state.phone;
        this.setState({
            phoneFieldError: phone.length > 9 ? null : 'Phone number must be longer than 10 numbers'
        })
    };

    handleSubmit = event => {
        //Prevent the user from submitting an empty form
        event.preventDefault();
        const {name, phone, address, nameFieldError, phoneFieldError} = this.state;
        if (name !== "" && !nameFieldError && phone !== "" && !phoneFieldError) {
            //User had all the appropriate forms filled out, so they can submit
            this.state.has_submit = 'true';
            //Set the state to pass it to the modal later
            this.setState({has_submit:this.state.has_submit});
            //Update the users information
            this.findAndUpdate();
        } else {
            //Form was not filled out correctly
            this.state.has_submit = 'false';
            //Set the state to reflect they haven't actually submit.
            this.setState({has_submit:this.state.has_submit});
        }

    };

    /*
    This function does a http get request and passed the user object to the updateContactInfo function.
    The sessionStrorage has the user id of the logged in user.
     */
    findAndUpdate() {
        axios.get('/api/userPortal/' + sessionStorage.getItem(this.key))
            .then(res => {
                console.log(res);
                this.updateContactInfo(res.data);
            });
    }

    updateContactInfo(userInfo) {
        let id = userInfo._id;
        axios.put('/api/userPortal/' + id, {
            "name": this.state.name,
            "phone": this.state.phone,
            "address": this.state.address,
            "emailAddress": userInfo.emailAddress,
            "password": userInfo.password,
            "listings": userInfo.listings
        })
            .then(res => {
                // clear form input fields
                this.setState({
                    name: "",
                    phone: "",
                    address: ""
                });
                console.log(res);
                console.log(res.data);
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div class="form-row d-flex justify-content-center">
                    <div className="form-group col-md-9">
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
                </div>
                <div class="form-row d-flex justify-content-center">
                    <div className="form-group col-md-9">
                        <label htmlFor="phone">Phone Number</label>
                        <input name="phone"

                               className={`form-control ${this.state.phoneFieldError ? 'is-invalid' : ''}`}
                               id="phone"
                               placeholder="Enter phone number (###-###-####)"
                               value={this.state.phone}
                               onChange={this.handlePhoneChange}
                               onBlur={this.phoneValidation}
                               pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        />
                        <div className='invalid-feedback'>{this.state.phoneFieldError}</div>
                    </div>
                </div>
                <div class="form-row d-flex justify-content-center">
                    <div className="form-group col-md-9">
                        <label htmlFor="address">Address</label>
                        <input name="address"

                               className={`form-control`}
                               id="address"
                               placeholder="Enter address (optional)"
                               value={this.state.address}
                               onChange={this.handleAddressChange}
                        />
                    </div>
                </div>
                <div class="form-row d-flex justify-content-center">
                    <Modal_display
                        has_submit={this.state.has_submit}
                        name={this.state.name}
                        phone={this.state.phone}
                        address={this.state.address}
                    />
                </div>
            </form>
        )

    }
}

    /* The button will be displayed in the components render, but is tied to this function to use these
       // functions. When clicked it will call handleShow, which checks if the user is logged in and
       // sets the modal to be displayed. When the modal is closed there is a slight delay that can be
       // adjusted by adjusting the timeout value (ms) above. Then the user's page is refreshed, so that
       // the data is updated appropriately.
        */

function Modal_display(props) {
    const [show, setShow] = useState(false);

    //Just refreshed the page.
    function refreshPage() {
        window.location.reload();
    }

    //When the modal alert is closed, slight delay, then the window reloads.
    function handleClose () {
        setShow(false);
        setTimeout(function () {
            if (-1 === -1) {
                refreshPage();
            }
        }, 500);
    }
    function handleShow () {
        setShow(true);
    }
    const has_submit = props.has_submit;

    if (has_submit==='true') {
        return (
            <>
                <button type="submit"
                        className="btn btn-secondary btn-lg"
                        onClick={handleShow}>Submit
                </button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Your contact information has been updated successfully!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    } else if (has_submit === 'false' || has_submit ===''){
        return (
            <>
                <button type="submit"
                        className="btn btn-secondary btn-lg"
                        onClick={handleShow}>Submit
                </button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Submission requires Name and Phone Number fields must be filled out.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    } else {
        return (
            <button type="submit" onClick={handleShow} className="btn btn-secondary btn-block">
                Login
            </button>
        );
    }
}

export default UpdateContactInfo;
