/* Dependencies */
var
    listings = require('../controllers/listings.server.controller.js'),
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

/*
  These method calls are responsible for routing requests to the correct request handler.
 */

router.route('/')
    .get(listings.list)
    .post(listings.create);

/*
  The ':' specifies a URL parameter.
 */

router.route('/:userByID')
    .get(listings.read)
    .put(listings.update)
    .delete(listings.delete);

router.param('userByID', listings.listingByID);

module.exports = router;
