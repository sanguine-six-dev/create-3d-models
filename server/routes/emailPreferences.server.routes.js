/* Dependencies */
var emailPreferences = require('../controllers/emailPreferences.server.controller.js'),
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

/*
  These method calls are responsible for routing requests to the correct request handler.
 */
router.route('/')
    .get(emailPreferences.list)
    .post(emailPreferences.create);

/*
  The ':' specifies a URL parameter.
 */
router.route('/:emailId')
    .get(emailPreferences.read)
    .put(emailPreferences.update)
    .delete(emailPreferences.delete);

router.param('emailId', emailPreferences.emailByID);

module.exports = router;
