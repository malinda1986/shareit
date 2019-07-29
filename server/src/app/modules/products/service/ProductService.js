const shortId = require('shortid');
const _ = require('lodash');

const validateProductParams = (params) => {
    return Object.assign({}, params, {
        Status: 'ACTIVE',
        Verified: true,
        ProductId: shortId(),
    });
};

const trimProductObject = (product) => {
    if (_.isArray(product)) {
        const list = [];
        _.each(product, u => {
            const trimmed = u;
            list.push(trimmed);
        });
        return list;
    }
    const trimmed = product;
    return trimmed;
};

module.exports = {
    validateProductParams,
    trimProductObject
};
