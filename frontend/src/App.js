import React from 'react';

import Table from './components/Table';
import Navbar from './components/Nav';

import { Switch, Route, Redirect } from 'react-router-dom';


export default class GroupsAndUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      USER_API_URL: 'http://127.0.0.1:8000/api/users',
      GROUP_API_URL: 'http://127.0.0.1:8000/api/groups'
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Redirect to="/groups" />
          </Route>

          <Route exact path='/groups' render={(props) => (
              <Table {...props}
                url={this.state.GROUP_API_URL}
                handleRequest={this.handleRequest}
                updateFetchedObjects={this.updateFetchedObjects}
                mode='groups'
              />
            )} />

          <Route exact path='/users' render={(props) => (
            <Table {...props}
              url={this.state.USER_API_URL}
              handleRequest={this.handleRequest}
              updateFetchedObjects={this.updateFetchedObjects}
              mode='users'
            />
          )} />
        </Switch>
      </div>
    )
  }
}
