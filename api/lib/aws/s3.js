const aws = require('aws-sdk');

const s3 = new aws.S3({
    apiVersion: '2006-03-01',
    region: process.env.AWS_REGION || process.env.SLS_REGION || 'us-east-1'
});

module.exports.getObject = (bucket, key) => new Promise((resolve, reject) => {
    s3.getObject({
        Bucket: bucket,
        Key: key,
    }, function (error, res) {
        if (!error) {
            resolve(res);
        }
        else {
            reject(error);
        }
    })
});

module.exports.putObject = (bucket, key, body, options) => new Promise((resolve, reject) => {
    options = options || {};
    s3.putObject({
        Bucket: bucket,
        Key: key,
        ContentType: options.ContentType || "application/json",
        Body: body
    }, function (error, res) {
        if (!error) {
            resolve(res);
        }
        else {
            reject(error);
        }
    })
});

module.exports.deleteObject = (bucket, key) => new Promise((resolve, reject) => {
    s3.deleteObject({
        Bucket: bucket,
        Key: key
    }, function (error, res) {
        if (!error) {
            resolve(res);
        }
        else {
            reject(error);
        }
    })
});

module.exports.listObjects = (bucket, prefix, options) => new Promise((resolve, reject) => {
    options = options || {};
    s3.listObjectsV2({
        Bucket: bucket,
        Prefix: prefix,
        ...options
    }, function (error, res) {
        if (!error) {
            resolve(res);
        }
        else {
            reject(error);
        }
    })
});