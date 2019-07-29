const express = require('express');
const {product, request} = require('../controller');
const router = express.Router();

function ProductRoutes(handler) {
    router.route('/list')
        .get(handler(product.listProduct));
    router.route('/category/list')
        .get(handler(product.listCategory));
    router.route('/view/:id')
        .get(handler(product.getProduct));
    router.route('/create')
        .post(handler(product.createProduct));
    router.route('/update/:id')
        .patch(handler(product.updateProduct));
    router.route('/request')
        .post(handler(request.createRequest));
    router.route('/request/all/:id')
        .get(handler(request.getAllRequestByProduct));
    router.route('/:id/status')
        .patch(handler(product.changeStatus));
    return router;
}
module.exports = ProductRoutes;

