/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import AboutSection from '../../components/AboutSection';

type Props = {};

// Export this for unit testing more easily
class About extends PureComponent<Props> {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Helmet title="About" />
         <AboutSection />
      </div>
    );
  }
}

export default compose(withRouter)(About);
