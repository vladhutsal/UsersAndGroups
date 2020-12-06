import React from 'react';

import PopUp from './PopUp';
import TableHandler from './Handlers/TableHandler';
import CreationFormsHandler from './Handlers/CreationFormsHandler';

import Cookies from 'js-cookie';


export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url,
      mode: props.mode,
      popUpData: {},

      fetchedObjects: [],
      groupsIdToName: {},
    };
    this.generatePopUpMessage = this.generatePopUpMessage.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.updateFetchedObjects = this.updateFetchedObjects.bind(this);
  }


  async componentDidMount() {
    const url = this.props.url;
    const response = await this.handleRequest(url, 'GET');
    const data = response.data;

    if (this.state.mode === 'users') {
      const response = await this.handleRequest(this.props.grpUrl, 'GET');

      const groups = {};
      for (let group of response.data) {
        groups[group.id] = group.name;
      };
      this.setState({
        groupsIdToName: groups
      });
    }
    
    this.setState({
      fetchedObjects: data,
    });
  }


  async handleRequest(url, method, data) {
    const generateResponse = async (res) => {
      const parsed = await res.json()
      return {
        status: res.status,
        message: parsed.message,
        data: parsed.data
      };
    }

    if (['GET', 'DELETE'].includes(method)) {
      const res = await fetch(url, { method: method });
      return generateResponse(res);
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
      return generateResponse(res);
    }
  };


  generatePopUpMessage(action, message) {
    this.setState({
      popUpData: {
        eventName: action.charAt(0).toUpperCase() + action.slice(1),
        message: message
      }
    });
  }


  updateFetchedObjects(action, response) {
    if (response.status === 409) {
      this.generatePopUpMessage(action, response.message);
      return;
    }

    const object = response.data;
    const updatedArr = [...this.state.fetchedObjects];
    const search = (group) => group.id === object.id;
    const currentObjId = updatedArr.findIndex(search);

    switch (action) {
      case 'add':
        updatedArr.unshift(object);
        break;

      case 'edit':
        updatedArr[currentObjId] = object;
        break;

      case 'delete':
        updatedArr.splice(currentObjId, 1);
        break;

      default:
        console.warn('Wrong action for updateFetchedObjects method');
        return;
    };

    this.setState({
      fetchedObjects: updatedArr
    });

    this.generatePopUpMessage(action, response.message)
  }

  render() {
    return (
      <>
        <PopUp
          data={this.state.popUpData}
        />
        <CreationFormsHandler
          url={this.state.url}
          mode={this.state.mode}
          groupsIdToName={this.state.groupsIdToName}
          handleRequest={this.handleRequest}
          updateFetchedObjects={this.updateFetchedObjects} />

        <TableHandler
          url={this.state.url}
          mode={this.props.mode}
          objects={this.state.fetchedObjects}
          groupsIdToName={this.state.groupsIdToName}
          handleRequest={this.handleRequest}
          updateFetchedObjects={this.updateFetchedObjects} />
      </>
    )
  }
}