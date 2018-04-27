import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import ClientList from './client/ClientList';

class App extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            {/* <Header /> */}
            <Switch>
              {/* <Route path="/candidate/new" component={CandidateForm} />
              <Route path="/candidate/experience/:_id?" component={ExperienceForm} />
              <Route exact path="/candidate/:_id" component={CandidateForm} /> */}
              <Route path="/" component={ClientList} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
