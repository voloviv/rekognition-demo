/* @flow */

import React from 'react';

import Loading1 from 'assets/img/loading_1.gif';

import styles from './styles.scss';

const gifs = [Loading1];

const loadingGif = gifs[Math.floor(Math.random() * gifs.length)];

export default () => (
  <div className={styles.Loading}>
    <img
      style={{ margin: 'auto', display: 'block' }}
      src={loadingGif}
      alt="loading..."
    />
    {console.log(loadingGif)}
  </div>
);
