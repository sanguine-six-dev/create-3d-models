'use string';

var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config.js');

mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

/*Instantiate a mongoose model for each added listing
and save to Mongo database
*/

fs.readFile('listingsExample.json', 'utf8', function(err, data) {
    if (err) throw err;
    var listingData = JSON.parse(data);
    var ctr = 0;
    //console.log("array size is = " + listingData.entries.length);
    listingData.entries.forEach(function(listing) {
      var listingModel = new Listing(listing);
      listingModel.save(function(err) {
        if (err) throw err;
        ctr++;
        if (ctr == listingData.entries.length) {
          //console.log("Quitting");
          process.exit();
        }
      });
    })
  });