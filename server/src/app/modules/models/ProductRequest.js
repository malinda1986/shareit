const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentSchema = new Schema({
    Owner: {type: Schema.Types.ObjectId, ref: 'User', index: true},
    RequestBy: {type: Schema.Types.ObjectId, ref: 'User', index: true},
    State: {type: String, required: true, 'enum': ['PENDING_APPROVAL', 'APPROVED', 'REJECTED'], index: true},
    Product: {type: Schema.Types.ObjectId, ref: 'Product', index: true},
    RentedDate: {type: Date, required: true, 'default': Date.now()},
    ReturnedDate: {type: Date, required: true, 'default': Date.now()},
});

const RequestModal = mongoose.model('productRequest', rentSchema);
module.exports = RequestModal;
