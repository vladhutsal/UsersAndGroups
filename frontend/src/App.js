import React from 'react';
import Table from './Table';
import Navbar from './components/Nav'
import { Switch, Route, Redirect } from 'react-router-dom';

const USER_API_URL = 'http://127.0.0.1:8000/api/users';
const GROUP_API_URL = 'http://127.0.0.1:8000/api/groups';


export default class HandleServer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupList: [],
      userList: [] 
    }
  }

  render() {
    return(
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Redirect to="/groups" />
          </Route>
          <Route exact path='/groups' render={props =>
            <Table {...props} url={ GROUP_API_URL } />
          } />

          <Route exact path='/users' render={(props) =>
            <Table {...props} url={ USER_API_URL }/>
          } />
        </Switch>
      </div>
    )
  }
}
