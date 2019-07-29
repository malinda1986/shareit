const express = require('express');
const {addToCart, getCart} = require('../controller');
const router = express.Router();

function CheckoutRoutes(handler) {
    router.route('/add')
        .post(handler(addToCart));
    router.route('/remove/:id')
        .post(handler(addToCart));
    router.route('/:id')
        .get(handler(getCart));
    return router;
}
module.exports = CheckoutRoutes;

