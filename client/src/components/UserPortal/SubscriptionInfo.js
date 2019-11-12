import React from 'react';
import PayPalButton from './PayPalButton'
import {PricingTable, PricingSlot, PricingDetail} from 'react-pricing-table';
import './SubscriptionInfo.css'


//Current benefits and Upgraded benefits can be filled out after we are given more information from the client.
//No styling or css has been done.
//Throws warnings when comparing in PriceDisplay
//Needs selectedOption to be an number


//We need to move the client ID to another file at some point
const CLIENT = {
    sandbox: 'AXZJyFj_3N6Lsh0h9JcZBi9eHM4csjjZwN0WcwDFjdoEKD7iEvWaBq6YdL_oirIHtZCe3ee3ENpxoot4'
  };

const ENV = 'sandbox' //I only have access to sandbox testing currently

class SubscriptionInfo extends React.Component {
    //This holds the state of the subscription level dropdown box
    //priceLevel will eventually be used to display the correct pricepoints.
    state = {
        selectedOption: "",
        priceLevel: "",
        subscriptionlevel: "Free (Needs link to DB)"
    };

    //Currently the subscriptionlevel is just set as "Free", it will need to eventually grab from the DB.
    render() {
        return (
            <div
                id="subscriptionAll"
            >
                <PricingTable  highlightColor='#1976D2'>
                    <PricingSlot title='FREE' priceText='$0/month'>
                        <PricingDetail>Business Name</PricingDetail>
                        <PricingDetail>Business Address with a location on Google Maps</PricingDetail>
                        <PricingDetail>Phone Number</PricingDetail>
                        <PricingDetail>Link to your website, social media, and a brief description of your business</PricingDetail>
                        <PricingDetail strikethrough><b>Photos, Videos, or Existing 360 imagery</b></PricingDetail>
                        <PricingDetail strikethrough><b>Professional 360 Imagery of your business</b></PricingDetail>
                        <PricingDetail strikethrough><b>360 Image uploaded to Google Maps, and placement on Google My Business</b></PricingDetail>
                        <PricingDetail strikethrough><b>Link to Premium Listing</b></PricingDetail>
                    </PricingSlot>
                    <PricingSlot onClick={this.submit} buttonText='SIGN UP' title='BASIC' priceText='$59/month'>
                        <PricingDetail>Business Name</PricingDetail>
                        <PricingDetail>Business Address with a location on Google Maps</PricingDetail>
                        <PricingDetail>Phone Number</PricingDetail>
                        <PricingDetail>Link to your website, social media, and a brief description of your business</PricingDetail>
                        <PricingDetail><b>Photos, Videos, or Existing 360 imagery</b></PricingDetail>
                        <PricingDetail strikethrough><b>Professional 360 Imagery of your business</b></PricingDetail>
                        <PricingDetail strikethrough><b>360 Image uploaded to Google Maps, and placement on Google My Business</b></PricingDetail>
                        <PricingDetail strikethrough><b>Link to Premium Listing</b></PricingDetail>
                    </PricingSlot>
                    <PricingSlot onClick={this.submit} buttonText='SIGN UP' title='PREMIUM' priceText='$89/month'>
                        <PricingDetail>Business Name</PricingDetail>
                        <PricingDetail>Business Address with a location on Google Maps</PricingDetail>
                        <PricingDetail>Phone Number</PricingDetail>
                        <PricingDetail>Link to your website, social media, and a brief description of your business</PricingDetail>
                        <PricingDetail><b>Photos, Videos, or Existing 360 imagery</b></PricingDetail>
                        <PricingDetail><b>Professional 360 Imagery of your business</b></PricingDetail>
                        <PricingDetail strikethrough><b>360 Image uploaded to Google Maps, and placement on Google My Business</b></PricingDetail>
                        <PricingDetail strikethrough><b>Link to Premium Listing</b></PricingDetail>
                    </PricingSlot>
                    <PricingSlot onClick={this.submit} buttonText='SIGN UP' title='SPLASH PAGE' priceText='$199/month'>
                        <PricingDetail>Business Name</PricingDetail>
                        <PricingDetail>Business Address with a location on Google Maps</PricingDetail>
                        <PricingDetail>Phone Number</PricingDetail>
                        <PricingDetail>Link to your website, social media, and a brief description of your business</PricingDetail>
                        <PricingDetail><b><b>Photos, Videos, or Existing 360 imagery</b></b></PricingDetail>
                        <PricingDetail><b>Professional 360 Imagery of your business</b></PricingDetail>
                        <PricingDetail><b>360 Image uploaded to Google Maps, and placement on Google My Business</b></PricingDetail>
                        <PricingDetail><b>Link to Premium Listing</b></PricingDetail>
                    </PricingSlot>
                </PricingTable>
                <p>Your current subscription level: <b>{this.state.subscriptionlevel}</b></p>
                <br/>

                <p>Choose a subscription level:
                    <select
                        className="browser-default custom-select"
                        value={this.state.selectedOption}
                        onChange={(e) => this.setState({selectedOption: e.target.value})}
                        id = "subscriptionSelector"
                    >
                        <option>Choose your option</option>
                        <option value="1">Basic</option>
                        <option value="2">Premium</option>
                        <option value="3">Splash Page</option>
                    </select>
                </p>

                <PriceDisplay
                        selectedOption={this.state.selectedOption}
                />
                <br/>

                <CheckoutButtonDisplay
                    selectedOption={this.state.selectedOption}
                />
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
    if (selected == 1) {
        return(
            <div>
                <br/>
                <p>Price to upgrade: <b>$59/month</b></p>
            </div>
        );
    } else if (selected == 2){
        return(
            <div>
                <br/>
                <p>Price to upgrade: <b>$89/month</b></p>
            </div>
        );
    } else if (selected == 3){
        return(
            <div>
                <br/>
                <p>Price to upgrade: <b>$199/month</b></p>
            </div>
        );
    } else {
        return null;
    }

}

//This only displays the button for now.
//When making the secure checkout system, it'll have to link to that.
//Unsure of how the checkout system will be implemented, but I don't think that the price point really needs to be saved
//It would just link to the respective checkout page that would have the correct price already.
function CheckoutButtonDisplay(props) {
    const selected = props.selectedOption.valueOf();
    if (selected > 0) {

        const onSuccess = (payment) =>
            console.log('Successful payment!', payment);

        const onError = (error) =>
            console.log('Erroneous payment OR failed to load script!', error);

        const onCancel = (data) =>
            console.log('Cancelled payment!', data);

        return(
            <div
                class="form-row d-flex justify-content-center"
            >
                <div>
                    <PayPalButton
                     client={CLIENT}
                     env={ENV}
                     commit={true}
                     amount="1.00"
                     currency={'USD'}
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
export default SubscriptionInfo;