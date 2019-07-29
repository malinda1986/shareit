const Promise = require('bluebird');
const {validateProductParams, trimProductObject} = require('../service');
const Product = require('../../models/Product');

let perPage = 10;

module.exports.createProduct = ({body}) => {
    return new Promise((resolve) => {
        const product = new Product(validateProductParams(body));
        product.save()
        .then(resp => {
            resolve({code: 200, data: trimProductObject(resp)});
        })
        .catch(e => {
            resolve({code: 400, e});
        });
    });
};

module.exports.listProduct = ({options}) => {
    const {query} = options;
    const type = parseInt(query.status) === 1 ? 'NON_FOOD' : 'FOOD';
    const page = query.page || 1;
    perPage = query.perPage || perPage;
    return new Promise((resolve) => {
        Product.find({Type: type})
        .skip((page - 1) * perPage)
        .limit(perPage)
        .then(products => {
            if (products) {
                Product.find({Type: type}).count()
                .then(count => {
                    return resolve({
                        code: 200,
                        data: {
                            records: trimProductObject(products),
                            pagination: {
                                total: count,
                                perPage,
                                current: page,
                                pages: Math.ceil(count / perPage)
                            }
                        }
                    });
                })
                .catch(e => {
                    return resolve({code: 404, message: 'Record not found'});
                });
            }
        })
        .catch(e => {
            return resolve({code: 400, e});
        });
    });
};

module.exports.getProduct = ({options}) => {
    const {params} = options;
    return new Promise((resolve) => {
        if (!params.id) {
            return resolve({code: 404, message: 'Record not found'});
        }
        Product.findById(params.id)
        .then(user => {
            if (user) {
                resolve({code: 200, data: trimProductObject(user)});
            } else {
                return resolve({code: 404, message: 'Record not found'});
            }
        })
        .catch(e => {
            resolve({code: 400, e});
        });
    });
};

module.exports.updateProduct = ({options, body}) => {
    return new Promise((resolve) => {
        const {params} = options;
        Product.findByIdAndUpdate(params.id, {$set: body}, {'new': true}, (error, result) => {
            if (error) {
                return resolve({code: 400, message: 'Error in updating the record'});
            }
            return resolve({code: 200, message: 'Successfully updated!', data: result});
        });
    });
};

module.exports.changeStatus = ({options, body}) => {
    return new Promise((resolve) => {
        const {params} = options;
        Product.findByIdAndUpdate(params.id, {$set: body}, {'new': true}, (error, result) => {
            if (error) {
                return resolve({code: 400, message: 'Error in updating the record'});
            }
            return resolve({code: 200, message: 'Successfully updated!', data: result});
        });
    });
};

module.exports.listCategory = ({options, body}) => {
    return new Promise((resolve) => {
        const {params} = options;
        Product.findByIdAndUpdate(params.id, {$set: body}, {'new': true}, (error, result) => {
            if (error) {
                return resolve({code: 400, message: 'Error in updating the record'});
            }
            return resolve({code: 200, message: 'Successfully updated!', data: result});
        });
    });
};
