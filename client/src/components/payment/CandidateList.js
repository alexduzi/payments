import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as cadidateActions from '../../actions';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class CandidateList extends Component {
  state = {
    deleteDialogOpen: false,
    deleteCandidate: undefined
  };

  componentDidMount() {
    this.props.fetchCandidates();
  }

  onClickDeleteHandler = (candidate) => {
    this.setState({ deleteDialogOpen: true, deleteCandidate: candidate });
  }

  onCloseDeleteDialogHandler = () => {
    this.setState({ deleteDialogOpen: false, deleteCandidate: undefined });
  };

  onDeleteClickDialogHandler = () => {
    this.props.deleteCandidate(this.state.deleteCandidate);

    this.setState({ deleteDialogOpen: false, deleteCandidate: undefined });
  }

  renderDeleteDialogContent = () => {
    if (this.state.deleteCandidate) return `Are you sure that you want to delete ${this.state.deleteCandidate.name} ${this.state.deleteCandidate.lastName}?`;

    return '';
  }

  renderCandidates() {

    const { classes } = this.props;

    return this.props.list.map(candidate => {
      return (
        <TableRow key={candidate._id}>
          <TableCell>{`${candidate.name} ${candidate.lastName}`}</TableCell>
          <TableCell>{candidate.title}</TableCell>
          <TableCell>{candidate.email}</TableCell>
          <TableCell>{moment(candidate.createdAt).format('DD/MM/YYYY')}</TableCell>
          <TableCell>
            <Button variant="fab" color="secondary" aria-label="edit" className={classes.button} href={`/candidate/${candidate._id}`}>
              <Icon>edit_icon</Icon>
            </Button>
          </TableCell>
          <TableCell>
            <Button variant="fab" color="secondary" aria-label="edit" className={classes.button} onClick={() => this.onClickDeleteHandler(candidate)}>
              <DeleteIcon />
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  }

  render() {
    const { classes } = this.props;

    if (this.props.candidatesLoading) return (<CircularProgress className={classes.progress} color="secondary" />);

    return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Candidate</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Date Entry</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.renderCandidates()}
        </TableBody>
      </Table>
      <Dialog
        open={this.state.deleteDialogOpen}
        onClose={this.onCloseDeleteDialogHandler}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Deleting Candidate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {this.renderDeleteDialogContent()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onCloseDeleteDialogHandler} color="primary">
            Cancel
          </Button>
          <Button onClick={this.onDeleteClickDialogHandler} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
  }
}

const mapStateToProps = ({ candidates: { list, candidatesLoading } }) => {
  return {
    list,
    candidatesLoading
  }
}

export default connect(mapStateToProps, cadidateActions)(withStyles(styles)(CandidateList));
