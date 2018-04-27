import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { withRouter } from "react-router-dom";
import Button from 'material-ui/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from 'material-ui/TextField';
import * as candidateActions from '../../actions';
import { CircularProgress } from 'material-ui/Progress';
import moment from 'moment';
import Reorder, {
  reorder,
  reorderImmutable,
  // reorderFromTo,
  reorderFromToImmutable
} from 'react-reorder';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Switch from 'material-ui/Switch';
import { FormControlLabel } from 'material-ui/Form';
import green from 'material-ui/colors/green';
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
  switchBase: {
    color: green[50],
    '&$checked': {
      color: green[500],
      '& + $bar': {
        backgroundColor: green[500],
      },
    },
  },
  bar: {},
  checked: {},
});

class ExperienceForm extends Component {
  state = {

    candidateId: undefined,
    updating: false,
    messageOpen: false,
    experiences: [
      {
        company: "Gupy",
        position: "Full stack dev.",
        jobDescription: "Delivering high quality software using an amazing stack.",
        startDate: moment(),
        finalDate: moment(),
        isCurrentJob: true
      }
    ]

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

    if (this.state.updating) {
      this.props.updateExperiences(this.state.candidateId, this.state.experiences)
    } else {
      this.props.insertExperiences(this.state.candidateId, this.state.experiences);
    }

    this.props.history.push('/');
  }

  onCandidateMessageClose = () => {
    this.setState({ messageOpen: false });
  }

  onCancelHandler = () => {

    this.props.cancelCandidateInsertion().then(() => this.props.history.push('/'));
  }

  handleExperienceChangeText = (idx, field) => (evt) => {
    const newExperiences = this.state.experiences.map((experience, sidx) => {
      if (idx !== sidx) return experience;
      return { ...experience, [field]: evt.target.value };
    });

    this.setState({ experiences: newExperiences });
  }

  handleExperienceChangeChecked = (idx, field) => (evt) => {
    const newExperiences = this.state.experiences.map((experience, sidx) => {
      if (idx !== sidx) return experience;
      return { ...experience, [field]: evt.target.checked };
    });

    this.setState({ experiences: newExperiences });
  }

  handleExperienceDateChange = (idx, field) => (date) => {
    const newExperiences = this.state.experiences.map((experience, sidx) => {
      if (idx !== sidx) return experience;
      return { ...experience, [field]: date };
    });

    this.setState({ experiences: newExperiences });
  }

  addNewExperience = () => {
    let { experiences } = this.state;

    let newExperience = {
      company: "",
      position: "",
      jobDescription: "",
      startDate: moment(),
      finalDate: moment(),
      isCurrentJob: false
    };

    experiences = [ ...experiences, newExperience ];

    this.setState({ experiences });
  }

  removeExperience = (index, experience) => {
    let { experiences } = this.state;

    experiences = experiences.filter((item, idx) => idx !== index);

    this.setState({ experiences, messageOpen: true });

    if (this.state.updating && experience._id) {
      this.props.deleteExperience(this.state.candidateId, experience);
    }
  }

  renderExperiences() {
    const { classes } = this.props;

    return this.state.experiences.map((experience, index) => {
      return (
        <div key={index}>
          <TextField
            id="company"
            label="Company"
            value={experience.company}
            onChange={this.handleExperienceChangeText(index, 'company')}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="position"
            label="Position"
            value={experience.position}
            onChange={this.handleExperienceChangeText(index, 'position')}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="jobDescription"
            label="Job Description"
            value={experience.jobDescription}
            onChange={this.handleExperienceChangeText(index, 'jobDescription')}
            className={classes.textField}
            margin="normal"
          />

          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              keyboard
              format="DD/MM/YYYY"
              label="Start Date"
              maxDateMessage="Date must be less than today"
              value={experience.startDate}
              onChange={this.handleExperienceDateChange(index, 'startDate')}
            />
          </MuiPickersUtilsProvider>

          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              keyboard
              format="DD/MM/YYYY"
              label="Final Date"
              maxDateMessage="Date must be less than today"
              value={experience.finalDate}
              onChange={this.handleExperienceDateChange(index, 'finalDate')}
            />
          </MuiPickersUtilsProvider>
          <FormControlLabel
            control={
              <Switch
                checked={experience.isCurrentJob}
                onChange={this.handleExperienceChangeChecked(index, 'isCurrentJob')}
                value="checkedA"
              />
            }
            label="Current Job"
          />
          <Button variant="fab" color="secondary" aria-label="delete" className={classes.button} onClick={() => this.removeExperience(index, experience)}>
            <DeleteIcon />
          </Button>
        </div>
      );
    });
  }

  onReorder (event, previousIndex, nextIndex, fromId, toId) {
    this.setState({
      experiences: reorder(this.state.experiences, previousIndex, nextIndex)
    });
  }

  onReorderGroup (event, previousIndex, nextIndex, fromId, toId) {
    if (fromId === toId) {
      const list = reorderImmutable(this.state[fromId], previousIndex, nextIndex);

      this.setState({
        [fromId]: list
      });
    } else {
      const lists = reorderFromToImmutable({
        from: this.state[fromId],
        to: this.state[toId]
      }, previousIndex, nextIndex);

      this.setState({
        [fromId]: lists.from,
        [toId]: lists.to
      });
    }
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
            alignItems={'flex-start'}
            direction={'column'}
            justify={'flex-start'}
          >
            <Grid key={1} item>
              <Paper
                className={classes.paper}
                style={{ paddingTop: (1 + 1) * 10, paddingBottom: (1 + 1) * 10 }}
              >
                <Reorder
                  reorderId="my-list" // Unique ID that is used internally to track this list (required)
                  placeholderClassName="placeholder" // Class name to be applied to placeholder elements (optional), defaults to 'placeholder'
                  draggedClassName="dragged" // Class name to be applied to dragged elements (optional), defaults to 'dragged'
                  lock="horizontal" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
                  onReorder={this.onReorder.bind(this)} // Callback when an item is dropped (you will need this to update your state)
                  autoScroll={true} // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
                  disabled={false} // Disable reordering (optional), defaults to false
                  disableContextMenus={true} // Disable context menus when holding on touch devices (optional), defaults to true
                  placeholder={
                    <div className="custom-placeholder" /> // Custom placeholder element (optional), defaults to clone of dragged element
                  }
                >
                  {
                    this.renderExperiences()
                    /*
                    Note this example is an ImmutableJS List so we must convert it to an array.
                    I've left this up to you to covert to an array, as react-reorder updates a lot,
                    and if I called this internally it could get rather slow,
                    whereas you have greater control over your component updates.
                    */
                  }
                </Reorder>
                <Button variant="raised" size="large" className={classes.button} onClick={this.onCancelHandler}>
                  Cancel
                </Button>
                <Button variant="raised" size="large" className={classes.button} onClick={this.addNewExperience}>
                  New Experience
                </Button>
                <Button variant="raised" size="large" className={classes.button} onClick={this.onSubmitHandler}>
                  { this.props.experienceInsertLoading ? <CircularProgress className={classes.progress} color="secondary" /> : 'Save'}
                </Button>
                <CandidateMessage messageOpen={this.state.messageOpen} message="Candidate experience deleted!" onCandidateMessageClose={this.onCandidateMessageClose} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ candidates: { candidate, experienceInsertLoading, experienceInsertError, experienceInsertErrorMessage } }) => {
  return {
    candidate, experienceInsertLoading, experienceInsertError, experienceInsertErrorMessage
  }
}

export default connect(mapStateToProps, candidateActions)(withStyles(styles)(withRouter(ExperienceForm)));
