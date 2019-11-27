import React from 'react';
import PayPalButton from './PayPalButton'
import axios from 'axios';


//Current benefits and Upgraded benefits can be filled out after we are given more information from the client.
//No styling or css has been done.
//Throws warnings when comparing in PriceDisplay
//Needs selectedOption to be an number


//We need to move the client ID to another file at some point
const CLIENT = {
    sandbox: "AXZJyFj_3N6Lsh0h9JcZBi9eHM4csjjZwN0WcwDFjdoEKD7iEvWaBq6YdL_oirIHtZCe3ee3ENpxoot4"
  };

const ENV = 'sandbox' //I only have access to sandbox testing currently

class SubscriptionInfo extends React.Component {
    //This holds the state of the subscription level dropdown box
    //priceLevel will eventually be used to display the correct pricepoints.
    state = {
        selectedOption: "",
        priceLevel: "",
        userId: 1234, //Will need to update this somewhere in the component
        subscriptionTier: 0
    };

    componentWillMount() {
        axios.get('/api/userPortal')
            .then(res => {
                console.log(res);
                res.data.find((info) => {
                    if (info.userId === this.state.userId) {
                       this.setState({
                           subscriptionTier: info.listings[0].subscriptionTier
                       })
                    }
                })
            });
    }

    render() {

        var tierName = "Free Listing"
        if (this.state.subscriptionTier == 1) {
            tierName = "Basic Listing"
        }
        else if (this.state.subscriptionTier == 2) {
            tierName = "Premium Listing"
        }
        else if (this.state.subscriptionTier == 3) {
            tierName = "Splash Page Listing"
        }
        
        return (
            <div
            class="form-row d-flex justify-content-center"
        >
            <div className="form-group col-md-9"
                id="subscriptionAll"
            >
                <p>Your current subscription level:</p>
                <p class="text-center subscription">{tierName}</p>
                <br/>

                <p>Choose subscription level:
                    <select
                        className="browser-default custom-select"
                        value={this.state.selectedOption}
                        onChange={(e) => this.setState({selectedOption: e.target.value})}
                        id = "subscriptionSelector"
                    >
                        <option>Choose your option</option>
                        <option value="1">Basic Listing</option>
                        <option value="2">Premium Listing</option>
                        <option value="3">Splash Page Listing</option>
                    </select>
                </p>

                <PriceDisplay
                        selectedOption={this.state.selectedOption}
                        subscriptionTier={this.state.subscriptionTier}
                />
                
                <br/>
                    <p>Current benefits:</p>
                <br/>
                <p class="text-center subscription">
                    Business Name <br/>
                    Business Address with a location on Google Maps <br/>
                    Phone Number <br/>
                    Link to your website <br/>
                    <br/>
                </p>

                    <p>Upgraded benefits:</p>
                <br/>
                <BenefitsDisplay
                        selectedOption={this.state.selectedOption}
                />

                <CheckoutButtonDisplay
                    selectedOption={this.state.selectedOption}
                    subscriptionTier={this.state.subscriptionTier}
                    userId={this.state.userId}
                />
            </div>
            </div>
        )
    }
}

// Uses conditional rendering
// This function asks for the state of the selector dropdown and returns the appropriate price.
// Prices are undetermined.
// Props are passed in through the call to the function in render
// Any number of extra props can be added by including them in the call.
// Double equal is used because selectedOption is technically a string
function PriceDisplay(props) {
    const selected = props.selectedOption.valueOf();
    const currentTier = props.subscriptionTier.valueOf();
    var amountPaid = 0;
    var upgradeCost = 0;

    //Determine how much has already been paid
    if (currentTier == 1) {
        amountPaid = 59
    }
    else if (currentTier == 2) {
        amountPaid = 89
    }
    else if (currentTier == 3) {
        amountPaid = 199
    }
    else {
        amountPaid = 0
    }

    //Determine how much to pay for the upraded subscription tier
    if (selected == 1) {
        upgradeCost = 59 - amountPaid;
    } else if (selected == 2){
        upgradeCost = 89 - amountPaid;
    } else if (selected == 3){
        upgradeCost = 199 - amountPaid;
    } else {
        return null;
    }

    return(
        <div>
            <br/>
            <p>Price to upgrade:</p>
            <p class="text-center subscription">${upgradeCost}.00</p>
        </div>
    );

}

//This only displays the button for now.
//When making the secure checkout system, it'll have to link to that.
//Unsure of how the checkout system will be implemented, but I don't think that the price point really needs to be saved
//It would just link to the respective checkout page that would have the correct price already.
function CheckoutButtonDisplay(props) {
    const selected = props.selectedOption.valueOf();
    const currentTier = props.subscriptionTier.valueOf();
    var amountPaid = 0;
    var upgradeCost = 0;

    if (selected > 0) {

        const onSuccess = (payment) =>
            console.log('Successful payment!', payment);

        const onError = (error) =>
            console.log('Erroneous payment OR failed to load script!', error);

        const onCancel = (data) =>
            console.log('Cancelled payment!', data);


       //Determine how much has already been paid
        if (currentTier == 1) {
            amountPaid = 59
        }
        else if (currentTier == 2) {
            amountPaid = 89
        }
        else if (currentTier == 3) {
            amountPaid = 199
        }
        else {
            amountPaid = 0
        }

        //Determine how much to pay for the upraded subscription tier
        if (selected == 1) {
            upgradeCost = 59 - amountPaid;
        } else if (selected == 2){
            upgradeCost = 89 - amountPaid;
        } else if (selected == 3){
            upgradeCost = 199 - amountPaid;
        } else {
            return null;
        }

        return(
            <div
                class="form-row d-flex justify-content-center"
            >
                <div>
                    <PayPalButton
                     env={ENV}
                     commit={true}
                     amount={upgradeCost}
                     newTier={selected}
                     userId={props.userId}
                     clientId={CLIENT.sandbox}
                     currency="USD"
                     shippingPreference={"NO_SHIPPING"}
                     style={{}}
                     total={100}
                     onSuccess={onSuccess}
                     onError={onError}
                     onCancel={onCancel}
                    />
                </div>
            </div>
        );
    } else {
        return null;
    }

}

function BenefitsDisplay(props) {
    const selected = props.selectedOption.valueOf();

    //Set the description based on the chosen subscription tier level
    if (selected == 1) {
        return (
            <p class="text-center subscription">
                Business Name <br/>
                Business Address with a location on Google Maps <br/>
                Phone Number <br/>
                Link to your website <br/>
                <b>Photos, videos, or existing 360 imagery</b> <br/>
                <br/>
            </p>
        )
    }
    else if (selected == 2) {
        return (
            <p class="text-center subscription">
                Business Name <br/>
                Business Address with a location on Google Maps <br/>
                Phone Number <br/>
                Link to your website <br/>
                <b>Professional 360 imagery of business</b> <br/>
                <br/>
            </p>
        )
    }
    else if (selected == 3) {
        return (
            <p class="text-center subscription">
                Business Name <br/>
                Business Address with a location on Google Maps <br/>
                Phone Number <br/>
                Link to your website <br/>
                <b>Professional 360 imagery of business</b> <br/>
                <b>360 image uploaded to Google Maps and placement on Google My Business</b> <br/>
                <b>Link to Premium Listing (included)</b> <br/>
                <br/>
            </p>
        )
    }
    else {
        return (
            <p></p>
        )
    }
}
export default SubscriptionInfo;