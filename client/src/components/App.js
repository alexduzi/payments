import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import ClientList from './client/ClientList';
import ClientForm from './client/ClientForm';

class App extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>

              <Route path="/newclient" component={ClientForm} />
              <Route path="/" component={ClientList} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
