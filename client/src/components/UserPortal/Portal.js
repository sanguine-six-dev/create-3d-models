import React, {Component} from 'react';
import ChangePassword from './ChangePassword';
import UpdateEmail from './UpdateEmail';
import UpdateContactInfo from './UpdateContactInfo';
import UserListings from './UserListings';
import AddListing from './AddListing';
import SubscriptionInfo from './SubscriptionInfo';
import UserData from './UserData';
import UserInfo from './UserInfo';
import './Portal.css';

class Portal extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div class="portal">
                <div class="row">
                    <div class="col-2" id="portal-col">
                        <div class="portal-pane">
                            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="true">My <br /> Profile</a>
                                <a className="nav-link" id="v-pills-display-listings-tab" data-toggle="pill" href="#v-pills-display-listings" role="tab" aria-controls="v-pills-display-listings" aria-selected="false">My <br/> Listings</a>
                                <a className="nav-link" id="v-pills-subscription-tab" data-toggle="pill" href="#v-pills-subscription" role="tab" aria-controls="v-pills-subscription" aria-selected="true">My <br/> Subscription</a>
                                <a className="nav-link" id="v-pills-add-listing-tab" data-toggle="pill" href="#v-pills-add-listing" role="tab" aria-controls="v-pills-add-listing" aria-selected="false">Add a <br/> Listing</a>
                                <a class="nav-link" id="v-pills-password-tab" data-toggle="pill" href="#v-pills-password" role="tab" aria-controls="v-pills-password" aria-selected="true">Change <br /> Password</a>
                                <a class="nav-link" id="v-pills-email-tab" data-toggle="pill" href="#v-pills-email" role="tab" aria-controls="v-pills-email" aria-selected="false">Update Email <br /> Preferences</a>
                                <a class="nav-link" id="v-pills-contact-tab" data-toggle="pill" href="#v-pills-contact" role="tab" aria-controls="v-pills-contact" aria-selected="false">Update <br /> Contact Info</a>
                                <a class="nav-link" id="v-pills-display-traffic-tab" data-toggle="pill" href="#v-pills-traffic" role="tab" aria-controls="v-pills-traffic" aria-selected="false">My <br /> Traffic</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-10">
                        <div class="portal-content">
                            <div class="tab-content navbar-left" id="v-pills-tabContent">
                                <div class="tab-pane fade show active" id="v-pills-welcome" role="tabpanel" aria-labelledby="v-pills-welcome-tab">Select an Option</div>
                                <div class="tab-pane fade show" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><UserInfo /></div>
                                <div className="tab-pane fade show" id="v-pills-display-listings" role="tabpanel" aria-labelledby="v-pills-display-listings-tab"><UserListings/></div>
                                <div className="tab-pane fade show" id="v-pills-add-listing" role="tabpanel" aria-labelledby="v-pills-add-listing-tab"><AddListing/></div>
                                <div className="tab-pane fade show" id="v-pills-subscription" role="tabpanel" aria-labelledby="v-pills-subscription-tab"><SubscriptionInfo/></div>
                                <div class="tab-pane fade show" id="v-pills-password" role="tabpanel" aria-labelledby="v-pills-password-tab"><ChangePassword /></div>
                                <div class="tab-pane fade show" id="v-pills-email" role="tabpanel" aria-labelledby="v-pills-email-tab"><UpdateEmail /></div>
                                <div class="tab-pane fade show" id="v-pills-contact" role="tabpanel" aria-labelledby="v-pills-contact-tab"><UpdateContactInfo /></div>
                                <div class="tab-pane fade show" id="v-pills-traffic" role="tabpanel" aria-labelledby="v-pills-traffic-tab"> <UserData />    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Portal;
