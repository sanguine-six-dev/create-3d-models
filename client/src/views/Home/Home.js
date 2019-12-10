import React, {Component} from 'react'
import axios from 'axios'
import './Home.css';



class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
        listingsArray: []
        }

        this.fetchListings = this.fetchListings.bind(this);
    }

    fetchListings = event => {
        console.log('Retrieving Listings!')
        event.preventDefault();
        let success = false;
        axios.get('/api/userPortal/fetchListings')
        .then(res => {
            console.log('Retrieved listings!')
        })
    }

    render() {
        return (
            <div class="homeCSS" >
                        
                <iframe onLoad={this.fetchListings} class="MapCSS" src='http://localhost:8081/index.html'  />

            </div>
        );
    }
}

export default Home;

