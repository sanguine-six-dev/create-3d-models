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
        return (
            <div class="column">
                <div class="row2">
                    <h1 class="text-center">Thank you for your order</h1>
                </div>
                <div class="text-center row2">
                    <b>A confirmation has been sent to your email address.</b>
                </div>
                <div class="container" id="order-summary">
                    <div class="row text-center">
                        <div class="col-sm order-col">
                            <b>Summary:</b>
                        </div>
                        <div class="col-sm order-col">
                            <b>Premium Listing (monthly)</b>
                            <br/>
                            <div>for Happy Farms</div>
                            <br/>
                            <br/>
                            <b>Tax</b>
                            <br/>
                            <br/>
                            <hr/>
                            <b>Total</b>
                        </div>
                        <div class="col-sm order-col">
                            $89.00
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            $5.34
                            <br/>
                            <br/>
                            <hr/>
                            $94.34
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default OrderConfirm
