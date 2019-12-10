import React, {Component} from 'react';
import './OrderConfirm.css';


class OrderConfirm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //userId: ''
        };
    }

    

    render() {

        //I couldn't figure out any way to get these values here other than localStorage
        const listing = sessionStorage.getItem("listing")
        var cost = sessionStorage.getItem("cost")
        const newTier = sessionStorage.getItem("newTier")
        const email = sessionStorage.getItem("email")

        if (newTier == null) {
            return (
                <div class="text-center">
                    <h1>Sorry, something went wrong. </h1><br/>
                        <p>Please go back and try again. If the problem persists, please contact customer support.</p>
                </div>
            )
        }
        else {

            var subscriptionTier
            if (newTier == 1) {
                subscriptionTier = "Basic Listing"
            }
            else if (newTier == 2) {
                subscriptionTier = "Premium Listing"
            }
            else if (newTier == 3) {
                subscriptionTier = "Splash Page Listing"
            }

            cost = parseInt(cost, 10)
            var tax = (cost * .06).toFixed(2)
            tax = parseFloat(tax, 10)
            var total = (cost + tax)
            tax = tax.toFixed(2)
            total = total.toFixed(2)

            return (
                <div class="column">
                    <div class="row2">
                        <h1 class="text-center">Thank you for your order</h1>
                    </div>
                    <div class="text-center row2">
                        <b>A confirmation has been sent to {email}.</b>
                    </div>
                    <div class="container" id="order-summary">
                        <div class="row text-center">
                            <div class="col-sm order-col">
                                <b>Order Summary:</b>
                            </div>
                            <div class="col-sm order-col">
                                <b>{subscriptionTier} Upgrade</b>
                                <br/>
                                <div>for {listing}</div>
                                <br/>
                                <br/>
                                <b>Tax</b>
                                <br/>
                                <br/>
                                <hr/>
                                <b>Total</b>
                            </div>
                            <div class="col-sm order-col">
                                ${cost}.00
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                ${tax}
                                <br/>
                                <br/>
                                <hr/>
                                ${total}
                            </div>
    
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default OrderConfirm
