import React, {Component, useState} from 'react'
import "./Pricing.css"
import {PricingTable, PricingSlot, PricingDetail} from 'react-pricing-table'
import {Container, Row} from "react-bootstrap";
import {withRouter} from 'react-router'
import Premium from "../../assets/premium.png";
import Address from "../../assets/address-icon.png";
import Image360 from "../../assets/360image.png";
import Upload from "../../assets/upload.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


class Pricing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            redirect: false,
        };
    }

    /* Things to note in this render section
    // All the icons are imported at the top, credited in documentation
    // The content divider is the div with the wrapper
    // also credited in documentation.
    // The pricing table is a free package found online for react 'react-pricing-table'
     */

    /* Issues: Professor noted that the divider might have been jittery.
    // Solution? Replace with an identical image in a similar manner to the icons.
    // Professor also noted that she personally didn't like the animation when hovering over each option.
     */

    render() {
        return(
            <div id="fullcontent">
                <div id="main_content">
                    <div id="full_width_wrapper">
                        <h1>Upgrade your subscription now and receive the following benefits:</h1>
                        <br/>
                        <br/>
                        <div id="content_centered">
                            <Container>
                                <Row className="justify-content-md-center">
                                    <img className="table-icon" src={Upload} id="uploadIcon"/>
                                    <p>The ability to upload your own pictures, videos, or 360 imagery for your listing</p>
                                </Row>
                                <Row className="justify-content-md-center">
                                    <img className="table-icon" src={Image360} id="abc"/>
                                    <p>Professional 360 imagery of your business by a photographer</p>
                                </Row>
                                <Row className="justify-content-md-center">
                                    <img className="table-icon" src={Address} id="googleIcon"/>
                                    <p>Placement on Googles "My Business", along with your 360 image being uploaded to Google Maps</p>
                                </Row>
                                <Row className="justify-content-md-center">
                                    <img className="table-icon" src={Premium} id="premiumIcon"/>
                                    <p>A link to a premium listing, which can help your business stand out with preferred viewing</p>
                                </Row>
                            </Container>
                        </div>
                        <div className="wrapper">
                            <div className="divider div-transparent div-arrow-down"></div>
                        </div>
                        <div id="price_table">
                            <div
                                id="subscriptionAll"
                            >
                                <PricingTable  highlightColor='#1976D2'>
                                    <PricingSlot title='FREE' priceText='$0/month'>
                                        <PricingDetail>Business Name</PricingDetail>
                                        <PricingDetail>Business Address with a location on Google Maps</PricingDetail>
                                        <PricingDetail>Phone Number</PricingDetail>
                                        <PricingDetail>Link to your website, social media, and a brief description of your business</PricingDetail>
                                        <PricingDetail><br></br></PricingDetail>
                                        <PricingDetail><br></br></PricingDetail>
                                        <PricingDetail><br></br></PricingDetail>
                                        <PricingDetail><br></br></PricingDetail>
                                        <PricingDetail><br></br></PricingDetail>
                                        <PricingDetail><br></br></PricingDetail>
                                        <PricingDetail><br></br></PricingDetail>
                                        <PricingDetail><br></br></PricingDetail>
                                        <button type="submit" className="btn btn-secondary btn-block" id="order">
                                            FREE
                                        </button>
                                    </PricingSlot>
                                    <PricingSlot title='BASIC' priceText='$59/month'>
                                        <PricingDetail>Business Name</PricingDetail>
                                        <PricingDetail>Business Address with a location on Google Maps</PricingDetail>
                                        <PricingDetail>Phone Number</PricingDetail>
                                        <PricingDetail>Link to your website, social media, and a brief description of your business</PricingDetail>
                                        <PricingDetail><b>Photos, Videos, or Existing 360 imagery</b></PricingDetail>
                                        <PricingDetail><br></br></PricingDetail>
                                        <PricingDetail><br></br></PricingDetail>
                                        <PricingDetail><br></br></PricingDetail>
                                        <PricingDetail><br></br></PricingDetail>
                                        <PricingDetail><br></br></PricingDetail>
                                        <PricingDetail><br></br></PricingDetail>
                                        <PricingDetail></PricingDetail>
                                        <Modal_display userId={sessionStorage.getItem(this.key)}
                                                       history={this.props.history}
                                        />
                                    </PricingSlot>
                                    <PricingSlot title='PREMIUM' priceText='$89/month'>
                                        <PricingDetail>Business Name</PricingDetail>
                                        <PricingDetail>Business Address with a location on Google Maps</PricingDetail>
                                        <PricingDetail>Phone Number</PricingDetail>
                                        <PricingDetail>Link to your website, social media, and a brief description of your business</PricingDetail>
                                        <PricingDetail><b>Photos, Videos, or Existing 360 imagery</b></PricingDetail>
                                        <PricingDetail><b>Professional 360 Imagery of your business</b></PricingDetail>
                                        <PricingDetail><br></br></PricingDetail>
                                        <PricingDetail><br></br></PricingDetail>
                                        <PricingDetail><br></br></PricingDetail>
                                        <PricingDetail><br></br></PricingDetail>
                                        <PricingDetail></PricingDetail>
                                        <PricingDetail></PricingDetail>
                                        <Modal_display userId={sessionStorage.getItem(this.key)}
                                                       history={this.props.history}
                                        />
                                    </PricingSlot>
                                    <PricingSlot title='SPLASH PAGE' priceText='$199/month'>
                                        <PricingDetail>Business Name</PricingDetail>
                                        <PricingDetail>Business Address with a location on Google Maps</PricingDetail>
                                        <PricingDetail>Phone Number</PricingDetail>
                                        <PricingDetail>Link to your website, social media, and a brief description of your business</PricingDetail>
                                        <PricingDetail><b><b>Photos, Videos, or Existing 360 imagery</b></b></PricingDetail>
                                        <PricingDetail><b>Professional 360 Imagery of your business</b></PricingDetail>
                                        <PricingDetail><b>360 Image uploaded to Google Maps, and placement on Google My Business</b></PricingDetail>
                                        <PricingDetail><b>Link to Premium Listing</b></PricingDetail>
                                        <PricingDetail></PricingDetail>
                                        <PricingDetail></PricingDetail>
                                        <Modal_display userId={sessionStorage.getItem(this.key)}
                                                       history={this.props.history}
                                        />
                                    </PricingSlot>
                                </PricingTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function Modal_display(props) {
    //Set the states that the modal can be in, initialize false.
    const [show, setShow] = useState(false);

    //userId and history are passed in by necessity
    //userId lets us check if the user is logged in
    let userId = props.userId;
    //history allows us to push the user and store their history.
    let history = props.history;

    function handleShow () {
        //Display the modal
        setShow(true);
    }

    function handleClose () {
        //Close the modal
        setShow(false);
        //This is just here to provide a slight delay when the user clicks out of the modal
        //Push sends the user to the portal, and stores the history in the history prop.
        setTimeout(function () {
            if (userId) {
                history.push('/Portal');
            }
        }, 500);
    }

    /* The button will be displayed in the components render, but is tied to this function to use these
    // functions. When clicked it will call handleShow, which checks if the user is logged in and
    // sets the modal to be displayed. When the modal is closed there is a slight delay that can be
    // adjusted by adjusting the timeout value (ms) above. Then the user is pushed to the portal.
     */

    /* Issue: The redirecting modal currently shows the same message whether or not the user is logged in
    // It would be a good idea to change the message with some conditional logic, so unlogged user knows
    // they are not logged in.
     */

    return (
            <>
                <button type="submit" onClick={handleShow} className="btn btn-secondary btn-block" id="order">
                    ORDER NOW
                </button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Redirecting</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Redirecting you to the user portal, where you can update your subscription under "My Subscription"</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
            </>
        );



}
//This statement assists with the push that is used to redirect the user to the userportal.
Pricing = withRouter(Pricing);
//Export the component to be used in App.js
export default Pricing