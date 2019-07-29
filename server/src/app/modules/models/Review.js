const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    Renter: {type: Schema.Types.ObjectId, ref: 'User', index: true},
    Rentee: {type: Schema.Types.ObjectId, ref: 'User', index: true},
    Product: {type: Schema.Types.ObjectId, ref: 'Product', index: true},
    Feedback: {
        Comment: {type: String, 'default': ''},
        Rating: {type: Number, 'default': 0}
    },
    Date: {type: Date, 'default': Date.now()},
    Replies: {
        Date: {type: Date},
        Text: {type: String},
    },
    Status: {type: String, required: true, 'enum': ['ACTIVE', 'PEDNING', 'DELETED', 'BLOCKED'], index: true},
});

const ReviewModel = mongoose.model('Review', ReviewSchema);
module.exports = ReviewModel;
