const express = require('express');
const {createUser, updateUser, listUsers, findUser} = require('../controller');
const router = express.Router();

function ProductRoutes(handler) {
    router.route('/list')
        .get(handler(listUsers));
    router.route('/view/:id')
        .get(handler(findUser));
    router.route('/create')
        .post(handler(createUser));
    router.route('/update/:id')
        .patch(handler(updateUser));
    return router;
}
module.exports = ProductRoutes;

