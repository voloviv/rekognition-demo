import React from 'react';
// material-ui components
import withStyles from 'material-ui/styles/withStyles';

// @material-ui/icons
import Chat from '@material-ui/icons/Chat';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Fingerprint from '@material-ui/icons/Fingerprint';
// core components
import GridContainer from '../MaterialKit/Grid/GridContainer';
import GridItem from '../MaterialKit/Grid/GridItem';
import InfoArea from '../MaterialKit/InfoArea/InfoArea';

import productStyle from '../../assets/jss/material-kit-react/views/landingPageSections/productStyle';

type Props = { classes: Object };

class ProductSection extends React.PureComponent<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        {/* <GridContainer justify="center"> */}
        {/* <GridItem xs={12} sm={12} md={8}> */}
        {/* <h2 className={classes.title}>Engineering Done Right</h2> */}
        {/* <h5 className={classes.description}> */}
        {/* We help our clients create online experiences that look flawless */}
        {/* on every device, load instantly, and seamlessly scale to handle */}
        {/* any load. */}
        {/* </h5> */}
        {/* </GridItem> */}
        {/* </GridContainer> */}
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Front End"
                description="We love building lightening fast immersive online experiences using the latest Javascript and CSS frameworks (including React, Redux, AngulaJS, Less, Sass, JSS and others)."
                icon={Chat}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Back End"
                description="With security always on our minds, we have experience working with a variety of architectures, languages and frameworks (including Python, Java, NodeJS, Scala, Django, Spring, Play, Webpack and others)."
                icon={VerifiedUser}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="DevOps"
                description="Whether you are running your application in Amazon or in a self hosted VMWare cloud, we can help you set up CI/CD pipelines and get the most our of tools like Ansible, Packer, Terraform, Puppet and Cloudformation."
                icon={Fingerprint}
                iconColor="danger"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(ProductSection);
