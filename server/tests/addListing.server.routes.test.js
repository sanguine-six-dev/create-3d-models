var should = require('should'),
    request = require('supertest'),
    express = require('../config/express'),
    AddListing = require('../models/listings.server.model');

/* Global variables */
var app, agent, id, id2;

/* Unit tests for testing server side routes for the emailPreferences API */
describe('AddListing CRUD tests', function () {

    this.timeout(10000);

    before(function (done) {
        app = express.init();
        agent = request.agent(app);

        done();
    });

    it('should it able to retrieve all of the listings', function (done) {
        agent.get('/api/listings')
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);
                res.body.should.have.length(2);
                done();
            });
    });
    it('should be able to retrieve an listing by id', function (done) {
        AddListing.findOne({userId: 1}, function (err, listing) {
            if (err) {
                console.log(err);
            } else {
                agent.get('/api/listings/' + listing._id)
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exist(err);
                        should.exist(res);
                        res.body.userId.should.equal(1);
                        res.body.listings[0].emailAddress.should.equal('testemail@test.com');
                        res.body._id.should.equal(listing._id.toString());
                        done();
                    });
            }
        });
    });

    it('should be able to save a listing', function (done) {
        let newListing = {
            userId: 3,
            listings: [{
                locationName: "Sad Farms",
                address1: "test address 1",
                address2: "test address 2",
                city: "Palatka",
                state: "FL",
                zip: "32217",
                phoneNumber: "3123121111",
                emailAddress: "testagain@yahoo.com"
            }]
        };
        agent.post('/api/listings')
            .send(newListing)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res.body._id);
                res.body.listings[0].emailAddress.should.equal('testagain@yahoo.com');
                id = res.body._id;
                done();
            });
    });


    it('should be able to update a listing', function (done) {
        let updatedListingInfo = {
            userId: 3,
            listings: [{
                locationName: "Updated Sad Farms",
                address1: "test address 1",
                address2: "test address 2",
                city: "Palatka",
                state: "FL",
                zip: "32217",
                phoneNumber: "3123121111",
                emailAddress: "testagain@yahoo.com"
            }]
        };

        agent.put('/api/listings/' + id)
            .send(updatedListingInfo)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res.body._id);
                res.body.listings[0].locationName.should.equal('Updated Sad Farms');
                done();
            });
    });

    it('should be able to delete a listing', function (done) {
        agent.delete('/api/listings/' + id)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);

                agent.get('/api/listings/' + id)
                    .expect(400)
                    .end(function (err, res) {
                        id = undefined;
                        done();
                    });
            })
    });

    after(function (done) {
        if (id) {
            AddListing.deleteOne({_id: id}, function (err) {
                if (err) throw err;
                next();
            });
        }
        if (id2) {
            AddListing.deleteOne({_id: id2}, function (err) {
                if (err) throw err;
                done();
            });
        } else done();
    });
});
