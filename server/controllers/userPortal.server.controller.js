/* Dependencies */
var mongoose = require('mongoose'),
    UserPortal = require('../models/userPortal.server.model.js');

/* Create an user contact information */
exports.create = function (req, res) {

    /* Instantiate an user contact information*/
    var userContactInfo = new UserPortal(req.body);

    /* Then save the contact information */
    userContactInfo.save(function (err) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(userContactInfo);
            console.log(userContactInfo);
        }
    });
};

/* Show the current contact information */
exports.read = function (req, res) {
    /* send back the contact information as json from the request */
    res.json(req.userContactInfo);
};

/* Update user contact info - note the order in which this function is called by the router*/
exports.update = function (req, res) {
    var userContactInfo = req.userContactInfo;

    /* Replace the contact info properties with the new properties found in req.body */
    UserPortal.findByIdAndUpdate(userContactInfo._id, {
        userId: req.body.userId,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        emailAddress: req.body.emailAddress,
        password: req.body.password,
        listings: req.body.listings
    }, {new: true})
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.req.userContactInfo._id
                });
            }
            res.send(result);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.req.userContactInfo._id
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.req.userContactInfo._id
        });
    });
};

/* Delete the user's contact info */
exports.delete = function (req, res) {
    var userContactInfo = req.userContactInfo;
    UserPortal.findByIdAndRemove(userContactInfo._id)
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "contact info not found with id " + userContactInfo._id
                });
            }
            res.send({message: "contact info deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + userContactInfo._id
            });
        }
        return res.status(500).send({
            message: "Could not delete contact info with id " + userContactInfo._id
        });
    });

};

/* Retrieve all the user's contact info, sorted alphabetically by userId */
exports.list = function (req, res) {
    UserPortal.find()
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
exports.userByID = function (req, res, next, id) {
    UserPortal.findById(id).exec(function (err, userContactInfo) {
        if (err) {
            res.status(400).send(err);
        } else {
            req.userContactInfo = userContactInfo;
            next();
        }
    });
};
