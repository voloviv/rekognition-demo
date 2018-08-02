/* @flow */

import React from 'react';
import classNames from 'classnames';
import withStyles from 'material-ui/styles/withStyles';

import DemoSection from './DemoSection';

import GridContainer from '../MaterialKit/Grid/GridContainer';
import GridItem from '../MaterialKit/Grid/GridItem';
import Parallax from '../MaterialKit/Parallax/Parallax';
// import Header from '../MaterialKit/Header/Header';
// import Footer from '../MaterialKit/Footer/Footer';
// import HeaderLinks from '../MaterialKit/Header/HeaderLinks';

import landingPageStyle from '../../assets/jss/material-kit-react/views/landingPage';

type Props = { classes: Object, children: Object };

class LandingPage extends React.PureComponent<Props> {
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
    this.resetTransform();
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

    // const dashboardRoutes = [];

    return (
      <div>
        {/* <Header */}
        {/* color="transparent" */}
        {/* routes={dashboardRoutes} */}
        {/* brand="voloviv.com" */}
        {/* rightLinks={<HeaderLinks />} */}
        {/* fixed */}
        {/* changeColorOnScroll={{ */}
        {/* height: 400, */}
        {/* color: 'white' */}
        {/* }} */}
        {/* {...rest} */}
        {/* /> */}
        <Parallax
          filter
          style={paralaxMinHeight}
          image={require('assets/img/fr_bg.jpg')}
        >
          <div
            style={{ opacity: this.state.opacity }}
            className={classes.demoParallaxTextOuter}
          >
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>
                  Who is your <b>Game Of Thrones</b> doppelganger?
                </h1>
                <h4 className={classes.ptext}>
                  The infamous Amazon facial recognition service - Rekognition -
                  has been all over the news, but how to use it to execute on
                  our own evil plan of revealing which Game Of Thrones
                  characters we look like?
                </h4>
                <br />
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <DemoSection />
            {/* <UsersPage />
            <ProductSection />
            <TeamSection />
            <WorkSection /> */}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
