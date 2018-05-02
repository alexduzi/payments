import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form, Input, TextArea, Checkbox, Radio, RadioGroup, Dropdown, Select
} from 'formsy-semantic-ui-react';
import { Label } from 'semantic-ui-react';
import * as clientActions from '../../actions/clientActions';

class ClientForm extends Component {
  state = {
    loading: false
  }

  componentWillMount() {

  }

  onValidSubmit = (formData) => {
    this.props.inserClient(formData)
      .then(() => this.props.history.push('/'));
  }

  render() {
    return (
      <Form
        ref={ ref => this.form = ref }
        onValidSubmit={ this.onValidSubmit }
        loading={ this.state.isLoading }
      >
        <Form.Input
          name="name"
          label="Name"
          errorLabel={ <Label color="red" pointing/> }
        />
        <Form.Input
          name="companyName"
          label="Company Name"
          errorLabel={ <Label color="red" pointing/> }
        />
        <Form.Input
          name="cnpj"
          label="Cnpj"
          errorLabel={ <Label color="red" pointing/> }
        />
        <Form.Input
          name="phoneNumber"
          label="Phone Number"
          errorLabel={ <Label color="red" pointing/> }
        />
        <Form.Input
          name="address"
          label="Address"
          errorLabel={ <Label color="red" pointing/> }
        />
        <Form.Input
          name="email"
          label="Email"
          errorLabel={ <Label color="red" pointing/> }
        />
        <Form.Group>
          <Form.Button content="Submit" color="green"/>
          <Form.Button type="button" content="Reset" onClick={ () => this.form.reset() }/>
        </Form.Group>

      </Form>
    );
  }
}

export default connect(null, clientActions)(ClientForm);
