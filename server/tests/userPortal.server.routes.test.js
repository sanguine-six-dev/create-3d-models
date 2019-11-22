var should = require('should'),
    request = require('supertest'),
    express = require('../config/express'),
    UserPortal = require('../models/userPortal.server.model');

/* Global variables */
var app, agent, id, id2;

/* Unit tests for testing server side routes for the emailPreferences API */
describe('UserPortal CRUD tests', function () {

    this.timeout(10000);

    before(function (done) {
        app = express.init();
        agent = request.agent(app);

        done();
    });

    // it('should it able to retrieve all of the user's info', function(done) {
    //     agent.get('/api/emailPreferences')
    //         .expect(200)
    //         .end(function(err, res) {
    //             should.not.exist(err);
    //             should.exist(res);
    //             res.body.should.have.length(2);
    //             done();
    //         });
    // });
    it('should be able to retrieve an user\'s info by id', function (done) {
        UserPortal.findOne({userId: 2}, function (err, userInfo) {
            if (err) {
                console.log(err);
            } else {
                agent.get('/api/userPortal/' + userInfo._id)
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exist(err);
                        should.exist(res);
                        res.body.userId.should.equal(2);
                        res.body.emailAddress.should.equal('test2@gmail.com');
                        res.body._id.should.equal(userInfo._id.toString());
                        done();
                    });
            }
        });
    });

    it('should be able to save user info', function (done) {
        let userInfo = {
            userId: 999,
            name: "David",
            address: "123 abc lane",
            phone: "1112223333",
            emailAddress: "testemail@gmail.com",
            other: "test"
        };
        agent.post('/api/userPortal')
            .send(userInfo)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res.body._id);
                res.body.emailAddress.should.equal('testemail@gmail.com');
                id = res.body._id;
                done();
            });
    });


    it('should be able to update user info', function (done) {
        let updatedUserInfo = {
            userId: 1999,
            name: "Dave",
            address: "456 def trail",
            phone: "4445556666",
            emailAddress: "updatedtestemail@gmail.com",
            other: "test1"
        };

        agent.put('/api/userPortal/' + id)
            .send(updatedUserInfo)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res.body._id);
                res.body.emailAddress.should.equal('updatedtestemail@gmail.com');
                done();
            });
    });

    it('should be able to delete user info', function(done) {
        agent.delete('/api/userPortal/' + id)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                should.exist(res);

                agent.get('/api/userPortal/' + id)
                    .expect(400)
                    .end(function(err, res) {
                        id = undefined;
                        done();
                    });
            })
    });

    after(function (done) {
        if (id) {
            UserPortal.deleteOne({_id: id}, function (err) {
                if (err) throw err;
                next();
            });
        }
        if (id2) {
            UserPortal.deleteOne({_id: id2}, function (err) {
                if (err) throw err;
                done();
            });
        } else done();
    });
});
