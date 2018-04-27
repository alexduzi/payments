import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { withRouter } from "react-router-dom";
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import * as candidateActions from '../../actions';
import { CircularProgress } from 'material-ui/Progress';
import moment from 'moment';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import { DatePicker } from 'material-ui-pickers';
import CandidateMessage from './CandidateMessage';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: 240,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  container: {
    flexdirection: 'column',
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  button: {
    margin: theme.spacing.unit,
  },
  menu: {
    width: 200,
  },
});

class CandidateForm extends Component {
  state = {

    name: '',
    lastName: '',
    email: '',
    birthDate: moment(),
    age: '',
    title: '',
    phoneNumber: '',

    experiences: [
      {
        company: "Gupy",
        position: "Full stack dev.",
        jobDescription: "Delivering high quality software using an amazing stack.",
        startDate: moment().format('yyyy-dd-MM'),
        finalDate: undefined,
        isCurrentJob: true
      }
    ],

    candidateId: undefined,
    updating: false,

    nameError: false,
    lastNameError: false,
    emailError: false,
    titleError: false,
    birthDateError: false
  };

  componentWillMount() {
    const { _id } = this.props.match.params;

    if (_id) {
      this.props.fetchCandidate(_id).then(() => this.setState({ candidateId: _id, updating: true }));
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { candidate } = nextProps;

    if (candidate) {
      this.setState({ ...candidate });
    }
  }

  onSubmitHandler = () => {
    const { name, lastName, email, birthDate, age, title, updating, candidateId, phoneNumber } = this.state;

    if (!name || name === '') {
      this.setState({ nameError: true });
      return;
    }
    if (!lastName || lastName === '') {
      this.setState({ lastNameError: true });
      return;
    }
    if (!birthDate || birthDate === '') {
      this.setState({ birthDateError: true });
      return;
    }
    if (!title || title === '') {
      this.setState({ titleError: true });
      return;
    }

    if (updating) {
      this.props.updateCandidate({ name, lastName, email, birthDate, age, title, _id: candidateId, phoneNumber });
    } else {
      this.props.insertCandidate({ name, lastName, email, birthDate, age, title, phoneNumber });
    }

    this.setState({ messageOpen: true });
  }

  onCandidateMessageClose = () => {
    this.setState({ messageOpen: false });
  }

  onCancelHandler = () => {

    this.props.cancelCandidateInsertion();

    this.props.history.push('/');
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      [`${name}Error`]: false
    });
  };

  handleDateChange = (date) => {
    this.setState({ birthDate: date });
  }

  renderAddExperienceButton = () => {
    const { classes } = this.props;

    if (this.state.updating || this.props.candidate) {
      return (
        <Button variant="raised" size="large" className={classes.button} href={`/candidate/experience/${this.props.candidate._id}`}>
          Add Experiences
        </Button>
      );
    }

    return (
      <div></div>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={16}
            className={classes.demo}
            alignItems={'center'}
            direction={'column'}
            justify={'center'}
          >
            <Grid key={1} item>
              <Paper
                className={classes.paper}
                style={{ paddingTop: (1 + 1) * 10, paddingBottom: (1 + 1) * 10 }}
              >
                <TextField
                  error={this.state.nameError}
                  required
                  id="name"
                  label="Name"
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  className={classes.textField}
                  margin="normal"
                />
                <TextField
                  error={this.state.lastNameError}
                  required
                  id="lastName"
                  label="Last Name"
                  value={this.state.lastName}
                  onChange={this.handleChange('lastName')}
                  className={classes.textField}
                  margin="normal"
                />
                <TextField
                  error={this.state.phoneNumberError}
                  required
                  id="phoneNumber"
                  label="Phone Number"
                  value={this.state.phoneNumber}
                  onChange={this.handleChange('phoneNumber')}
                  className={classes.textField}
                  margin="normal"
                />
                <TextField
                  error={this.state.emailError}
                  required
                  id="email"
                  label="Email"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  className={classes.textField}
                  margin="normal"
                />
                <TextField
                  error={this.state.titleError}
                  required
                  id="title"
                  label="Title"
                  value={this.state.title}
                  onChange={this.handleChange('title')}
                  className={classes.textField}
                  margin="normal"
                />
                <TextField
                  id="age"
                  label="Age"
                  value={this.state.age}
                  onChange={this.handleChange('age')}
                  className={classes.textField}
                  margin="normal"
                />
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DatePicker
                    keyboard
                    format="DD/MM/YYYY"
                    label="Birth Date"
                    maxDateMessage="Date must be less than today"
                    value={this.state.birthDate}
                    onChange={this.handleDateChange}
                  />
                </MuiPickersUtilsProvider>
                <Button variant="raised" size="large" className={classes.button} onClick={this.onCancelHandler}>
                  Cancel
                </Button>
                <Button variant="raised" size="large" className={classes.button} onClick={this.onSubmitHandler}>
                  { this.props.insertLoading ? <CircularProgress className={classes.progress} color="secondary" /> : 'Save'}
                </Button>
                {this.renderAddExperienceButton()}
                <CandidateMessage messageOpen={this.state.messageOpen} message="Candidate saved!" onCandidateMessageClose={this.onCandidateMessageClose} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ candidates: { insertLoading, insertError, insertErrorMessage, candidate } }) => {
  return {
    insertLoading,
    insertError,
    insertErrorMessage,
    candidate
  }
}

export default connect(mapStateToProps, candidateActions)(withStyles(styles)(withRouter(CandidateForm)));
