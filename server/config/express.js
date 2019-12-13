const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    LocalStrategy = require('passport-local').Strategy,
    UserPortal = require('../models/userPortal.server.model.js'),
    userPortalRouter = require('../routes/userPortal.server.routes.js');


module.exports.init = () => {
    /*
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI || require('./config').db.uri, {
        useNewUrlParser: true, useUnifiedTopology: true
    }).catch(function (err) {
        console.log(err);
    });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    //cookie parser
    app.use(cookieParser());

    //Set up express-session
    app.use(require('express-session')({
        secret: require('./config').db.secret,
        resave: false,
        saveUninitialized: false
    }));

    //passport
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(UserPortal.authenticate()));
    passport.serializeUser(UserPortal.serializeUser());
    passport.deserializeUser(UserPortal.deserializeUser());

    // add a router
    app.use('/api/userPortal', userPortalRouter);

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    return app
};

