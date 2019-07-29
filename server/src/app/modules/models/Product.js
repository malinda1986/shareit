const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    Name: {type: String, required: true},
    Description: {type: String, required: true},
    Category: {type: String, required: true, index: true}, // @malinda - create category list
    Type: {type: String, required: true, index: true, 'enum': ['FOOD', 'NON_FOOD']}, //food  or non food
    IsFree: {type: Boolean, required: true},
    Images: [{Name: String, URL: String, Type: String}],
    Owner: {type: Schema.Types.ObjectId, ref: 'User', index: true},
    ProductId: {type: String, required: true},
    PriceCategory: {type: String, required: true, 'enum': ['DAILY', 'HOURLY', 'WEEKLY']}, // daily / weekly
    Price: {type: Number, required: true, 'default': 0},
    Deposit: {type: Number, required: true, 'default': 0},
    Currency: {type: String, required: true},
    AvailableFrom: {type: Number, 'default': +Date.now()},
    AvailableTo: {type: Number, 'default': +Date.now()},
    Status: {type: String, required: true, 'enum': ['ACTIVE', 'RENTED', 'PENDING', 'DELETED', 'HIDE'], index: true},
    PickUpAddress: {
        Street: {type: String, 'default': ''},
        Suburb: {type: String, 'default': ''},
        City: {type: String, 'default': ''},
        PostalCode: {type: String, 'default': ''},
        Country: {type: String, 'default': ''},
        Lat: {type: Number},
        Long: {type: Number},
    },

});

const ProductModal = mongoose.model('product', productSchema);
module.exports = ProductModal;
