/* Dependencies */
var mongoose = require('mongoose'),
    EmailPreference = require('../models/emailPreferences.server.model.js');

/* Create a emailAddress Preference */
exports.create = function (req, res) {

    /* Instantiate an EmailPreference */
    var emailAddress = new EmailPreference(req.body);


    /* Then save the email address */
    emailAddress.save(function (err) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(emailAddress);
            console.log(emailAddress);
        }
    });
};

/* Show the current email address */
exports.read = function (req, res) {
    /* send back the email address as json from the request */
    res.json(req.emailAddress);
};

/* Update an email address - note the order in which this function is called by the router*/
exports.update = function (req, res) {
    var emailAddress = req.emailAddress;

    /* Replace the emailPreference properties with the new properties found in req.body */
    EmailPreference.findByIdAndUpdate(emailAddress._id, {
        email: req.body.email,

    }, {new: true})
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.req.emailAddress._id
                });
            }
            res.send(result);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.req.emailAddress._id
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.req.emailAddress._id
        });
    });
};

/* Delete an email address */
exports.delete = function (req, res) {
    var emailAddress = req.emailAddress;
    EmailPreference.findByIdAndRemove(emailAddress._id)
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "email Address not found with id " + emailAddress._id
                });
            }
            res.send({message: "email Address deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + emailAddress._id
            });
        }
        return res.status(500).send({
            message: "Could not delete email Address with id " + emailAddress._id
        });
    });

};

/* Retrieve all the directory email addresses, sorted alphabetically by email */
exports.list = function (req, res) {
    EmailPreference.find()
        .sort({email: 1})
        .then(addresses => {
            res.send(addresses);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving email addresses."
        });
    });
};

/*
  Middleware: find a email address by its ID, then pass it to the next request handler.
 */
exports.emailByID = function (req, res, next, id) {
    EmailPreference.findById(id).exec(function (err, emailAddress) {
        if (err) {
            res.status(400).send(err);
        } else {
            req.emailAddress = emailAddress;
            next();
        }
    });
};
