import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';
import { List, ListItem, withStyles } from 'material-ui';
import { Link } from 'react-router-dom';
import SocialLogo from 'social-logos';

// @material-ui/icons
import Favorite from '@material-ui/icons/Favorite';

import footerStyle from '../../../assets/jss/material-kit-react/components/footerStyle';

function Footer({ ...props }) {
  const { classes, whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link to="/" className={classes.block}>
                Demo
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                style={{ fill: 'currentColor', padding: '8px' }}
                target="_blank"
                className={classes.block}
                href="https://github.com/voloviv/rekognition-demo"
              >
                Source
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link to="about" className={classes.block}>
                About
              </Link>
            </ListItem>
          </List>
        </div>
        <div
          className={classes.right}
          style={{ top: '1px', position: 'relative' }}
        >
          &copy; {1900 + new Date().getYear()}, voloviv.com
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
