/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var emailSchema = new Schema({
        userId: {type: Number, required: true},
        emailAddress: {type: String, required: true},
    },
    {
        timestamps: true
    });

/* create a 'pre' function that adds the updated_at and created_at if not already there property */
emailSchema.pre('save', function (next) {
    // get the current date

    var currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at) {
        this.created_at = currentDate;
    }

    next();
});

/* Use your schema to instantiate a Mongoose model */
var EmailPreference = mongoose.model('EmailPreference', emailSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = EmailPreference;
