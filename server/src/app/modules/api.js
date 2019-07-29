const {
    routeHandler,
} = require('./router');

const apiRoutes = function(middleware) {
    try {
        return routeHandler(middleware);
    } catch (e) {
        console.log(e);
    }
};

module.exports = apiRoutes;
