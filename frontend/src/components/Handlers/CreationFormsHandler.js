import React from 'react';


export default function CreationFormsHandler(props) {
  if (props.mode === 'groups') {
    return (
      <CreateGroupForm
        handleRequest={props.handleRequest}
        updateFetchedObjects={props.updateFetchedObjects}
        url={props.url}
      />
    )
  }
  else if (props.mode === 'users') {
    return (
      <CreateUserForm
        handleRequest={props.handleRequest}
        updateFetchedObjects={props.updateFetchedObjects}
        url={props.url}
        groupsIdToName={props.groupsIdToName}
      />
    )
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
    const res = await this.props.handleRequest(`${this.props.url}/create`, 'POST', this.state);
    this.props.updateFetchedObjects('add', res.data);

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
    const res = await this.props.handleRequest(`${this.props.url}/create`, 'POST', data);
    this.props.updateFetchedObjects('add', res.data);

    this.setState({
      name: '',
      group: ''
    });
  }

  render() {
    const groupKeys = Object.keys(this.props.groupsIdToName);
    const placeholdeVal = '-- choose group --';

    return (
      <div>
        <form id='userForm' onSubmit={this.submitNewUser}>
          <div className='row my-2'>
            <div className='col-4'>
              <input className='form-control' type='text' placeholder='username' name='name' onChange={this.updateField} value={this.state.name} />
            </div>
            <div className='col-4'>
              <select className='form-control' name='group' onChange={this.updateField} defaultValue={placeholdeVal}>
                <option disabled value={placeholdeVal}>{placeholdeVal}</option>
                {groupKeys.map(groupId => (
                  <option key={groupId} value={groupId}>{this.props.groupsIdToName[groupId]}</option>
                ))}
              </select>
            </div>
          <button className='btn btn-warning btn-sm' type='submit'>Create user</button>
          </div>
        </form>
      </div>
    )
  }
}
