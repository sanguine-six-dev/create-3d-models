/*Note about model test
  This is not actually testing how content gets saved in your database or not.
  It is testing that you model works. If you deleted your database this would still work.
  If you ran this with the code provided in the assignment it would still pass most tests because
  you have empty constructors.

  Note: It may actually run initially but save garbage in your database that will then cause
  other issues later.
  */

var should = require('should'),
    mongoose = require('mongoose'),
    AddListing = require('../models/listings.server.model'),
    config = require('../config/config');

let newListing = {
    userId: 3,
    LocationName: "Happy Farms",
    address1: "address 1",
    address2: "address 2",
    city: "Palatka",
    state: "FL",
    zip: "32217",
    phoneNumber: "3123121111",
    emailAddress: "test@yahoo.com"
};

describe('Listings Schema Unit Tests', function () {

    before(function (done) {
        mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);
        done();
    });

    describe('Saving to database', function () {
        /*
          Mocha's default timeout for tests is 2000ms. To ensure that the tests do not fail
          prematurely, we can increase the timeout setting with the method this.timeout()
         */
        this.timeout(10000);

        it('saves properly when new listing is provided', function (done) {
            AddListing({
                userId: newListing.userId,
                locationName: newListing.LocationName,
                address1: newListing.address1,
                address2: newListing.address2,
                city: newListing.city,
                state: newListing.state,
                zip: newListing.zip,
                phoneNumber: newListing.phoneNumber,
                emailAddress: newListing.emailAddress
            }).save(function (err, listing) {
                should.not.exist(err);
                id = listing._id;
                done();
            });
        });

    });

    afterEach(function (done) {
        if (id) {
            AddListing.deleteOne({_id: id}).exec(function () {
                id = null;
                done();
            });
        } else {
            done();
        }
    });
});
