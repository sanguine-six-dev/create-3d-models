/* Dependencies */
var mongoose = require('mongoose'),
    EmailPreference = require('../models/emailPreferences.server.model.js');

/* Create a emailAddress Preference */
exports.create = function (req, res) {

    /* Instantiate an EmailPreference */
    var emailPreference = new EmailPreference(req.body);

    /* Then save the email address */
    emailPreference.save(function (err) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(emailPreference);
            console.log(emailPreference);
        }
    });
};

/* Show the current email address */
exports.read = function (req, res) {
    /* send back the email address as json from the request */
    res.json(req.emailPreference);
};

/* Update an email address - note the order in which this function is called by the router*/
exports.update = function (req, res) {
    var emailPreference = req.emailPreference;

    /* Replace the emailPreference properties with the new properties found in req.body */
    EmailPreference.findByIdAndUpdate(emailPreference._id, {
        userId: req.body.userId,
        emailAddress: req.body.emailAddress,

    }, {new: true})
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.req.emailPreference._id
                });
            }
            res.send(result);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.req.emailPreference._id
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.req.emailPreference._id
        });
    });
};

/* Delete an email address */
exports.delete = function (req, res) {
    var emailPreference = req.emailPreference;
    EmailPreference.findByIdAndRemove(emailPreference._id)
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "email Address not found with id " + emailPreference._id
                });
            }
            res.send({message: "email Address deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + emailPreference._id
            });
        }
        return res.status(500).send({
            message: "Could not delete email Address with id " + emailPreference._id
        });
    });

};

/* Retrieve all the directory email addresses, sorted alphabetically by email */
exports.list = function (req, res) {
    EmailPreference.find()
        .sort({userId: 1})
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
    EmailPreference.findById(id).exec(function (err, emailPreference) {
        if (err) {
            res.status(400).send(err);
        } else {
            req.emailPreference = emailPreference;
            next();
        }
    });
};
