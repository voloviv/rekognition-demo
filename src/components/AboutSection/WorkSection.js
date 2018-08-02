import React from 'react';
import withStyles from 'material-ui/styles/withStyles';
import { withStyles as ws } from '@material-ui/core/styles';
import { reduxForm, Field, reset, FormName } from 'redux-form';
import { compose } from 'redux';
import { validateEmail } from '../../utils/helpers';

// import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import classNames from 'classnames';

import GridContainer from '../MaterialKit/Grid/GridContainer';
import GridItem from '../MaterialKit/Grid/GridItem';
import CustomInput from '../MaterialKit/CustomInput/CustomInput';
import Button from '../MaterialKit/CustomButtons/Button';
import workStyle from '../../assets/jss/material-kit-react/views/landingPageSections/workStyle';
// import SnackBar from '../MaterialKit/Snackbar/SnackbarContent';

import { contactAction, demoAction } from '../../actions';
import { connect } from 'react-redux';
import type { Dispatch, ReduxState } from '../../types';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

type Props = {
  classes: Object,
  handleSubmit: Object,
  sendContactForm: Object,
  resetContactFormError: Object,
  contact: Object,
  throwError: Object,
  resetForm: Object,
  resetContactFormSuccess: Object
};

const renderTextField = ({
  input, // eslint-disable-line
  label, // eslint-disable-line
  meta: { touched, error }, // eslint-disable-line
  custom // eslint-disable-line
}) => (
  <CustomInput
    labelText={custom.labelText}
    id={label}
    name={label}
    inputProps={input}
    formControlProps={{
      fullWidth: true
    }}
  />
);

const renderTextAreaField = ({
  input, // eslint-disable-line
  label, // eslint-disable-line
  meta: { touched, error }, // eslint-disable-line
  custom // eslint-disable-line
}) => (
  <CustomInput
    labelText={custom.labelText}
    id={label}
    name={label}
    inputProps={{
      ...input,
      multiline: true,
      rows: 5
    }}
    formControlProps={{
      fullWidth: true,
      className: custom.className
    }}
  />
);

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

class WorkSection extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSubmit(formData) {
    // Check not empty
    if (
      Object.keys(formData).filter(key => {
        const value = formData[key];
        return value !== '' && value !== undefined && value !== null;
      }).length !== 3
    )
      return this.props.throwError(
        'Please fill our all the fields in the form'
      );

    if (!validateEmail(formData.email))
      return this.props.throwError(
        "Please check the email address entered, it doesn't appear to be valid"
      );

    const { sendContactForm } = this.props;

    sendContactForm(formData);
  }

  handleClose(){ // eslint-disable-line
    this.props.resetContactFormError();
  }

  handleCloseSuccess(){ // eslint-disable-line
    console.log('success');
    this.props.resetContactFormSuccess();
    this.props.resetForm();
  }

  render() {
    const { classes, handleSubmit } = this.props;
    const { err, readyStatus, name } = this.props.contact;

    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem cs={12} sm={12} md={8}>
            <h2 className={classes.title}>Free Consultation</h2>
            <h4 className={classes.description}>
              Tell us a little bit about what you need help with, and we would
              be happy to answer any questions by email, or schedule a 30 minute
              phone call.
            </h4>
            <form onSubmit={handleSubmit(test => this.handleSubmit(test))}
            >
              {readyStatus === 'CONTACT_SUCCESS' ? (
                <Snackbar
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  open={readyStatus === 'CONTACT_SUCCESS'}
                  // autoHideDuration={6000}
                  onClose={this.handleCloseSuccess.bind(this)}
                >
                  <MySnackbarContentWrapper
                    onClose={this.handleCloseSuccess.bind(this)}
                    variant="success"
                    message="Thanks for getting in touch! We will get back to you shortly."
                  />
                </Snackbar>
              ) : (
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <Field
                      name="name"
                      component={renderTextField}
                      custom={{ labelText: 'Your Name' }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Field
                      name="email"
                      component={renderTextField}
                      custom={{ labelText: 'Your Email' }}
                    />
                  </GridItem>
                  <Field
                    name="message"
                    component={renderTextAreaField}
                    custom={{
                      labelText: 'Your Message',
                      className: classes.textArea
                    }}
                  />
                  {err !== null ? (
                    <Snackbar
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                      }}
                      open={err !== null}
                      // autoHideDuration={6000}
                      onClose={this.handleClose}
                    >
                      <MySnackbarContentWrapper
                        onClose={this.handleClose.bind(this)}
                        variant="error"
                        message={
                          err.message === 'object'
                            ? JSON.parse(err.message)
                            : err.message
                        }
                      />
                    </Snackbar>
                  ) : (
                    ''
                  )}
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.textCenter}
                  >
                    <Button type="submit" color="primary">
                      Send Message
                    </Button>
                  </GridItem>
                </GridContainer>
              )}
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const connector = connect(
  ({ contact }: ReduxState) => ({ contact }),
  (dispatch: Dispatch) => ({
    sendContactForm: (formData: Object) =>
      dispatch(contactAction.sendContactForm(formData)),
    resetContactForm: () => dispatch(contactAction.resetContactForm()),
    resetContactFormError: () =>
      dispatch(contactAction.resetContactFormError()),
    resetContactFormSuccess: () =>
      dispatch(contactAction.resetContactFormSuccess()),
    throwError: (error: String) => dispatch(contactAction.throwError(error)),
    resetForm: () => dispatch(reset('contact'))
  })
);

export default compose(
  connector,
  withStyles(workStyle),
  reduxForm({
    form: 'contact'
  })
)(WorkSection);
