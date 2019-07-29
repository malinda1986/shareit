const _ = require('lodash');
const Cart = require('../models/Cart');

const GetCurrentCart = (id) => {
    return Cart.findById(id);
};

const AddToCart = (body, options) => {
    const query = {_id: options.params.id};
    return new Promise((resolve, reject) => {
        Cart.findOneAndUpdate(query, body && body.data ? body.data : body, {upsert: true}, function(error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = {
    GetCurrentCart,
    AddToCart
};
