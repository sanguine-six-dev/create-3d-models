/* Dependencies */
var mongoose = require('mongoose'),
    Listings = require('../models/listings.server.model.js');

/* Create a listing */
exports.create = function (req, res) {

    /* Instantiate an listing information*/
    var listing = new Listings(req.body);

    /* Then save the listing information */
    listing.save(function (err) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(listing);
            console.log(listing);
        }
    });
};

/* Show the current listing information */
exports.read = function (req, res) {
    /* send back the listing information as json from the request */
    res.json(req.listing);
};

/* Update user listing info - note the order in which this function is called by the router*/
exports.update = function (req, res) {
    var listing = req.listing;

    /* Replace the listing info properties with the new properties found in req.body */
    Listings.findByIdAndUpdate(listing._id, {
        userId: req.body.userId,
        listings: [{
            locationName: req.body.listings.locationName,
            address1: req.body.listings.address1,
            address2: req.body.listings.address2,
            city: req.body.listings.city,
            state: req.body.listings.state,
            zip: req.body.listings.zip,
            phoneNumber: req.body.listings.phoneNumber,
            emailAddress: req.body.listings.emailAddress,
        }]
    }, {new: true})
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.req.listing._id
                });
            }
            res.send(result);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.req.listing._id
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.req.listing._id
        });
    });
};

/* Delete the user's listing */
exports.delete = function (req, res) {
    var listing = req.listing;
    Listings.findByIdAndRemove(listing._id)
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "listing not found with id " + listing._id
                });
            }
            res.send({message: "listing deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + listing._id
            });
        }
        return res.status(500).send({
            message: "Could not delete listing with id " + listing._id
        });
    });

};

/* Retrieve all the user's listing info, sorted alphabetically by userId */
exports.list = function (req, res) {
    Listings.find()
        .sort({userId: 1})
        .then(addresses => {
            res.send(addresses);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving listing information."
        });
    });
};

/*
  Middleware: find listing information by its ID, then pass it to the next request handler.
 */
exports.listingByID = function (req, res, next, id) {
    Listings.findById(id).exec(function (err, userlistingInfo) {
        if (err) {
            res.status(400).send(err);
        } else {
            req.userlistingInfo = userlistingInfo;
            next();
        }
    });
};
