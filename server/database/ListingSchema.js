//Import mongoose and define any variables needed to create the schema
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var listingSchema = new Schema({
    code: {type: Number, required: true, unique: true},
    name: String,
    address: String,
    phone: String,
    email: String,
    start_hour: {
        type: Number,
        min: 0,
        max: 12
    },
    start_minute: {
        type: Number,
        min: 0,
        max: 60
    },
    start_part: {
        type: String,
        enum: ['AM', 'PM']
    },
    end_hour: {
        type: Number,
        min: 0,
        max: 12
    },
    end_minute: {
        type: Number,
        min: 0,
        max: 60
    },
    end_part: {
        type: String,
        enum: ['AM', 'PM']
    },
    service: String,
    accessibility: Boolean,    
    created_at: Date,
    updated_at: Date
    //Maybe add coordinates to be used with location on 360 homepage photo
    //Service needs to be added as a drop down menu
    //Need to figure out how to create types for each listing's service (restaurant, gas, medical, housing)
    //Accessibility also needs drop down
});

listingSchema.pre('save', function(next) {
    var currentDate = new Date();

    this.updated = currentDate;

    if (!this.created) {
        this.created = currentDate;
    }
    next();
});

var Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;