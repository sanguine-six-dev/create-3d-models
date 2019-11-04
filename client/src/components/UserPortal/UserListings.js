/* Adapted from Bootcamp4 BuildingList.js
 * I thought it could be useful to have the listings as
 * in a table. Clicking on one of the listings
 * displays the listing data in an adjacent infoBox. The infoBox
 * is handled by the ViewListing component.
 */


import React from "react"
import ViewListing from './ViewListing'

class MyListing extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        //filterText: '',
        selectedListing: 0,
        //data: this.props
        };
    }

    selectedUpdate(id) {
        this.setState({
          selectedListing: id
        })
      }

    render() {

        //---------------------------------TEST DATA---------------------------------------------//
        var data = [
        {
            id: 1,
            name: 'Academic Advisement - Farrior Hall',
            address: '100 Fletcher Dr, Gainesville, FL 32611, United States',
            phone: 'Test phone number 1',
            link: 'one.uf'
        },
        {
            id: 2,
            name: 'Plant Pathology Research Lab 2',
            address: 'Test',
            phone: 'Test phone number 2',
            link: 'google.com'
        },
        ]
        //-----------------------------------------------------------------------------------------//

        //I left the text filtering functionality in here commented out in case we want to use it
		const listingList = data
		/*.filter(listing => {
			return listing.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) >= 0
		})*/
		.map(listing => {
			return (
				<tr key={listing.id} onClick={() => this.selectedUpdate(listing.id)}>
					<td> {listing.name} </td>
				</tr>
			);
		});

		return (
    
            <div class="row">
                <div class="column1">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">My Listings</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{listingList}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="column2">
                    <ViewListing
                        selectedListing={this.state.selectedListing}
                        data={data}
                    />
                </div>
            </div>
		)
    }    
}
export default MyListing;