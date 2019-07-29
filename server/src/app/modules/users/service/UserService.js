const shortId = require('shortid');
const _ = require('lodash');

const validateUserParams = (params) => {
    return Object.assign({}, params, {
        Status: 'ACTIVE',
        Verified: true,
        Type: 'user',
        id: shortId(),
    });
};

const trimUserObject = (user) => {
    if (_.isArray(user)) {
        const users = [];
        _.each(user, u => {
            const trimmed = _.pick(u, ['_id', 'id', 'FirstName', 'LastName', 'Email']);
            users.push(trimmed);
        });
        return users;
    }
    const trimmed = _.pick(user, ['_id', 'id', 'FirstName', 'LastName', 'Email']);
    return trimmed;
};

module.exports = {
    validateUserParams,
    trimUserObject,
};
