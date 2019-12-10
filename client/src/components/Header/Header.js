import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


const Header = () => {
    return (
        <div class="navbar-wrapper">
            <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
            <a class="navbar-brand" href="Home">
                <img src={ "/light360logo-3.png"} width="100" height="60" alt="" /></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-item nav-link" href="Home">Home <span class="sr-only">(current)</span></a>
                <a class="nav-item nav-link" href="SubscriptionInfo">Pricing</a>
                <a class="nav-item nav-link" href="Portal">User Portal</a>
                <a class="nav-item nav-link" href="Login">Login/Register</a>
                </div>

        
            </div>
            </nav>
        </div>

        
    )
}

export default Header;
