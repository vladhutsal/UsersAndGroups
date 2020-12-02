import React from 'react';
import Actions from '../Actions'


export default class UserRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.user.name,
      groupId: props.user.group,
      groupIdToName: props.groupIdToName

    }
    this.updateField = this.updateField.bind(this);
    this.collectData = this.collectData.bind(this);
  }

  updateField(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    });
  }

  async collectData() {
    const data = {
      name: this.state.name,
      group: this.state.groupId
    };
    await this.props.saveRow(data, this.props.user.id);
    this.props.editRow();
    return;
  }

  render() {
    const user = this.props.user;
    const userId = this.props.user.id;
    const groupsIdToName = this.state.groupIdToName;
    let groupKeys = Object.keys(this.state.groupIdToName);
    groupKeys = groupKeys.filter(val => {return parseInt(val) !== this.state.groupId});

    if (!this.props.isEdit) {
      return (
        <tr key={this.state.name}>
          <td>{userId}</td>
          <td>{user.name}</td>
          <td>{user.created}</td>
          <td>{this.props.groupIdToName[this.state.groupId]}</td>
          <td>
            <Actions
              id={userId}
              edit={this.props.editRow}
              isEdit={this.props.isEdit}
              delete={this.props.deleteRow}
            />
          </td>
        </tr>
      )
    }

    else if (this.props.isEdit) {
      return (
        <tr>
          <td>{userId}</td>
          <td>
            <input className='form-control' name='name'
              value={this.state.name}
              onChange={this.updateField} />
          </td>
          <td>{user.created}</td>
          <td>
            <select name='groupId' onChange={this.updateField}>
              <option disabled selected value={this.state.groupId}>{groupsIdToName[this.state.groupId]}</option>
              {groupKeys.map(groupId => (
                <option key={groupId} value={groupId}>{groupsIdToName[groupId]}</option>
              ))}
            </select>
          </td>
            <td><Actions
              id={this.props.user.id}
              edit={this.props.editRow}
              isEdit={this.props.isEdit}
              save={this.collectData} /></td>
        </tr>
      )
    }
  }
}