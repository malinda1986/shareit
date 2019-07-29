const Promise = require('bluebird');
const User = require('../../models/User');
const {validateUserParams, trimUserObject} = require('../service');
let perPage = 10;

module.exports.createUser = ({body}) => {
    return new Promise((resolve) => {
        const user = new User(validateUserParams(body));
        user.save()
        .then(resp => {
            resolve({code: 200, data: trimUserObject(resp)});
        })
        .catch(e => {
            resolve({code: 400, e});
        });
    });
};

module.exports.updateUser = ({options, body}) => {
    return new Promise((resolve) => {
        const updateParams = body;
        User.findByIdAndUpdate(body._id, {$set: body}, {'new': true}, (error, result) => {
            if (error) {
                return resolve({code: 400, message: 'Error in updating the record'});
            }
            return resolve({code: 200, message: 'Successfully updated!', data: result});
        });
    });
};

module.exports.listUsers = ({options}) => {
    const {query} = options;
    const page = query.page || 1;
    perPage = query.perPage || perPage;
    return new Promise((resolve) => {
        User.find({})
        .skip((page - 1) * perPage)
        .limit(perPage)
        .then(user => {
            if (user) {
                User.find().count()
                .then(count => {
                    return resolve({
                        code: 200,
                        data: {
                            records: user,
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

module.exports.findUser = ({options}) => {
    const {params} = options;
    return new Promise((resolve) => {
        if (!params.id) {
            return resolve({code: 404, message: 'Record not found'});
        }
        User.findById(params.id)
        .then(user => {
            if (user) {
                resolve({code: 200, data: trimUserObject(user)});
            } else {
                return resolve({code: 404, message: 'Record not found'});
            }
        })
        .catch(e => {
            resolve({code: 400, e});
        });
    });
};
