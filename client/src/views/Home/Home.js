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

        event.preventDefault();

        // This returns only the listings data from the individual records/accounts
        axios.get('/api/userPortal/fetchListings')
        .then(res => {
            //This takes the data from the response, and concatenates it into one array
            var listings = [];
            var separateListingArrays = res.data.map(array => {
                return array.listings.map(items => {
                    listings.push(items);
                })
            })

            console.log(listings);
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
