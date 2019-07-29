const Promise = require('bluebird');
const {trimProductObject} = require('../service');
const Category = require('../../models/Category');

module.exports.listCategory = ({options, body}) => {
    return new Promise((resolve) => {
        const {params} = options;
        Category.find({}, (error, result) => {
            if (error) {
                return resolve({code: 400, message: 'Error in updating the record'});
            }
            return resolve({code: 200, message: 'Category List!', data: result});
        });
    });
};
module.exports.getProduct = ({options}) => {
    const {params} = options;
    return new Promise((resolve) => {
        if (!params.id) {
            return resolve({code: 404, message: 'Record not found'});
        }
        Category.findById(params.id)
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
        Category.findByIdAndUpdate(params.id, {$set: body}, {'new': true}, (error, result) => {
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
        Category.findByIdAndUpdate(params.id, {$set: body}, {'new': true}, (error, result) => {
            if (error) {
                return resolve({code: 400, message: 'Error in updating the record'});
            }
            return resolve({code: 200, message: 'Successfully updated!', data: result});
        });
    });
};

