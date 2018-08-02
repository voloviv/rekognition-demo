# Rekognition demo - who is your Game of Thrones Doppelganger?

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/wellyshen/react-cool-starter/master/LICENSE)

A universal (server-side rendering) full-stack application that uses facial recognition (Amazon Rekognition API) to reveal which Game Of Thrones characters most resemble a face from an uploaded image. 

The app is built using Google's [Material Design](https://material.io/design/) on top of [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/), [React](https://facebook.github.io/react/), [Redux](https://github.com/reactjs/redux) and [React Router v4](https://reacttraining.com/react-router/).

## Live Demo

- [http://voloviv.com](http://voloviv.com)

## Requirements

- [node](https://nodejs.org/en/) >= 6.0
- [npm](https://www.npmjs.com/) >= 3.0
- [serverless](https://serverless.com/) >= 1.25.0
- [yarn](https://serverless.com/) >= 1.7.0

## Getting Started

**1. You can start by cloning the repository on your local machine by running:**

```bash
git clone https://github.com/wellyshen/react-cool-starter.git
cd react-cool-starter
```

**2. Provision AWS resources:**

```bash
cd aws;
WS_PROFILE=[PROFILE NAME] sls deploy -v \
--region us-east-1 \
--stage prod;
cd ..;
```

**3. Install all of the dependencies:**

```bash
yarn
```

**4. Build:**

```bash
yarn build
```

**5. Run dev mode:**

```bash
yarn dev
```

Now the app should be running on [http://localhost:2000/](http://localhost:2000/)

**6. Run prod mode:**

```bash
yarn start
```

**7. Build docker and upload to repo for deployment:**

```bash
docker build -t [NAME] .
docker tag [NAME]:latest [DOCKER ENDPOINT]:latest
docker push [DOCKER ENDPOINT]:latest
```

Now the app should be running on [http://localhost:8080/](http://localhost:8080/)

## Features

- [MaterialUI](https://material-ui.com/) - React components that implement Google's Material Design.
- [MaterialKit](https://github.com/creativetimofficial/material-kit-react) - some components and basic layouts using MaterialUI.
- [Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) server-side rendering with async data fetching.
- [React](https://facebook.github.io/react/) view management.
- [React Router v4](https://reacttraining.com/react-router/) the router.
- [Redux](https://github.com/reactjs/redux)'s futuristic [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html) implementation.
- [Express](https://expressjs.com/) server.
- [Webpack 4](https://webpack.js.org/) for bundling and [**"Tree-Shaking"**](https://webpack.js.org/guides/tree-shaking/) support.
- [Babel](https://babeljs.io/) for ES6 and ES7 transpiling.
- [React Hot Loader 4](https://github.com/gaearon/react-hot-loader) to tweak React components in real time.
- [nodemon](https://nodemon.io/) to monitor for any changes in your node.js application and automatically restart the server.
- [axios](https://github.com/mzabriskie/axios) for universal data fetching/rehydration on the client.
- [redux-thunk](https://github.com/gaearon/redux-thunk) as the middleware to deal with asynchronous action.
- [react-router-redux](https://github.com/reactjs/react-router-redux) to keep your router in sync with Redux state.
- [react-helmet](https://github.com/nfl/react-helmet) to manage title, meta, styles and scripts tags on both server and client.
- [loadable-components](https://github.com/smooth-code/loadable-components) makes React code splitting easy. Reduce your bundle size without stress.
- [Webpack Dev Middleware](https://github.com/webpack/webpack-dev-middleware) serves the files emitted from webpack over the Express server.
- [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware) allows you to add hot reloading into the Express server.
- [css-modules-require-hook](https://github.com/css-modules/css-modules-require-hook) compiles CSS Modules in runtime for SSR.
- [asset-require-hook](https://github.com/aribouius/asset-require-hook) allows your assets files required during runtime for SSR.
- [assets-webpack-plugin](https://github.com/kossnocorp/assets-webpack-plugin#why-is-this-useful) generates assets with hash so you can use them for SSR.
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) creates a visualize size of webpack output files with an interactive zoomable treemap.
- [morgan](https://github.com/expressjs/morgan) the HTTP request logger for server side debugging.
- [Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension) for next generation developer experience.
- [Flow](https://flowtype.org/) as the static type checker for javascript.
- [ESLint](http://eslint.org/) to maintain a consistent javascript code style (Airbnb + Prettier).
- [StyleLint](http://stylelint.io/) to maintain a consistent css/scss code style.
- CSS and SASS support with [PostCSS](https://github.com/postcss/postcss-loader) for advanced transformations (e.g. autoprefixer, cssnext etc.). [CSS modules](https://github.com/css-Modules/css-Modules) enabled.
- Image (with [imagemin-webpack-plugin](https://github.com/Klathmon/imagemin-webpack-plugin) for compressing images with imagemin) and Font support.
- Split vendor's libraries from client bundle.
- No other view engines, just javascript based HTML rendering component.
- Shared app config between development and production.
- 404 error page and redirect handling.
- Integrate [Jest](https://facebook.github.io/jest/) with [enzyme](https://github.com/airbnb/enzyme) as the solution for writing unit tests with code coverage support.
- [Yarn](https://yarnpkg.com/lang/en/) as the package manager.

## Server-Side Security and Performance

- [helmet](https://github.com/helmetjs/helmet) - Helps secure Express server with various HTTP headers.
- [hpp](https://github.com/analog-nico/hpp) - Express middleware to protect against HTTP Parameter Pollution attacks.
- [compression](https://github.com/expressjs/compression) - Gzip compression support for speeding up Express server responses.

## Boilerplate

- [React Cool Starter](https://github.com/wellyshen/react-cool-starter)
