const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    id: {type: String, required: true, index: true, 'default': Date.now()},
    SessionId: {
        type: String, required: true
    },
    Items: [],
    Created: {type: Date, 'default': Date.now()},
    Modified: {type: Date, 'default': Date.now()},
});

const CartModal = mongoose.model('user', cartSchema);
module.exports = CartModal;
