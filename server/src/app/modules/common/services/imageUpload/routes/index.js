const express = require('express');
const router = express.Router();
const images = require('../controler');
function setupRoutes(handler, auth) {
    router.post('/single', handler(images.uploadSingle));
    router.post('/multiple', handler(images.uploadMultiple));
    return router;
}
module.exports = setupRoutes;

