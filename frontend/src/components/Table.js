import React from 'react';
import RowsHandler from './Rows/RowsHandler';
import Cookies from 'js-cookie';
import CreationFormsHandler from './CreationFormsHandler'



export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url,
      mode: props.mode,
      groupIdToName: {},

      fetchedObjects: [],
      fieldNames: []
    }
    this.getFieldNames = this.getFieldNames.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.updateFetchedObjects = this.updateFetchedObjects.bind(this);
  }


  async componentDidMount() {
    const url = this.props.url;
    const data = await this.handleRequest(url, 'GET');

    if (data.length > 0) {
      if (this.state.mode === 'users') {
        const groupArr = await this.handleRequest(this.props.grpUrl, 'GET');
        const groups = {};
        for (let group of groupArr) {
          groups[group.id] = group.name;
        };
        this.setState({
          groupIdToName: groups
        });
      }
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
      const response = {
        status: res.status,
        message: res.message,
        data: await res.json()
      };
      return response;
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
      const search = (group) => group.id === objectData.id;
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


  render() {
    return (
      <>
        <CreationFormsHandler
          url={this.state.url}
          mode={this.state.mode}
          groupIdToName={this.state.groupIdToName}

          handleRequest={this.handleRequest}
          updateFetchedObjects={this.updateFetchedObjects}
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
                object={object}
                url={this.state.url}
                mode={this.props.mode}
                groupIdToName={this.state.groupIdToName}

                handleRequest={this.handleRequest}
                updateFetchedObjects={this.updateFetchedObjects}
              />
            ))}
          </tbody>
        </table>
      </>
    )
  }
}