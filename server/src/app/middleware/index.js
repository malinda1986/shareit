const compress = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../modules');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authorizer = require('./Auth');

const setupMiddleware = function(app) {
    // compress
    app.use(compress());
    //helmet
    app.use(helmet());

    // set up our express application
    app.use(morgan('dev')); // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)

    // Body parsing
    app.use(bodyParser.json({limit: '5mb'}));
    app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));


    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    // mount api routes
    /*eslint-disable */
    app.use(routes.baseURI, routes.api(middleware));
};
/*eslint-disable */
const middleware = {
    api: {
        cors,
    },
    auth: authorizer,
};

module.exports = setupMiddleware;
module.exports.middleware = middleware;
