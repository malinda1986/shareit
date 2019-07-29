const express = require('express');
const {login} = require('../controller');
const router = express.Router();

function ProductRoutes(handler) {
    router.route('/login')
        .post(handler(login));
    router.route('/logout')
        .get(handler(login));
    return router;
}
module.exports = ProductRoutes;

