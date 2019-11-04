/* Adapted from Bootcamp4 BuildingList.js
 * I thought it could be useful to have the listings as
 * in a table. Clicking on one of the listings
 * displays the listing data in an adjacent infoBox. The infoBox
 * is handled by the ViewListing component.
 */


import React from "react"

class MyListing extends React.Component{
    render() {
		const { data } = this.props; //My thinking is the data array is the listings linked to the account

        //I left the text filtering functionality in here commented out in case we want to use it
		const listingList = data
		/*.filter(listing => {
			return listing.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) >= 0
		})*/
		.map(listing => {
			return (
				<tr key={listing.id} onClick={() => this.props.selectedUpdate(listing.id)}>
					<td> {listing.name} </td>
				</tr>
			);
		});

		return (
			<main>
            <div className="row">
              <div className="column1">
                <div className="tableWrapper">
                  <table className="table table-striped table-hover">
                    <tr>
                      <td>
                        <b>My Listings</b>
                      </td>
                    </tr>
                    <MyListing
                      data={this.props.data}
                      //filterText={this.state.filterText}
                      selectedUpdate={this.selectedUpdate.bind(this)}
					/>
                  </table>
                </div>
              </div>
              <div className="column2">
                <ViewListing
                selectedListing={this.state.selectedListing}
                data={this.props.data}
                />
              </div>
            </div>
          </main>
		<div>{listingList}</div>;
		)
    }    
}
export default MyListing;