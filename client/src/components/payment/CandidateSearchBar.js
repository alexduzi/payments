import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as candidateActions from '../../actions';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

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

class CandidateSearchBar extends Component {
  state = {
    searchEmail: '',
    searchName: ''
  }

  handleEmailChange = (e) => {
    this.setState({ searchEmail: e.target.value });
    this.props.fetchCandidates(e.target.value, this.state.searchName);
  }

  handleNameChange = (e) => {
    this.setState({ searchName: e.target.value });
    this.props.fetchCandidates(this.state.searchEmail, e.target.value);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <TextField
          id="email"
          label="Email"
          value={this.state.searchEmail}
          onChange={this.handleEmailChange}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="name"
          label="Name"
          value={this.state.searchName}
          onChange={this.handleNameChange}
          className={classes.textField}
          margin="normal"
        />
      </div>
    );
  }
}

export default connect(null, candidateActions)(withStyles(styles)(CandidateSearchBar))
