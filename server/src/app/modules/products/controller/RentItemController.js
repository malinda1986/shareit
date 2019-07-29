const Promise = require('bluebird');
const Product = require('../../models/Product');
const Request = require('../../models/ProductRequest');

const createRequest = ({body, user}) => {
    return new Promise(resolve => {
        const {id} = body;
        Product.findById(id)
        .then(product => {
            if (!product) {
                return resolve({code: 404, message: 'Product not found'});
            }
            if (product.state !== 'ACTIVE') {
                return resolve({code: 404, message: 'Product not available'});
            }
            return product;
        })
        .then(product => {
            const request = new Request({
                Owner: product.Owner,
                RequestBy: user.id,
                State: 'PENDING_APPROVAL',
            });
            request.save()
            .then(req => {
                resolve({code: 200, data: req});
            })
            .catch(e => {
                resolve({code: 400, e});
            });
        });
    });
};

const getAllRequestByProduct = ({body, user}) => {
    return new Promise(resolve => {
        const {id} = body;
        Request.find({Product: id})
        .then(requests => {
            if (!requests) {
                return resolve({code: 404, message: 'Product not found'});
            }
            return resolve({code: 404, data: requests, message: 'Product requests'});
        });
    });
};

module.exports = {
    createRequest,
    getAllRequestByProduct,
};
