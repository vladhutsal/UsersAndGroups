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
          groupIdToName={this.props.groupIdToName}
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
    const newGroup = await this.props.handleRequest(`${this.props.url}/create`, 'POST', this.state);
    this.props.updateFetchedObjects('add', newGroup);

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
          <button className='btn btn-warning btn-sm' type='submit'>Create group</button>
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
      group: ''
    }
    this.submitNewUser = this.submitNewUser.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  updateField(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    });
  }

  async submitNewUser(event) {
    event.preventDefault();
    const data = {
      name: this.state.name,
      group: this.state.group
    };
    const newUser = await this.props.handleRequest(`${this.props.url}/create`, 'POST', data);
    this.props.updateFetchedObjects('add', newUser);

    this.setState({
      name: '',
      group: ''
    });
  }

  render() {
    const groupKeys = Object.keys(this.props.groupIdToName);
    return (
      <div>
        <form id='userForm' onSubmit={this.submitNewUser}>
          <input type='text' placeholder='username' name='name' onChange={this.updateField} value={this.state.name} />
          <select name='group' onChange={this.updateField}>
            <option disabled selected>-- choose group --</option>
            {groupKeys.map(groupId => (
              <option key={groupId} value={groupId}>{this.props.groupIdToName[groupId]}</option>
            ))}
          </select>
          <button className='btn btn-warning btn-sm' type='submit'>Create user</button>
        </form>
      </div>
    )
  }
}
