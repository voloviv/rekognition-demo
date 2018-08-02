import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { PureComponent } from 'react';
import Dropzone from 'react-dropzone';
import withStyles from 'material-ui/styles/withStyles';
import Face from '@material-ui/icons/Face';
import Clear from '@material-ui/icons/Clear';
import CheckMark from '@material-ui/icons/Done';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import demoStyle from 'assets/jss/material-kit-react/views/landingPageSections/demoStyle';
import Loading1 from 'assets/img/loading_1.gif';

import GridContainer from '../MaterialKit/Grid/GridContainer';
import GridItem from '../MaterialKit/Grid/GridItem';
import InfoArea from '../MaterialKit/InfoArea/InfoArea';
import Button from '../MaterialKit/CustomButtons/Button';
import CustomLinearProgress from '../MaterialKit/CustomLinearProgress/CustomLinearProgress';
import Card from '../MaterialKit/Card/Card';
import { demoAction } from '../../actions';

import './slider.css';

import type { Dispatch, ReduxState } from '../../types';
import classNames from 'classnames';
import { withStyles as ws } from '@material-ui/core/styles/index';
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const gifs = [Loading1];

type Props = {
  classes: Object,
  children: Object,
  initDemo: Object,
  registerFace: Object,
  demo: Object,
  resetDemo: Function
};

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
    color: '#fff'
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    color: '#fff'
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
    color: '#fff'
  },
  warning: {
    backgroundColor: amber[700],
    color: '#fff'
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

const MySnackbarContentWrapper = ws(styles1)(MySnackbarContent);

class DemoSection extends PureComponent<Props> {
  constructor() {
    super();
    this.initState();
    this.onDrop = this.onDrop.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    const { initDemo } = this.props;
    initDemo();
    this.randomGif();
  }

  async onDrop(acceptedFiles) {
    console.log('ondrop');
    const { registerFace } = this.props;

    if (acceptedFiles.length !== 1) {
      this.props.validationError(
        'Please choose one .jpg or .png file'
      );
      return;
    }

    await registerFace(acceptedFiles[0]);

    const self = this;
    if (this.regImg === null || this.regImg === undefined) return;
    this.regImg.onload = function() {
      const boundingBox = self.props.demo.faceAttributes.FaceDetail.BoundingBox;
      self.setState({
        svgBox: {
          width: self.regImg.offsetWidth,
          height: self.regImg.offsetHeight
        },
        svgRect: {
          x: boundingBox.Left * self.regImg.offsetWidth,
          y: boundingBox.Top * self.regImg.offsetHeight,
          width: boundingBox.Width * self.regImg.offsetWidth,
          height: boundingBox.Height * self.regImg.offsetHeight
        },
        slickSlideIndex: 1
      });
      self.slickSlideToIndex();
    };
  }

  randomGif() {
    this.setState({
      loading_gif: gifs[Math.floor(Math.random() * gifs.length)]
    });
  }

  slickSlideToIndex() {
    this.slider.slickGoTo(this.state.slickSlideIndex);
  }

  initState() {
    this.state = {
      svgBox: {
        width: 0,
        height: 0
      },
      svgRect: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      ignoreAttrs: [
        'BoundingBox',
        'Landmarks',
        'Confidence',
        'Quality',
        'Pose'
      ],
      showLoader: false,
      slickSlideIndex: 0
    };
  }

  async reset() {
    this.slider.slickGoTo(0);
    await new Promise(resolve => setTimeout(resolve, 1));
    this.initState();
    this.props.resetDemo();
  }

  renderMatches() {
    const { classes } = this.props;
    const { searchResult } = this.props.demo;

    return (
      <div className={classes.resultsOuter}>
        <GridContainer>
          {searchResult.FaceMatches.map((match, index) => (
            <GridItem xs={12} sm={6} md={6} key={index}>
              <Card className={classes.resultItem}>
                <div className={classes.resultTitle}>
                  <GridContainer key={index}>
                    <GridItem xs={4} sm={5} md={4} lg={4}>
                      <b>
                        {index + 1}.{' '}
                        {match.Face.ExternalImageId.replace(/_/g, ' ').replace(
                          '.jpg',
                          ''
                        )}
                      </b>
                    </GridItem>
                    <GridItem xs={4} sm={3} md={5} lg={6}>
                      <CustomLinearProgress
                        className={classes.confindenceBar}
                        variant="determinate"
                        color="success"
                        value={match.Similarity}
                        style={{ top: '10px' }}
                      />
                    </GridItem>
                    <GridItem xs={4} sm={4} md={3} lg={2}>
                      {match.Similarity.toFixed(2)}%
                    </GridItem>
                  </GridContainer>
                </div>
                <div className={classes.resultItemInner}>
                  <img
                    className={classes.matchImg}
                    src={match.Face.Url}
                    alt="Match"
                  />
                </div>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    );
  }

  renderAttributes() {
    const { faceAttributes } = this.props.demo;

    const { classes } = this.props;

    return (
      <div className={classes.regImageProps}>
        {Object.keys(faceAttributes.FaceDetail).map((attr, index) => {
          if (this.state.ignoreAttrs.indexOf(attr) !== -1) return;
          if (attr in this.state.ignoreAttrs) return;
          return (
            <GridContainer key={index}>
              <GridItem xs={4} sm={5} md={4}>
                <div className={classes.attrTitle}>
                  {attr
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase())}
                </div>
              </GridItem>
              <GridItem xs={8} sm={7} md={8}>
                <div className={classes.attrValue}>
                  {(() => {
                    switch (typeof faceAttributes.FaceDetail[attr].Value) {
                      case 'string':
                        return (
                          <GridContainer>
                            <GridItem xs={5} sm={7} md={5}>
                              <span>
                                {faceAttributes.FaceDetail[attr].Value}
                              </span>
                            </GridItem>
                            <GridItem xs={7} sm={5} md={7}>
                              <div>
                                <CustomLinearProgress
                                  className={classes.confindenceBar}
                                  variant="determinate"
                                  color="success"
                                  value={95}
                                />
                              </div>
                            </GridItem>
                          </GridContainer>
                        );
                      case 'boolean':
                        return (
                          <GridContainer>
                            <GridItem xs={5} sm={7} md={5}>
                              <span>
                                {faceAttributes.FaceDetail[attr].Value ? (
                                  <CheckMark className={classes.attrIcons} />
                                ) : (
                                  <Clear className={classes.attrIcons} />
                                )}
                              </span>
                            </GridItem>
                            <GridItem xs={7} sm={5} md={7}>
                              <CustomLinearProgress
                                className={classes.confindenceBar}
                                variant="determinate"
                                color="success"
                                value={
                                  faceAttributes.FaceDetail[attr].Confidence
                                }
                              />
                            </GridItem>
                          </GridContainer>
                        );
                      default:
                        return (
                          <div>
                            {(() => {
                              switch (attr) {
                                case 'AgeRange':
                                  return (
                                    <span>
                                      {faceAttributes.FaceDetail[attr].Low} -{' '}
                                      {faceAttributes.FaceDetail[attr].High}
                                    </span>
                                  );
                                case 'Emotions':
                                  return (
                                    <div>
                                      {faceAttributes.FaceDetail[attr].map(
                                        (emotion, index) => (
                                          <div
                                            key={index}
                                            className={classes.emotionsItem}
                                          >
                                            <GridContainer>
                                              <GridItem xs={5} sm={7} md={5}>
                                                <span>{emotion.Type}</span>
                                              </GridItem>
                                              <GridItem xs={7} sm={5} md={7}>
                                                <CustomLinearProgress
                                                  className={
                                                    classes.confindenceBar
                                                  }
                                                  variant="determinate"
                                                  color="success"
                                                  value={emotion.Confidence}
                                                />
                                              </GridItem>
                                            </GridContainer>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  );
                                default:
                                  return (
                                    <span>
                                      {JSON.stringify(
                                        faceAttributes.FaceDetail[attr]
                                      )}
                                    </span>
                                  );
                              }
                            })()}
                          </div>
                        );
                    }
                  })()}
                </div>
              </GridItem>
            </GridContainer>
          );
        })}
      </div>
    );
  }

  render() {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: false,
      arrows: false,
      dots: false,
      adaptiveHeight: true,
      draggable: false,
      touchMove: false
    };

    const {
      faceRegistered,
      faceUrl,
      registerFaceError,
      registerFacePending
    } = this.props.demo;

    const { classes } = this.props;

    return (
      <div className={classes.section}>
        <Slider ref={slider => (this.slider = slider)} {...settings}>
          <div>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.firstPaneOuter}>
                  <InfoArea
                    title=""
                    description="Upload a .jpg or .png image with at least one face to find out which Game Of Thrones characters you could be mistaken for."
                    icon={Face}
                    iconColor="info"
                    vertical
                  />
                  <Dropzone
                    accept="image/jpeg, image/png"
                    className={classes.dropzoneBox}
                    onDrop={this.onDrop}
                  >
                    <p className={classes.dropzoneText}>Upload Image</p>
                  </Dropzone>
                  {registerFacePending ? (
                    <div className={[classes.loadingOuter].join(' ')}>
                      <div className={classes.loadingContainer}>
                        <div className={classes.loadingText}>ANALYZING</div>
                        <img
                          className={classes.loadingImg}
                          src={this.state.loading_gif}
                          alt="loading..."
                        />
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </GridItem>
            </GridContainer>
          </div>
          <div className={classes.carouselPane}>
            {faceRegistered === true ? (
              <div>
                <div className={classes.topResultsOuter}>
                  <GridContainer>
                    <GridItem xs={12} sm={6} md={6}>
                      <div className={classes.regImageContainer}>
                        <img
                          ref={regImg => (this.regImg = regImg)}
                          className={classes.regImg}
                          src={faceUrl}
                          alt="Uploaded"
                        />
                        <div className={classes.svgMask}>
                          <div
                            className={classes.svgbboxContainer}
                            style={{
                              width: this.state.svgBox.width,
                              height: this.state.svgBox.width
                            }}
                          >
                            <svg
                              className={classes.svgbbox}
                              width={this.state.svgBox.width}
                              height={this.state.svgBox.height}
                            >
                              <rect
                                className={classes.svgRect}
                                rx="5"
                                ry="5"
                                x={this.state.svgRect.x}
                                y={this.state.svgRect.y}
                                width={this.state.svgRect.width}
                                height={this.state.svgRect.height}
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                      {this.renderAttributes()}
                    </GridItem>
                  </GridContainer>
                </div>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    {this.renderMatches()}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className={classes.actionButtons}>
                      <Button
                        onClick={() => this.reset()}
                        size="lg"
                        type="button"
                        color="info"
                      >
                        Start Again
                      </Button>
                    </div>
                  </GridItem>
                </GridContainer>
              </div>
            ) : (
              <div>No Face Registered</div>
            )}
          </div>
        </Slider>
        {registerFaceError !== false && registerFaceError !== undefined ? (
          <div>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              open
              onClose={() => this.reset()}
              // autoHideDuration={6000}
            >
              <MySnackbarContentWrapper
                onClose={() => this.reset()}
                variant="error"
                message={registerFaceError.message}
              />
            </Snackbar>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const connector = connect(
  ({ demo }: ReduxState) => ({ demo }),
  (dispatch: Dispatch) => ({
    initDemo: () => dispatch(demoAction.initDemo()),
    resetDemo: () => dispatch(demoAction.resetDemo()),
    registerFace: (file: Object) => dispatch(demoAction.registerFace(file)),
    validationError: (file: Object) =>
      dispatch(demoAction.validationError(file))
  })
);

export default compose(
  withRouter,
  connector,
  withStyles(demoStyle)
)(DemoSection);
