const express = require('express');
const {listCategory} = require('../controller');
const router = express.Router();

function CategoryRoutes(handler) {
    router.route('/list')
        .get(handler(listCategory));
    return router;
}
module.exports = CategoryRoutes;

