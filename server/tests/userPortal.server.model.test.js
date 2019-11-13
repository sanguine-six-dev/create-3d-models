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
    UserPortal = require('../models/userPortal.server.model'),
    config = require('../config/config');

var userInfo;

userInfo = {
    userId: 999,
    name: "David",
    address: "123 abc lane",
    phone: "1112223333",
    emailAddress: "testemail@gmail.com",
    other: "test"
};

describe('User Portal Schema Unit Tests', function () {

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

        it('saves properly when user info is provided', function (done) {
            new UserPortal({
                userId: userInfo.userId,
                name: userInfo.name,
                address: userInfo.address,
                phone: userInfo.phone,
                emailAddress: userInfo.emailAddress,
            }).save(function (err, userInfo) {
                should.not.exist(err);
                id = userInfo._id;
                done();
            });
        });

    });

    afterEach(function (done) {
        if (id) {
            UserPortal.deleteOne({_id: id}).exec(function () {
                id = null;
                done();
            });
        } else {
            done();
        }
    });
});
