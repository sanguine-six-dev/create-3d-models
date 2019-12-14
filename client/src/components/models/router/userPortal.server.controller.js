var mongoose = require('mongoose'),
    UserPortal = require('.//userPortal.server.model.js');



exports.fetchListings = function(req, res) {
    UserPortal.find({}, {'listings': 1, '_id': 0}, (err, listings) => {
        res.send(listings)
    })

    
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving listing information."
        });
    });
}

