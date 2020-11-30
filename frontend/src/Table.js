import React from 'react';
import CreateGroup from './components/CreateGroup';
import TableRow from './components/TableRow';
import Cookies from 'js-cookie';


export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedObjects: [],
      fieldNames: []
    }

    this.handleRequest = this.handleRequest.bind(this);
    this.updateFetchedObjects = this.updateFetchedObjects.bind(this);
    this.getFieldNames = this.getFieldNames.bind(this);
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
    const url = this.props.url;
    const data = await this.handleRequest(url, 'GET');
    const names = this.getFieldNames(data[0]);

    this.setState({
      fetchedObjects: data,
      fieldNames: names
    });
  }


  getFieldNames(object) {
    const names = [];
    for (let key of Object.keys(object)) {
      let name = key.charAt(0).toUpperCase() + key.slice(1);
      names.push(name);
    };
    return names;
  }


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
        <CreateGroup 
          updateFetchedObjects={ this.updateFetchedObjects }
        />
        <table className="table mt-4">
        <thead>
        <tr>
          { this.state.fieldNames.map(fieldName => (
            <th scope='col' key={fieldName}>{ fieldName }</th>
          ))}
          <th scope='col'>Actions</th>
        </tr>
        </thead>
        <tbody>
          { this.state.fetchedObjects.map(object => (
            <TableRow
              key = { object.id }
              object={ object }
              handleRequest={ this.handleRequest }
              updateFetchedObjects={ this.updateFetchedObjects }
            /> 
          ))}
        </tbody>
        </table>
          <br />
      </div>
    )
  }
  

}