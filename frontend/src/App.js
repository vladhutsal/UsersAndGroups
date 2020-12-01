import React from 'react';
import Cookies from 'js-cookie';

import Table from './Table';
import Navbar from './components/Nav';
import CreateGroup from './components/CreateGroup';

import { Switch, Route, Redirect } from 'react-router-dom';


export default class HandleServer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupList: [],
      userList: [],
      USER_API_URL: 'http://127.0.0.1:8000/api/users',
      GROUP_API_URL: 'http://127.0.0.1:8000/api/groups'
    }
    this.handleRequest = this.handleRequest.bind(this);
    this.updateFetchedObjects = this.updateFetchedObjects.bind(this);
  }


  async handleRequest(url, method, data) {
    if (['GET', 'DELETE'].includes(method)) {
      const res = await fetch(url, { method: method });
      const resData = await res.json();
      return resData;
    }
    else {
      const csrftoken = Cookies.get('csrftoken');
      const request = {
        method: method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        }
      };

      const res = await fetch(url, request);
      const status = res.status;
      const resData = await res.json();
      return { resData, status };
    }
  };


  updateFetchedObjects(action, groupData) {
    if ('add'.includes(action)) {
      this.setState(state => ({
        fetchedObjects: [groupData, ...state.fetchedObjects]
      }));
    }

    else if ('delete'.includes(action)) {
      const updatedArr = [...this.state.fetchedObjects];
      const search = (group) => group.id === groupData;
      const groupToDeleteId = updatedArr.findIndex(search);
      updatedArr.splice(groupToDeleteId, 1);

      this.setState({
        fetchedObjects: updatedArr
      });
    };
  }

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Redirect to="/groups" />
          </Route>
          <Route
            exact path='/groups'
            render={(props) => (
            <>
            <CreateGroup {...props} updateFetchedObjects={this.updateFetchedObjects} />
            <Table {...props}
              url={this.state.GROUP_API_URL}
              handleRequest={this.handleRequest}
              updateFetchedObjects={this.updateFetchedObjects}

              mode='groups' 
            />
            </>
          )} />

          <Route exact path='/users' render={(props) =>
            <Table {...props}
              url={this.state.USER_API_URL}
              handleReq={this.handleReq}
              updateObjects={this.updateObjects}

              mode='users'
            />
          } />
        </Switch>
      </div>
    )
  }
}
