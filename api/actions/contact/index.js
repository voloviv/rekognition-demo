import moment from 'moment';

import checkFail from '../../utils/checkFail';
import config from '../../config';

const uuidv1 = require('uuid/v1');

const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const docClient = new AWS.DynamoDB.DocumentClient();

function validateEmail(email) { // eslint-disable-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
  return re.test(String(email).toLowerCase());
}

function validate(req) {
  if (
    typeof req.body.email !== 'string' ||
    req.body.email === '' ||
    typeof req.body.name !== 'string' ||
    req.body.name === '' ||
    typeof req.body.message !== 'string' ||
    req.body.message === ''
  )
    return { error: 'Missing fields' };

  if (!validateEmail(req.body.email)) return { error: 'Invalid Email' };

  return true;
}

async function insertIntoDynamoDB(req) {
  const stamp = +new Date();
  const id = uuidv1();
  const contactTable = `voloviv-contact-${config.stage}`;

  const params = {
    TableName: contactTable,
    Item: {
      id: id,
      from_email: req.body.email,
      from_name: req.body.name,
      message: req.body.message,
      stamp
    }
  };

  return new Promise((resolve, reject) =>
    docClient.put(params, (err, result) => {
      if (err) {
        console.error(
          'Unable to add item. Error JSON:',
          JSON.stringify(err, null, 2)
        );
        reject({ error: 'Error inserting contact form message into DynamoDB' });
      }
      resolve(result);
    })
  ).catch(err => err);
}

export default async function contact(req, res) {
  if (checkFail(res, validate(req))) return res;

  if (checkFail(res, await insertIntoDynamoDB(req))) return res;

  const helper = require('sendgrid').mail;
  const fromEmail = new helper.Email(req.body.email);
  const toEmail = new helper.Email(config.contact.toEmail);
  const subject = `voloviv.com: Message from ${req.body.name}`;
  const content = new helper.Content('text/plain', req.body.message);
  const mail = new helper.Mail(fromEmail, subject, toEmail, content);

  const sg = require('sendgrid')(config.contact.sendgridApiKey);

  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  const emailResult = await new Promise((resolve, reject) =>
    sg.API(request, (error, sgResponse) => {
      if (error) {
        console.error('Error response received');
        console.error(sgResponse.statusCode);
        console.error(sgResponse.body);
        console.error(sgResponse.headers);
        const err = {
          error: 'Something went wrong.'
        };
        reject(err);
      }
      resolve(sgResponse);
    })
  ).catch(err => err);

  if (checkFail(res, emailResult)) return res;

  const response = {
    result: true
  };

  return res.send(response);
}
