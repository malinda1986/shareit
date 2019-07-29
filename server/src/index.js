// make sure env is set properly
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const Service = require('./app');
const Server = require('./app/server');
const App = Service();

Server.start(App).catch(error => {
    // TODO: logging
    console.log(error);
    /*eslint-disable */
    process.exit(0);
});
