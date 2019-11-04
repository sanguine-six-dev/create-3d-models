import React from 'react';

//Current benefits and Upgraded benefits can be filled out after we are given more information from the client.
//No styling or css has been done.
//Throws warnings when comparing in PriceDisplay
//Needs selectedOption to be an number

class SubscriptionInfo extends React.Component {
    //This holds the state of the subscription level dropdown box
    //priceLevel will eventually be used to display the correct pricepoints.
    state = {
        selectedOption: "",
        priceLevel: ""
    };

    render() {
        return (
            <div
                id="subscriptionAll"
            >
                <p>Current subscription level:
                    <select
                        className="browser-default custom-select"
                        value={this.state.selectedOption}
                        onChange={(e) => this.setState({selectedOption: e.target.value})}
                        id = "subscriptionSelector"
                    >
                        <option>Choose your option</option>
                        <option value="1">Subscription Level 1</option>
                        <option value="2">Subscription Level 2</option>
                        <option value="3">Subscription Level 3</option>
                    </select>
                </p>

                <PriceDisplay
                        selectedOption={this.state.selectedOption}
                />
                <br/>

                <p>Current benefits:</p>
                <br/>

                <p>Upgraded benefits:</p>
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
                <p>Price to upgrade: Pricepoint1</p>
            </div>
        );
    } else if (selected == 2){
        return(
            <div>
                <br/>
                <p>Price to upgrade: Pricepoint2</p>
            </div>
        );
    } else if (selected == 3){
        return(
            <div>
                <br/>
                <p>Price to upgrade: Pricepoint3</p>
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
        return(
            <div
                class="form-row d-flex justify-content-center"
            >
                <button
                    variant="primary"
                    size="lg"
                    className="btn btn-secondary btn-lg"
                >
                    Checkout
                </button>
            </div>
        );
    } else {
        return null;
    }

}
export default SubscriptionInfo;