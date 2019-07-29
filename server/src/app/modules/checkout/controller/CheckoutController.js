const Promise = require('bluebird');
const {AddToCart, GetCurrentCart} = require('../service');

module.exports.addToCart = ({body}) => {
    return new Promise((resolve) => {
        const result = AddToCart(body);
        resolve({code: 200, result});
    });
};

module.exports.getCart = ({body}) => {
    return new Promise((resolve) => {
        const result = GetCurrentCart(body);
        resolve({code: 200, result});
    });
};
