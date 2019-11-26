import React, {Component} from 'react';
import axios from "axios";

class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            phone: '',
            address: '',
            emailAddress: ''
        };

        this.getCurrentInformation();
    };

    getCurrentInformation() {
        axios.get('/api/userPortal/' + sessionStorage.getItem(this.key))
            .then(res => {
                console.log(res);
                this.setState(
                    {
                        name: res.data.name,
                        phone: res.data.phone,
                        address: res.data.address,
                        emailAddress: res.data.emailAddress
                    }
                )
            });
    }

    render() {
        return (
            <div>
                <p>
                    <h1>User Information</h1>
                    <p>Name: {this.state.name}</p>
                    <p>Phone Number: {this.state.phone}</p>
                    <p>Address: {this.state.address}</p>
                    <p>Email/Username: {this.state.emailAddress}</p>
                </p>
            </div>
        )
    }
}

export default UserInfo;
