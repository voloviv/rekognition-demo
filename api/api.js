import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import config from './config';
import * as actions from './actions/index';
import { mapUrl } from './utils/url.js';
import { checkFail } from './utils/checkFail.js';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import { regUploader, zipUploader } from './utils/uploaders.js';

const jwt = require('./utils/jwt-express');

const pretty = new PrettyError();
const app = express();
const server = new http.Server(app);
const io = new SocketIo(server);

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

io.path('/ws');

// body-parser middleware
app.use(bodyParser.json());

// cookie-parser middleware
app.use(cookieParser());

// JWT-based sessions middleware
app.use(
  jwt.init(process.env.JWT_SECRET_KEY || 'voloviv', {
    expiresIn: process.env.JWT_EXPIRES_IN,
    cookieOptions:
      process.env.NODE_ENV === 'production' &&
      process.env.DISABLE_SSL_REDIRECT !== 'true'
        ? {
            httpOnly: true
          }
        : {
            httpOnly: true
          }
  })
);

app.disable('x-powered-by');

// const reg_uploader = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 52428800 },
// });

app.get('/example/users', (req, res) => {
  const users = new Map();
  res.json(Array.from(users.keys()));
});

// Generate session token.
app.post('/demo-init', actions.demo.getSession);

// Register Face; Detect as many attributes as possible
app.post('/register-face', regUploader(), actions.demo.registerFace);

// contact form
app.post('/contact', actions.contact);

app.use((req, res) => {
  const splittedUrlPath = req.url
    .split('?')[0]
    .split('/')
    .slice(1);

  const { action, params } = mapUrl(actions, splittedUrlPath);

  if (action) {
    action(req, res, params).then(
      result => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      },
      reason => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      }
    );
  } else {
    res.status(404).end('NOT FOUND');
  }
});

app.use((req, res) => {
  const splittedUrlPath = req.url
    .split('?')[0]
    .split('/')
    .slice(1);

  const { action, params } = mapUrl(actions, splittedUrlPath);

  if (action) {
    action(req, res, params).then(
      result => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      },
      reason => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      }
    );
  } else {
    res.status(404).end('NOT FOUND');
  }
});

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, err => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info(
      '==> 💻  Send requests to http://%s:%s',
      config.apiHost,
      config.apiPort
    );
  });

  io.on('connection', socket => {
    socket.emit('news', { msg: `Atomizer online` });

    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });

    socket.on('msg', data => {
      data.id = messageIndex;
      messageBuffer[messageIndex % bufferSize] = data;
      messageIndex++;
      io.emit('msg', data);
    });
  });
  io.listen(runnable);
} else {
  console.error(
    '==>     ERROR: No PORT environment variable has been specified'
  );
}
