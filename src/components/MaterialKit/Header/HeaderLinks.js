/* eslint-disable */
import React from "react";
// react components for routing our app without refresh
import { Link, withRouter } from "react-router-dom";

import { compose } from "redux";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import Tooltip from "material-ui/Tooltip";
import SocialLogo from 'social-logos';

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import Button from "../CustomButtons/Button";
import IconButton from "../CustomButtons/IconButton";

import headerLinksStyle from "../../../assets/jss/material-kit-react/components/headerLinksStyle";

import headerStyle from "../../../assets/jss/material-kit-react/components/headerStyle";

function HeaderLinks({ ...props }) {
  const { classes } = props;
  const { pathname } = props.location;
  return (
    <List className={classes.list}>
      {/*
      <ListItem className={classes.listItem}>
        <CustomDropdown
          buttonText="Components"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            // <Link to="/" className={classes.dropdownLink}>
            //   All components
            // </Link>,
            // eslint-disable-next-line
            <a
              href="http://creativetimofficial.github.io/material-kit-react/#/documentation"
              target="_blank"
              className={classes.dropdownLink}
            >
              Documentation
            </a>
          ]}
        />
      </ListItem>
      */}
      <ListItem className={classes.listItem }>
        <Link
          to="/"
          color="transparent"
          className={`${classes.navLink} ${pathname === '/' ? classes.navLinkActive : ''}`}
        >
          Demo
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link
          to="about"
          color="transparent"
          className={`${classes.navLink} ${pathname === '/about' ? classes.navLinkActive : ''}`}
        >
          About
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <a
          style={{fill: "currentColor", padding: "10px"}}
          target="_blank"
          className={classes.navLink} href="https://github.com/voloviv/rekognition-demo">
          <SocialLogo style={{fill: "currentColor"}} icon="github" size={ 30 } />
        </a>
      </ListItem>
    </List>
  );
}

export default compose(
  withRouter,
  withStyles(headerLinksStyle)
)(HeaderLinks);
