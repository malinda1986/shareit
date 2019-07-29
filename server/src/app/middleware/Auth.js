const _ = require('lodash');
const JWT = require('jsonwebtoken');
const config = require('../config');
const User = require('../modules/models/User');

const allowedUrls = config.get('allowedUrls');
const secretKey = config.get('key');

module.exports.auth = (req, res, next) => {
    // check header or url parameters or post parameters for token
    const token = req.query.token || req.headers.Authorization || req.get('Authorization');
    if (_.includes(allowedUrls, req.originalUrl)) {
        return next();
    }

    if (token) {
        // verifies secret and checks exp
        JWT.verify(token, secretKey, function(err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.',
                    code: 401
                });
            }
            if (decoded.data.Type === 'user') {
                User.findOne({Email: decoded.data.Email}).
                    then((user) => {
                        if (user) {
                            delete user.password;
                            req.user = user;
                            next();
                        } else {
                            return res.json({
                                success: false,
                                message: 'Invalid token.',
                                code: 401});
                        }
                    }).
                    catch((err) => {
                        return res.json({success: false, message: err.message, code: 401});
                    });
            }
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'No token provided.'
        });
    }
};
