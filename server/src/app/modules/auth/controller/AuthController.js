const Promise = require('bluebird');
const JWT = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('../../../config');

module.exports.login = ({body}) => {
    const {UserName, Password} = body;
    return new Promise((resolve) => {
        if (!UserName || !Password) {
            return resolve({code: 402, message: 'Invalid params'});
        }
        User.findOne({Email: UserName})
        .then(user => {
            if (user) {
                user.comparePassword(Password, (err, isMatch) => {
                    if (isMatch) {
                        const token = JWT.sign({userId: user.id, TYPE: user.Type}, config.get('key'));
                        return resolve({
                            code: 200,
                            data: {
                                userId: user._id,
                                type: user.Type,
                                email: user.Email,
                                name: user.FirstName,
                                token
                            },
                            message: 'Auth successful'
                        });
                    }
                    return resolve({code: 400, message: 'Invalid Password/Username'});
                });
            } else {
                return resolve({code: 404, message: 'Record not found'});
            }
        })
        .catch(e => {
            resolve({code: 400, e});
        });
    });
};

module.exports.logout = ({user}) => {
    const {Email, id} = user;
    return new Promise((resolve) => {
        if (!Email) {
            return resolve({code: 402, message: 'Invalid params'});
        }
        User.findByIdAndUpdate(id, {$set: {IsLogged: false}}, {'new': true}, (error, result) => {
            if (error) {
                return resolve({code: 400, message: 'Error in updating the record'});
            }
            return resolve({code: 200, message: 'Successfully logged out!', data: result});
        })
        .catch(e => {
            resolve({code: 400, e});
        });
    });
};
