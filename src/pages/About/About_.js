/* @flow */

import React from 'react';
import classNames from 'classnames';
import withStyles from 'material-ui/styles/withStyles';

import GridContainer from '../../components/MaterialKit/Grid/GridContainer';
import GridItem from '../../components/MaterialKit/Grid/GridItem';
import Parallax from '../../components/MaterialKit/Parallax/Parallax';
import Header from '../../components/MaterialKit/Header/Header';
import Footer from '../../components/MaterialKit/Footer/Footer';
import HeaderLinks from '../../components/MaterialKit/Header/HeaderLinks';

import landingPageStyle from '../../assets/jss/material-kit-react/views/landingPage';

import AboutSection from '../../components/AboutSection';

type Props = { classes: Object, children: Object };

class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      opacity: 1,
      opacityFactor: 0.008
    };
    this.getOpacity = this.getOpacity.bind(this);
    this.resetTransform = this.resetTransform.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.resetTransform);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.resetTransform);
  }

  getOpacity() {
    const windowScrollTop = window.pageYOffset / 3;
    return 1 - windowScrollTop * this.state.opacityFactor > 0
      ? 1 - windowScrollTop * this.state.opacityFactor
      : 0;
  }

  resetTransform() {
    this.setState({
      opacity: this.getOpacity()
    });
  }

  render() {
    const { classes, ...rest } = this.props;
    const paralaxMinHeight = {
      minHeight: '600px'
    };

    const dashboardRoutes = [];

    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="voloviv.com"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: 'white'
          }}
          {...rest}
        />
        <Parallax
          filter
          style={paralaxMinHeight}
          image={require('assets/img/about_bg.jpg')}
        >
          <div
            style={{ opacity: this.state.opacity }}
            className={classes.container}
          >
            <GridContainer justify="center" style={{ textAlign: 'center' }}>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>voloviv.com</h1>
                <h4 className={classes.ptext}>
                  Developing beautiful and highly scaleable full-stack
                  applications.
                </h4>
                <br />
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <SummarySection />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
