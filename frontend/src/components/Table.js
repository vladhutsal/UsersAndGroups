import React from 'react';
import RowsHandler from './Rows/RowsHandler';
import Cookies from 'js-cookie';
import CreationForm from './CreationForms'



export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: props.mode,
      url: props.url,
      fetchedObjects: [],
      fieldNames: [],
    }
    this.getFieldNames = this.getFieldNames.bind(this);
    this.saveEditedRow = this.saveEditedRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);

    this.handleRequest = this.handleRequest.bind(this);
    this.updateFetchedObjects = this.updateFetchedObjects.bind(this);
  }


  async componentDidMount() {
    const url = this.props.url;
    const data = await this.handleRequest(url, 'GET');
    console.log(data)
    if (data.length > 0) {
      const names = this.getFieldNames(data[0]);
      this.setState({
        fetchedObjects: data,
        fieldNames: names
      });
    }
  }


  async handleRequest(url, method, data) {
    if (['GET', 'DELETE'].includes(method)) {
      const res = await fetch(url, { method: method });
      const resData = await res.json();
      return resData;
    }
    else if (method === 'POST') {
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
      return resData;
    }
  };


  updateFetchedObjects(action, objectData) {
    if (action === 'add') {
      this.setState(state => ({
        fetchedObjects: [objectData, ...state.fetchedObjects]
      }));
    }

    else if (action === 'delete') {
      const updatedArr = [...this.state.fetchedObjects];
      const search = (group) => group.id === objectData;
      const groupToDeleteId = updatedArr.findIndex(search);
      updatedArr.splice(groupToDeleteId, 1);

      this.setState({
        fetchedObjects: updatedArr
      });
    };
  }


  getFieldNames(object) {
    const names = [];
    for (let key of Object.keys(object)) {
      let name = key.charAt(0).toUpperCase() + key.slice(1);
      names.push(name);
    };
    return names;
  }


  async deleteRow(id) {
    const url = `${this.state.url}/delete/${id}`
    const res = await this.props.handleRequest(url, 'DELETE');
    console.log(res.message);

    this.props.updateFetchedObjects('delete', id);
  }


  async saveEditedRow(data, id) {
    const url = `${this.state.url}/edit/${id}`;
    const { status } = await this.props.handleRequest(url, 'POST', data);
    return status;
  }


  render() {
    return (
      <>
        <CreationForm
          updateFetchedObjects={this.updateFetchedObjects}
          url={this.state.url}
          handleRequest={this.handleRequest}
          mode={this.state.mode}
        />
        <table className="table mt-4">
          <thead>
            <tr>
              {this.state.fieldNames.map(fieldName => (
                <th scope='col' key={fieldName}>{fieldName}</th>
              ))}
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.fetchedObjects.map(object => (
              <RowsHandler
                key={object.id}
                object={object}
                handleRequest={this.handleRequest}
                updateFetchedObjects={this.updateFetchedObjects}
                url={this.state.url}
                mode={this.props.mode}
              />
            ))}
          </tbody>
        </table>
      </>
    )
  }
}