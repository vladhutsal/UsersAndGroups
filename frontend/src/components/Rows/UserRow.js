import React from 'react';
import Actions from '../Actions'


export default class UserRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      name: '',
      group: ''
    };
    this.toogleEdit = this.toogleEdit.bind(this);
    this.updateField = this.updateField.bind(this);
    this.collectData = this.collectData.bind(this);
  }


  toogleEdit() {
    this.setState(state => ({
      isEdit: !state.isEdit,
      name: this.props.user.name,
      group: this.props.user.group
    }));
  }


  updateField(event) {
    const { target: { name, value } } = event;
    console.log(event.target.value)
    this.setState({
      [name]: value
    });
  }


  async collectData() {
    const data = {
      name: this.state.name,
      group: this.state.group
    };
    await this.props.saveEditedRow(data, this.props.user.id);
    this.setState({
      isEdit: false
    });
    return;
  }


  render() {
    const user = this.props.user;
    const groupsIdToName = this.props.groupsIdToName;
    const groupKeys = Object.keys(groupsIdToName);
    delete groupKeys[this.state.group];
    if (!this.state.isEdit) {
      return (
        <tr>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.created}</td>
          <td>{groupsIdToName[this.props.user.group]}</td>
          <td>
            <Actions
              id={user.id}
              isEdit={this.state.isEdit}
              delete={this.props.deleteRow}
              edit={this.toogleEdit}
            />
          </td>
        </tr>
      )
    }

    else if (this.state.isEdit) {
      return (
        <tr>
          <td>{user.id}</td>
          <td>
            <input className='form-control' name='name'
              value={this.state.name}
              onChange={this.updateField} />
          </td>
          <td>{user.created}</td>
          <td>
            <select name='group' onChange={this.updateField} value={this.state.group}>
              <option disabled>{groupsIdToName[this.state.group]}</option>
              {groupKeys.map(groupId => (
                <option key={groupId} value={groupId}>{groupsIdToName[groupId]}</option>
              ))}
            </select>
          </td>
          <td>
            <Actions
              id={this.props.user.id}
              isEdit={this.state.isEdit}
              save={this.collectData}
              edit={this.toogleEdit}
            />
          </td>
        </tr>
      )
    }
  }
}