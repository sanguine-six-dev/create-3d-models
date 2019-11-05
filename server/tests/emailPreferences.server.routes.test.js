var should = require('should'),
    request = require('supertest'),
    express = require('../config/express'),
    EmailPreference = require('../models/emailPreferences.server.model');

/* Global variables */
var app, agent, emailPreference, id, id2;

/* Unit tests for testing server side routes for the emailPreferences API */
describe('EmailPreferences CRUD tests', function () {

    this.timeout(10000);

    before(function (done) {
        app = express.init();
        agent = request.agent(app);

        done();
    });

    // it('should it able to retrieve all email preferences', function(done) {
    //     agent.get('/api/emailPreferences')
    //         .expect(200)
    //         .end(function(err, res) {
    //             should.not.exist(err);
    //             should.exist(res);
    //             res.body.should.have.length(2);
    //             done();
    //         });
    // });
    it('should be able to retrieve an single email preference', function (done) {
        EmailPreference.findOne({emailAddress: 'testemail@gmail.com'}, function (err, emailPreference) {
            if (err) {
                console.log(err);
            } else {
                agent.get('/api/emailPreferences/' + emailPreference._id)
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exist(err);
                        should.exist(res);
                        res.body.emailAddress.should.equal('testemail@gmail.com');
                        res.body._id.should.equal(emailPreference._id.toString());
                        done();
                    });
            }
        });
    });

    it('should be able to save an email preference', function (done) {
        var emailPreference = {
            emailAddress: 'dmeadowstest@gmail.com'
        };
        agent.post('/api/emailPreferences')
            .send(emailPreference)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res.body._id);
                res.body.emailAddress.should.equal('dmeadowstest@gmail.com');
                id = res.body._id;
                done();
            });
    });


    it('should be able to update an email preference', function (done) {
        var updatedEmailPreference = {
            emailAddress: 'updatedtest@gmail.com'
        };

        agent.put('/api/emailPreferences/' + id)
            .send(updatedEmailPreference)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res.body._id);
                res.body.emailAddress.should.equal('dmeadowstest@gmail.com');
                done();
            });
    });

    // it('should be able to delete a email preference', function(done) {
    //     agent.delete('/api/emailPreferences/' + id)
    //         .expect(200)
    //         .end(function(err, res) {
    //             should.not.exist(err);
    //             should.exist(res);
    //
    //             agent.get('/api/emailPreferences/' + id)
    //                 .expect(400)
    //                 .end(function(err, res) {
    //                     id = undefined;
    //                     done();
    //                 });
    //         })
    // });

    after(function (done) {
        if (id) {
            EmailPreference.deleteOne({_id: id}, function (err) {
                if (err) throw err;
                next();
            });
        }
        if (id2) {
            EmailPreference.deleteOne({_id: id2}, function (err) {
                if (err) throw err;
                done();
            });
        } else done();
    });
});
