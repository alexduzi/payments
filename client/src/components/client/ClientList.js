import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Image, List, Dimmer, Loader, Segment, Grid, Menu, Header, Icon, Modal } from 'semantic-ui-react';
import * as clientActions from '../../actions/clientActions';

class ClientList extends Component {
  state = {
    modalOpen: false
  };

  componentWillMount() {
    this.props.getClients();
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  onDeleteClickHandler = () => this.setState({ showDeleteModal: true })

  renderLoading = () => (<Segment>
    <Dimmer active>
      <Loader />
    </Dimmer>

    <Image src='/assets/images/wireframe/short-paragraph.png' />
  </Segment>);

  renderNoResults = () => (<div>No results</div>);

  renderItems = () => {
    return this.props.list.map((item, idx) => {
      return (
        <Grid.Row key={idx}>
          <Grid.Column>
            <Menu fluid vertical>
              <Menu.Item className='header'>{item.companyName}</Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column>
            <Button>Edit</Button>
          </Grid.Column>
          <Grid.Column>
            <Button onClick={this.handleOpen}>Delete</Button>
          </Grid.Column>
        </Grid.Row>
      );
    });
  }

  render() {
    if (this.props.loading) return this.renderLoading();

    if (this.props.list.length === 0) return this.renderNoResults();

    return (
      <Grid textAlign='center' columns={3}>
        {this.renderItems()}
        <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        >
        <Header icon='browser' content='Cookies policy' />
        <Modal.Content>
          <h3>This website uses cookies to ensure the best user experience.</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
        </Modal>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return { list: state.client.list, loading: state.client.loading }
}

export default connect(mapStateToProps, clientActions)(ClientList);
