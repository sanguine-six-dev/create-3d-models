import React from 'react';
import './ViewListing.css';
import Address from '../../assets/address-icon.png';
import Phone from '../../assets/phone-icon.png';
import Website from '../../assets/website-icon.png';
import axios from "axios";

export default ({data, selectedListing}) => {
    let handleRemove = event => {
        event.preventDefault();
        console.log(selectedListing);
        alert(`The listing has been removed`);
        removeListing();
    };

    let removeListing = () => {
        axios.delete('/api/userPortal/' + selectedListing)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
        refreshPage();
    };

    let refreshPage = () => {
        window.location.reload();
        console.log('Refreshing');
    };

    var url = 'http://'
    const infoPanel = data
        .filter(listing => {
            return listing._id === selectedListing
        })
        .map(listing => { //Maybe include a listing.picture? Is there other info needed?
            url += listing.data;
            return (

                <div class='listing-info'>
                    <th colspan='2' class='listing-header'>{listing.locationName}</th>
                    <tr class='listing-row'>
                        <td class='listing-data'>
                            <img class="table-icon" src={Address}/>
                        </td>
                        <td class='listing-data'>
                            {listing.address1}
                        </td>

                    </tr>
                    <tr class='listing-row'>
                        <td class='listing-data'>
                            <img class="table-icon" src={Phone}/>
                        </td>
                        <td class='listing-data'>
                            {listing.phoneNumber}
                        </td>

                    </tr>

                    <tr class='listing-row'>
                        <td class='listing-data'>
                            <img class="table-icon" src={Website}/>
                        </td>
                        <td class='listing-data'>

                            <a href="#" class="text-info"
                               onclick="javascript:window.open('{{url}}', '_blank', 'location=yes')">{listing.website}</a>
                        </td>
                    </tr>
                    <button type="Remove" onClick={handleRemove}
                            className="btn btn-secondary btn-sm">Remove
                    </button>
                </div>
            )
        });

    if (selectedListing === 0) {
        return (
            <div className="selectedListing">
                <p>
                    {' '}
                    Click on a listing to see more information
                    {infoPanel}
                </p>
            </div>
        );
    } else {
        return (
            <div className="selectedListing">
                <p>
                    {' '}
                    {infoPanel}
                </p>
            </div>
        );
    }
}
