import React from 'react';
import axios from 'axios';

class AddListing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: 1,
            listings: []
        };

        const {data} = this.props;

        this.handleSubmit = this.addListing.bind(this);
    };



    addListing = event => {
        event.preventDefault();

        this.findAndUpdate();

        let newListing = {
            name: this.name.value,
            address: {
                address1: this.address1.value,
                address2: this.address2.value,
                city: this.city.value,
                state: this.state.value,
                zip: this.zip.value
            },
            phone: this.phone.value,
            email: this.email.value
        };

        console.log(newListing);

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    findAndUpdate() {
        axios.get('/api/userPortal')
            .then(res => {
                console.log(res);
                res.data.find((listing) => {
                        if (listing.userId === this.state.userId) {
                            console.log(`here is the user's info found: ${JSON.stringify(listing)}`);

                            this.updateContactInfo(listing);
                        }
                    }
                );
            });
    };

    updatelistings(listing) {
        let id = listing._id;
        axios.put('/api/userPortal/' + id, {
            "userId": listing.userId,
            "name": this.state.name,
            "phone": this.state.phone,
            "address": this.state.address,
            "emailAddress": listing.emailAddress,
            "listing": {
                "name": this.name.value,
                    address: {
                address1: this.address1.value,
                    address2: this.address2.value,
                    city: this.city.value,
                    state: this.state.value,
                    zip: this.zip.value
            },
            phone: this.phone.value,
                email: this.email.value
        }
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
            <div>
                <form>
                    <div class="form-row d-flex justify-content-center">
                        <div class="form-group col-md-9">
                            <label for="name">Location Name</label>
                            <input type="text" class="form-control" id="name"
                                   placeholder="Enter your business name here..."/>
                        </div>
                    </div>

                    <div class="form-row d-flex justify-content-center">
                        <div class="form-group col-md-9">
                            <label for="address1">Address 1</label>
                            <input type="text" class="form-control" id="address1"
                                   placeholder="Eg: 1234 Alphabet Street"/>
                        </div>
                    </div>

                    <div class="form-row d-flex justify-content-center">
                        <div class="form-group col-md-9">
                            <label for="address2">Address</label>
                            <input type="text" class="form-control" id="address2"
                                   placeholder="Apt number, Studio, or Floor"/>
                        </div>
                    </div>

                    <div class="form-row d-flex justify-content-center">
                        <div class="form-group col-md-3">
                            <label for="city">City</label>
                            <input type="text" class="form-control" id="city" placeholder="City"/>
                        </div>

                        <div class="form-group col-md-3">
                            <label for="state">State</label>
                            <input type="text" class="form-control" id="state" placeholder="State"/>
                        </div>

                        <div class="form-group col-md-3">
                            <label for="zip">Zip</label>
                            <input type="text" class="form-control" id="address2" placeholder="Zip Code"/>
                        </div>
                    </div>

                    <div class="form-row d-flex justify-content-center">
                        <div class="form-group col-md-9">
                            <label for="phone">Phone Number</label>
                            <input type="tel" class="form-control" id="phone"
                                   placeholder="Enter your phone number here..." pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
                        </div>
                    </div>

                    <div class="form-row d-flex justify-content-center">
                        <div class="form-group col-md-9">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" id="email" placeholder="name@example.com"/>
                        </div>
                    </div>

                    <div class="form-row d-flex justify-content-center">
                        <button variant="primary" size="lg" class="btn btn-secondary btn-lg"
                                onClick={this.addListing.bind(this)}>
                            Add Listing
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddListing;
