/* Dependencies */
var mongoose = require('mongoose'),
    ContactInfo = require('../models/userPortal.server.model.js');

/* Create an user contact information */
exports.create = function (req, res) {

    /* Instantiate an user contact information*/
    var contactInfo = new ContactInfo(req.body);

    /* Then save the contact information */
    contactInfo.save(function (err) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(contactInfo);
            console.log(contactInfo);
        }
    });
};

/* Show the current contact information */
exports.read = function (req, res) {
    /* send back the contact information as json from the request */
    res.json(req.contactInfo);
};

/* Update user contact info - note the order in which this function is called by the router*/
exports.update = function (req, res) {
    var contactInfo = req.contactInfo;

    /* Replace the contact info properties with the new properties found in req.body */
    ContactInfo.findByIdAndUpdate(contactInfo._id, {
        userId: req.body.userId,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone

    }, {new: true})
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.req.contactInfo._id
                });
            }
            res.send(result);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.req.contactInfo._id
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.req.contactInfo._id
        });
    });
};

/* Delete the user's contact info */
exports.delete = function (req, res) {
    var contactInfo = req.contactInfo;
    ContactInfo.findByIdAndRemove(contactInfo._id)
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "contact info not found with id " + contactInfo._id
                });
            }
            res.send({message: "contact info deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + contactInfo._id
            });
        }
        return res.status(500).send({
            message: "Could not delete contact info with id " + contactInfo._id
        });
    });

};

/* Retrieve all the user's contact info, sorted alphabetically by userId */
exports.list = function (req, res) {
    ContactInfo.find()
        .sort({userId: 1})
        .then(addresses => {
            res.send(addresses);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving contact infomation."
        });
    });
};

/*
  Middleware: find contact information by its ID, then pass it to the next request handler.
 */
exports.contactByID = function (req, res, next, id) {
    ContactInfo.findById(id).exec(function (err, contactInfo) {
        if (err) {
            res.status(400).send(err);
        } else {
            req.contactInfo = contactInfo;
            next();
        }
    });
};
