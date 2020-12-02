import { get } from 'js-cookie';
import React from 'react';


export default class CreationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url,
      mode: props.mode,
      groups: props.groups
    }
  }

  render() {
    if (this.state.mode === 'groups') {
      return (
        <CreateGroupForm
          handleRequest={this.props.handleRequest}
          updateFetchedObjects={this.props.updateFetchedObjects}
          url={this.state.url}
        />
      )
    }
    else if (this.state.mode === 'users') {
      return (
        <CreateUserForm
          handleRequest={this.props.handleRequest}
          updateFetchedObjects={this.props.updateFetchedObjects}
          url={this.state.url}
        />
      )
    }

  }
}


class CreateGroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };

    this.submitNewGroup = this.submitNewGroup.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  updateField(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    })
  }

  async submitNewGroup(event) {
    event.preventDefault();
    this.props.handleRequest(`${this.props.url}/create`, 'POST', this.state);
    this.props.updateFetchedObjects('add', this.state);

    this.setState({
      name: '',
      description: ''
    });
  }

  render() {

    return (
      <div>
        <form id='groupForm' onSubmit={this.submitNewGroup}>
          <input type='text' placeholder='name' name='name' onChange={this.updateField} value={this.state.name} />
          <input type='text' placeholder='description' name='description' onChange={this.updateField} value={this.state.description} />
          <button className='btn btn-warning btn-sm' type='submit'>submit</button>
        </form>
      </div>
    )
  }
}


class CreateUserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      group: '',
      groups: []
    }

    this.submitNewUser = this.submitNewUser.bind(this);
    this.updateField = this.updateField.bind(this);
  }


  async componentDidMount(){
    const url = 'http://127.0.0.1:8000/api/groups';
    const res = await this.props.handleRequest(url, 'GET');
    this.setState({
      groups: res
    });
  }


  updateField(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    })
  }

  async submitNewUser(event) {
    event.preventDefault();
    const data = {
      name: this.state.name,
      group: this.state.group
    };
    this.props.handleRequest(`${this.props.url}/create`, 'POST', data);
    this.props.updateFetchedObjects('add', this.state);

    this.setState({
      name: '',
      group: ''
    });
  }


  render() {
    return (
      <div>
        <form id='userForm' onSubmit={this.submitNewUser}>
          <input type='text' placeholder='username' name='name' onChange={this.updateField} value={this.state.name} />
          <select name='group'>
            {this.state.groups.map(group => (
              <option value={group.id}>{group.name}</option>
            ))}
          </select>
          <button className='btn btn-warning btn-sm' type='submit'>submit</button>
        </form>
      </div>
    )
  }
}
