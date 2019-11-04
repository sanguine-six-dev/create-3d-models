import React from 'react';

export default ({data, selectedListing}) => {

	const infoPanel = data
	.filter(listing => {
		return listing.id === selectedListing
    })
	.map(listing => { //Maybe include a listing.picture? Is there other info needed?
		return(
			<p>
				<h3>{listing.name}</h3>
				{listing.address}<br />
				{listing.phone}<br />
                {listing.link}<br />
			</p>
		)
})

	return (
		<div className="selectedListing">
			<p>
				{' '}
				{infoPanel}
			</p>
		</div>
	);
}