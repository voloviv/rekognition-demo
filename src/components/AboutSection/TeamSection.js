import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// material-ui components
import withStyles from 'material-ui/styles/withStyles';

// @material-ui/icons

// core components
import GridContainer from '../MaterialKit/Grid/GridContainer';
import GridItem from '../MaterialKit/Grid/GridItem';
import Card from '../MaterialKit/Card/Card';
import CardBody from '../MaterialKit/Card/CardBody';
// import CardFooter from '../MaterialKit/Card/CardFooter';
// import IconButton from '../MaterialKit/CustomButtons/IconButton';

import teamStyle from '../../assets/jss/material-kit-react/views/landingPageSections/teamStyle';

// import team1 from '../../assets/img/faces/avatar.jpg';
import team2 from '../../assets/img/vitaly.jpg';
// import team3 from '../../assets/img/faces/kendall.jpg';

type Props = { classes: Object };

class TeamSection extends React.PureComponent<Props> {
  render() {
    const { classes } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    return (
      <div className={classes.section}>
        {/* <h2 className={classes.title}>Here is our team</h2> */}
        <div>
          <GridContainer justify="center">
            {/* <GridItem xs={12} sm={12} md={4}> */}
            {/* <Card plain> */}
            {/* <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}> */}
            {/* <img src={team1} alt="..." className={imageClasses} /> */}
            {/* </GridItem> */}
            {/* <h4 className={classes.cardTitle}> */}
            {/* Gigi Hadid */}
            {/* <br /> */}
            {/* <small className={classes.smallTitle}>Model</small> */}
            {/* </h4> */}
            {/* <CardBody> */}
            {/* <p className={classes.description}> */}
            {/* You can write here details about one of your team members. */}
            {/* You can give more details about what they do. Feel free to */}
            {/* add some <a href="#pablo">links</a> for people to be able to */}
            {/* follow them outside the site. */}
            {/* </p> */}
            {/* </CardBody> */}
            {/* </Card> */}
            {/* </GridItem> */}
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team2} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Vitaly
                  <br />
                  <small className={classes.smallTitle}>Founder</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    You can write here details about one of your team members.
                    You can give more details about what they do. Feel free to
                    add some <a href="#pablo">links</a> for people to be able to
                    follow them outside the site.
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            {/* <GridItem xs={12} sm={12} md={4}> */}
            {/* <Card plain> */}
            {/* <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}> */}
            {/* <img src={team3} alt="..." className={imageClasses} /> */}
            {/* </GridItem> */}
            {/* <h4 className={classes.cardTitle}> */}
            {/* Kendall Jenner */}
            {/* <br /> */}
            {/* <small className={classes.smallTitle}>Model</small> */}
            {/* </h4> */}
            {/* <CardBody> */}
            {/* <p className={classes.description}> */}
            {/* You can write here details about one of your team members. */}
            {/* You can give more details about what they do. Feel free to */}
            {/* add some <a href="#pablo">links</a> for people to be able to */}
            {/* follow them outside the site. */}
            {/* </p> */}
            {/* </CardBody> */}
            {/* </Card> */}
            {/* </GridItem> */}
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(teamStyle)(TeamSection);
