const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentSchema = new Schema({
    Renter: {type: Schema.Types.ObjectId, ref: 'User', index: true},
    Rentee: {type: Schema.Types.ObjectId, ref: 'User', index: true},
    Product: {type: Schema.Types.ObjectId, ref: 'Product', index: true},
    RentedDate: {type: Date, required: true, 'default': Date.now()},
    ReturnedDate: {type: Date, required: true, 'default': Date.now()},
});

const RentModal = mongoose.model('productHistory', rentSchema);
module.exports = RentModal;
