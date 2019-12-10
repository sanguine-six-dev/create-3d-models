import React, {Component, useState} from 'react'
import "./Pricing.css"
import {PricingTable, PricingSlot, PricingDetail} from 'react-pricing-table'
import {Container, Row} from "react-bootstrap";
import {withRouter} from 'react-router'
import Premium from "../../assets/premium.png";
import Address from "../../assets/address-icon.png";
import Image360 from "../../assets/360image.png";
import Upload from "../../assets/upload.png";
import Redirect from "react-router-dom/es/Redirect";
import Login from "../UserLogin/Login";
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

    setUserId(userId) {
        if (userId !== '') {
            this.props.setUserId(userId);
        }
    }

    setRedirect = () => {
        if (sessionStorage.getItem(this.key) !== null) {
            this.setState({
                redirect: true
            })
        }
    };

    /* handlePush = () => {
        console.log(this.state.redirect);
        if (this.state.redirect) {
            this.props.history.push('/Portal');
        }
    };

    doRedirect = () => {
        this.setRedirect();
        this.handlePush();
    }; */

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
                                    <p>Professional 360 imagery of your business by a photographer.</p>
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
                                        <PricingDetail strikethrough><b>Photos, Videos, or Existing 360 imagery</b></PricingDetail>
                                        <PricingDetail strikethrough><b>Professional 360 Imagery of your business</b></PricingDetail>
                                        <PricingDetail strikethrough><b>360 Image uploaded to Google Maps, and placement on Google My Business</b></PricingDetail>
                                        <PricingDetail strikethrough><b>Link to Premium Listing</b></PricingDetail>
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
                                        <PricingDetail strikethrough><b>Professional 360 Imagery of your business</b></PricingDetail>
                                        <PricingDetail strikethrough><b>360 Image uploaded to Google Maps, and placement on Google My Business</b></PricingDetail>
                                        <PricingDetail strikethrough><b>Link to Premium Listing</b></PricingDetail>
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
                                        <PricingDetail strikethrough><b>360 Image uploaded to Google Maps, and placement on Google My Business</b></PricingDetail>
                                        <PricingDetail strikethrough><b>Link to Premium Listing</b></PricingDetail>
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
    const [show, setShow] = useState(false);

    let redirect;
    redirect = false;
    let userId = props.userId;
    let history = props.history;

    function handleShow () {
        //Display the modal
        setShow(true);
        //Make sure that the user is logged in.
        if (userId !== null) {
            redirect = true;
        }
    }

    function handleClose () {
        //Close the modal
        setShow(false);
        //This is just here to provide a slight delay when the user clicks out of the modal
        setTimeout(function () {
            if (userId) {
                history.push('/Portal');
            }
        }, 500);
    }

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

Pricing = withRouter(Pricing);

export default Pricing