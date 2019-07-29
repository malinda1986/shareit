const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('../../../APIdoc/swagger.json');
const checkoutHandler = require('./checkout');
const productsHandler = require('./products');
const userHandler = require('./users');
const categoryHandler = require('./categories');
const authHandler = require('./auth');

const api = require('../api');
const config = require('../config');
const {app_path} = config.get('api');

const routeHandler = (middleware) => {
    const router = express.Router();
    const {api: {cors}, auth: authorizer} = middleware;
    router.use(cors());
    router.use('/apidoc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    router.use(`${app_path}cart`, authorizer.auth, checkoutHandler.routes(api.http));
    router.use(`${app_path}product`, productsHandler.routes(api.http));
    router.use(`${app_path}users`, userHandler.routes(api.http));
    router.use(`${app_path}category`, authorizer.auth, categoryHandler.routes(api.http));
    router.use(`${app_path}auth`, authorizer.auth, authHandler.routes(api.http));

    return router;
};

module.exports = {
    checkoutHandler,
    productsHandler,
    userHandler,
    categoryHandler,
    authHandler,
    routeHandler
};
