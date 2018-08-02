import moment from 'moment';

import checkFail from '../../utils/checkFail';
import config from '../../config';

const DETECT = 'detect';
const SEARCH = 'search';

const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const rekognition = new AWS.Rekognition();
const docClient = new AWS.DynamoDB.DocumentClient();
const demoLookupTable = `demo-lookup-${config.stage}`;
const uuidv1 = require('uuid/v1');

async function logLookup(sessionId, type, data) {
  const stamp = +new Date();
  const requestId = uuidv1();
  const processedYearMonthDay = moment().format('YYYYMMDD');

  const params = {
    TableName: demoLookupTable,
    Item: {
      request_id: requestId,
      processed_year_month_day: processedYearMonthDay,
      session_id: sessionId,
      type,
      stamp,
      data
    }
  };
  const putResult = await new Promise((resolve, reject) =>
    docClient.put(params, (err, result) => {
      if (err) {
        console.error(
          'Unable to add item. Error JSON:',
          JSON.stringify(err, null, 2)
        );
        reject(err);
      }
      resolve(result);
    })
  ).catch(err => err);

  const paramsTotals = {
    TableName: demoLookupTable,
    Key: {
      request_id: 'total',
      processed_year_month_day: processedYearMonthDay
    },
    UpdateExpression: 'set session_id = :sid, stamp = :t ADD #counter :incva',
    ExpressionAttributeNames: {
      '#counter': 'counter'
    },
    ExpressionAttributeValues: {
      ':sid': sessionId,
      ':t': stamp,
      ':incva': 1
    },
    ReturnValues: 'UPDATED_NEW'
  };

  const totalsResult = await new Promise((resolve, reject) =>
    docClient.update(paramsTotals, (err, result) => {
      if (err) {
        console.error(
          'Unable to add item. Error JSON:',
          JSON.stringify(err, null, 2)
        );
        reject(err);
      }
      resolve(result);
    })
  ).catch(err => err);

  return putResult;
}

export default async function registerFace(req, res) {
  if (req.jwt.payload.sess === undefined) {
    return res.status(403).send({ status: 0, error: 'Not a valid session.' });
  }
  const regImgKey = `${req.jwt.payload.sess}/reg.jpg`;
  const processedYearMonthDay = moment().format('YYYYMMDD');
  const sessionId = req.jwt.payload.sess;

  const params = {
    TableName: demoLookupTable,
    KeyConditionExpression: '#pymd = :pymd and #rid = :rid',
    ExpressionAttributeNames: {
      '#pymd': 'processed_year_month_day',
      '#rid': 'request_id'
    },
    ExpressionAttributeValues: {
      ':pymd': processedYearMonthDay,
      ':rid': 'total'
    }
  };

  const requestsToday = await new Promise((resolve, reject) =>
    docClient.query(params, (err, data) => {
      if (err) {
        console.error('Error:', JSON.stringify(err, null, 2));
        reject({ error: JSON.stringify(err, null, 2) });
        return;
      }

      if (data.Count === 0) {
        resolve(0);
        return;
      }
      if (config.rekRequestsLimit <= data.Items[0].counter) {
        reject({
          error: 'Sorry, too many requests today. Please try again tomorrow'
        });
        return;
      }
      resolve(data.Count);
    })
  ).catch(err => err);

  if (checkFail(res, requestsToday)) return res;

  const awsResponse = await new Promise((resolve, reject) => {
    s3.putObject(
      {
        Bucket: 'voloviv-reg-uploads-22',
        Key: regImgKey,
        Body: req.file.buffer,
        ACL: 'public-read'
      },
      err => {
        if (err) reject({ error: err });
        // reject({'error':'test error'});
        resolve('File uploaded to S3');
      }
    );
  }).catch(err => err);

  if (checkFail(res, awsResponse)) return res;

  const paramsDetectFace = {
    Image: {
      S3Object: {
        Bucket: 'voloviv-reg-uploads-22',
        Name: regImgKey
      }
    },
    Attributes: ['ALL']
  };

  const detectResult = await new Promise((resolve, reject) =>
    rekognition.detectFaces(paramsDetectFace, (err, data) => {
      if (err) reject({ error: "Not able to detect face", stack: err.stack });
      else resolve(data);
    })
  ).catch(err => err);

  if (checkFail(res, detectResult)) return res;

  if (checkFail(res, logLookup(sessionId, DETECT, detectResult))) return res;

  const paramsSearchFace = {
    CollectionId: 'voloviv-got-characters',
    Image: {
      S3Object: {
        Bucket: 'voloviv-reg-uploads-22',
        Name: regImgKey
      }
    },
    FaceMatchThreshold: 0.01,
    MaxFaces: 4
  };

  const searchResult = await new Promise((resolve, reject) =>
    rekognition.searchFacesByImage(paramsSearchFace, (err, data) => {
      if (err) reject({ error: "Not able to detect face", stack: err.stack });
      else resolve(data);
    })
  ).catch(
    err =>
      // console.log('error')
      err
  );

  if (checkFail(res, searchResult)) return res;

  const faceMatches = await Promise.all(
    searchResult.FaceMatches.map(async match => {
      const paramsSignedUrl = {
        Bucket: 'voloviv-got-characters-22',
        Key: match.Face.ExternalImageId
      };

      const url = await new Promise((resolve, reject) => {
        s3.getSignedUrl('getObject', paramsSignedUrl, (err, url) => {
          if (err) reject({ error: err });
          resolve(url);
        });
      }).catch(err => err);

      if (checkFail(res, url)) return res;

      return {
        ...match,
        ...{ Face: { ...{ ...match.Face, ...{ Url: url } } } }
      };
    })
  );

  const signedSearchResult = {
    ...searchResult,
    ...{ FaceMatches: faceMatches }
  };

  if (checkFail(res, logLookup(sessionId, SEARCH, signedSearchResult)))
    return res;

  const paramsSignedUrl = {
    Bucket: 'voloviv-reg-uploads-22',
    Key: regImgKey
  };

  const signedUrl = await new Promise((resolve, reject) => {
    s3.getSignedUrl('getObject', paramsSignedUrl, (err, url) => {
      if (err) reject({ error: err });
      resolve(url);
    });
  }).catch(err => err);

  if (checkFail(res, signedUrl)) return;

  const response = {
    detect_result: detectResult,
    search_result: signedSearchResult,
    upload_url: signedUrl
  };

  return res.send(response);
}
