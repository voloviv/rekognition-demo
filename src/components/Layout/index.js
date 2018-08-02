import React, { PureComponent } from 'react';
import ReactGA from 'react-ga';
import Header from '../../components/MaterialKit/Header/Header';
import Footer from '../../components/MaterialKit/Footer/Footer';
import HeaderLinks from '../../components/MaterialKit/Header/HeaderLinks';

import './style.css';

import { GA_KEY } from '../../config';

type Props = { children: Object };

// const sheetsRegistry = new SheetsRegistry();

export default class LandingPage extends PureComponent<Props> {
  state = {
    loaded: true
  };

  componentDidMount() {
    // this.update();
    ReactGA.initialize(GA_KEY, { debug: false });
    const self = this;
    setTimeout(() => {
      self.setState({ loaded: true });
    }, 0);
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div
        className={this.state.loaded ? 'outerContainer' : ''}
      >
        <Header
          color="transparent"
          routes={[]}
          brand="voloviv.com"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: 'white'
          }}
        />
        {children}
        <Footer />
      </div>
    );
  }
}
