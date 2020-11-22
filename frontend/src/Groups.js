import React from 'react';
import CreateGroup from './components/CreateGroup';
import GroupRow from './components/GroupRow';
import Cookies from 'js-cookie';


export default class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupsList: []
    }

    this.handleRequest = this.handleRequest.bind(this);
    this.updateGroupList = this.updateGroupList.bind(this);
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
  }};


  async componentDidMount() {
    const url = 'http://127.0.0.1:8000/api/groups';
    const data = await this.handleRequest(url, 'GET');
    this.setState({
      groupsList: data
    })
  }


  updateGroupList(action, groupData) {
    if ('add'.includes(action)) {
      this.setState(state => ({
        groupsList: [groupData, ...state.groupsList]  
      }));
    }

    else if ('delete'.includes(action)) {
      const search = (group) => {
        return (group.id === groupData)
      };
      let updatedArr = [...this.state.groupsList];
      const groupToDeleteId = updatedArr.findIndex(search);
      updatedArr.splice(groupToDeleteId, 1);
      this.setState({
        groupsList: updatedArr
      });
    };
  }


  render() {
    return (
      <div>
        <CreateGroup 
        updateGroupList={ this.updateGroupList }/>
        <table className="table mt-4">
        <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Group</th>
          <th scope="col">Description</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
          { this.state.groupsList.map(object => (
          <GroupRow
            key={ object.id }
            object={ object }
            handleRequest={ this.handleRequest }
            updateGroupList={ this.updateGroupList }/>
          ))}
        </tbody>
        </table>
          <br />
      </div>
    )
  }
  

}