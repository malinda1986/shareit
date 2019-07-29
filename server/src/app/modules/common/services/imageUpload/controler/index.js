const AWS = require('aws-sdk');
const awsConfig = require('aws-config');
const awsConfigFile = require('../../../../../config/awsConfig');
const s3 = new AWS.S3(awsConfig(awsConfigFile));
const bucketName = 'soul1';
let image, imageName, type;
const Promise = require('bluebird');
const Image = require('../../../../models/Images');
const detectFace = require('../../faceDetectionServices');

const createMainBucket = () => {
    const bucketParams = {
        Bucket: bucketName
    };
    return new Promise((resolve, reject) => {
        s3.headBucket(bucketParams, function(err, data) {
            if (err) {
                console.log('ErrorHeadBucket', err);
                s3.createBucket(bucketParams, function(err, data) {
                    if (err) {
                        console.log('Error', err);
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            } else {
                resolve(data);
            }
        });
    });
};

const createItemObject = (img, imgName, imgType) => {
    const buf = new Buffer(img.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const params = {
        Bucket: bucketName,
        Key: `${imgName}`,
        ACL: 'public-read',
        ContentType: imgType,
        ContentEncoding: 'base64',
        Body: buf
    };
    const url = awsConfigFile.imagePrefix + awsConfigFile.bucketName + '/' + imageName;
    return new Promise((resolve, reject) => {
        s3.putObject(params, function(err, data) {
            if (err) {
                reject(err);
            } else {
                detectFace.detectFaces(url, (err1, result) => {
                    if (err1) {
                        reject(err1);
                    } else {
                        resolve({name: imgName, metaData: result, url: url});
                    }
                });
            }
        });
    });
};
const uploadSingle = (req, res) => {
    return new Promise((resolve, reject) => {
        return resolve((req, res) => {
            image = req.body.imagebase64;
            type = req.body.type;
            imageName = 'random1/' + Math.floor(Date.now()) + req.body.name;
            createMainBucket().
                then((connected) => {
                    return createItemObject(image, imageName, type);
                }).
                then((bucketResponse) => {
                    console.log(bucketResponse);
                    const response = {
                        name: req.body.name,
                        description: req.body.description,
                        user: 'Still doing the login',
                        metaData: bucketResponse.metaData,
                        url: awsConfigFile.imagePrefix + awsConfigFile.bucketName + '/' + imageName
                    };
                    return Image.imageUpload(response, (err3, imageResult) => {
                        if (err3) {
                            throw (err3);
                        }
                        return res.send({success: true, message: 'Successfully uploaded image', data: imageResult});
                    });
                }).
                catch((err) => {
                    return res.status(400).send({success: false, message: 'Invalid image data ', data: err.message || err});
                });
        });
    });
};

const uploadMultiple = (req, res) => {
    return new Promise((resolve, reject) => {
        return resolve((req, res) => {
            createMainBucket().
                then((connected) => {
                    Promise.map(req.body.images, (item) => {
                        const image = item.imagebase64;
                        const type = item.type;
                        const imageName = 'random1/' + Math.floor(Date.now()) + item.name;
                        return createItemObject(image, imageName, type);
                    }).then((itemList) => {
                        const returnObj = [];
                        for (const i in req.body.images) {
                            returnObj.push({
                                name: req.body.images[i].name,
                                description: req.body.images[i].description,
                                user: 'Still doing the login',
                                url: awsConfigFile.imagePrefix + awsConfigFile.bucketName + '/' + itemList[i].url,
                                metaData: itemList[i].metaData
                            });
                        }
                        return Image.multipleImageUpload(returnObj, (err3, imageResults) => {
                            if (err3) {
                                throw (err3);
                            }
                            return res.send({success: true, message: 'Successfully uploaded image', data: imageResults});
                        });
                        //return res.send({success: true, message: 'Successfully uploaded images', data: returnObj});
                    }).
                        catch((err1) => {
                            return res.status(400).send({success: false, message: 'Invalid image data ', data: err1});
                        });
                }).
                catch((err) => {
                    return res.status(400).send({success: false, message: 'Invalid image data ', data: err});
                });
        });
    });
};
module.exports = {
    uploadSingle,
    uploadMultiple
};
