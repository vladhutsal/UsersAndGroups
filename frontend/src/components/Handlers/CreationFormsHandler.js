import React from 'react';


export default function CreationFormsHandler(props) {
  if (props.mode === 'groups') {
    return (
      <CreateGroupForm
        url={props.url}
        handleRequest={props.handleRequest}
        updateFetchedObjects={props.updateFetchedObjects}
      />
    );
  }
  else if (props.mode === 'users') {
    return (
      <CreateUserForm
        url={props.url}
        groupsIdToName={props.groupsIdToName}
        handleRequest={props.handleRequest}
        updateFetchedObjects={props.updateFetchedObjects}
      />
    );
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
    });
  }

  async submitNewGroup(event) {
    event.preventDefault();
    const res = await this.props.handleRequest(`${this.props.url}/create`, 'POST', this.state);
    this.props.updateFetchedObjects('add', res);

    this.setState({
      name: '',
      description: ''
    });
  }

  render() {

    return (
      <div>
        <form id='groupForm' onSubmit={this.submitNewGroup}>
          <div className='row my-2'>
            <div className='col-3'>
              <input required
                className='form-control'
                placeholder='name'
                name='name'
                onChange={this.updateField}
                value={this.state.name} />
            </div>
            <div className='col-6'>
              <input 
                className='form-control'
                placeholder='description'
                name='description'
                onChange={this.updateField}
                value={this.state.description} />
            </div>
          </div>
          <button className='btn btn-warning btn-sm' type='submit'>Create group</button>
        </form>
      </div>
    );
  }
}


class CreateUserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      group: ''
    };
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
    this.props.updateFetchedObjects('add', res);

    this.setState({
      name: ''
    });
  }

  render() {
    const groupKeys = Object.keys(this.props.groupsIdToName);
    const placeholdeVal = '-- choose group --';

    return (
      <div>
        <form id='userForm' onSubmit={this.submitNewUser}>
          <div className='row my-2'>
            <div className='col-3'>
              <input required
                className='form-control'
                name='name'
                placeholder='username'
                onChange={this.updateField}
                value={this.state.name} />
            </div>
            <div className='col-3'>
              <select required
                className='form-control'
                name='group'
                onChange={this.updateField}
                defaultValue='' >
                <option hidden value="">{placeholdeVal}</option>
                {groupKeys.map(groupId => (
                  <option key={groupId} value={groupId}>
                    {this.props.groupsIdToName[groupId]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            className='btn btn-warning btn-sm'
            type='submit'>
              Create user
          </button>
        </form>
      </div>
    );
  }
}
