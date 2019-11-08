/* Dependencies */
var contactInfo = require('../controllers/contactInfo.server.controller.js'),
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

/*
  These method calls are responsible for routing requests to the correct request handler.
 */
router.route('/')
    .get(contactInfo.list)
    .post(contactInfo.create);

/*
  The ':' specifies a URL parameter.
 */
router.route('/:contactInfoId')
    .get(contactInfo.read)
    .put(contactInfo.update)
    .delete(contactInfo.delete);

router.param('contactInfoId', contactInfo.contactByID);

module.exports = router;
