/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import withStyles from 'material-ui/styles/withStyles';

import { usersAction } from '../../actions';
// import type { Dispatch, Home as HomeType, ReduxState } from '../../types';
import { UserList } from '../../components';

import DemoSection from '../../components/DemoSection';
// import { Home } from "../Home/Home";
import type { Dispatch, ReduxState } from '../../types';

// import { createGenerateClassName, JssProvider } from 'react-jss';

// const generateClassName = createGenerateClassName();

type Props = { home: HomeType, fetchUsersIfNeeded: () => void };

// Export this for unit testing more easily
class Demo extends PureComponent<Props> {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Helmet title="Demo" />
        <DemoSection />
      </div>
    );
  }
}

export default compose(withRouter)(Demo);
