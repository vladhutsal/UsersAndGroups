import React from 'react';
import Actions from './Actions';


export default class GroupsList extends React.Component {
    constructor(props) {
      super(props);
  }

  render() {
    return (
      <div>
        <table className="table mt-4">
          <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Group</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody id='tBody'>
            { this.props.groupsList.map(group => (
              <GroupRow
                key={ group.id }
                group={ group }
                handleRequest={ this.props.handleRequest }
                updateGroupList={ this.props.updateGroupList }/>
            ))}
          </tbody>
        </table>
        <br />
      </div>
    )
  }
}


class GroupRow extends React.Component {
    constructor(props) {
      super(props);

    this.state = {
        id: props.group.id,
        name: props.group.name,
        description: props.group.description,
        edit: false
    }

    this.editGroup = this.editGroup.bind(this);
    this.updateField = this.updateField.bind(this);
    this.saveEditedGroup = this.saveEditedGroup.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
  }

  updateField(event) {
    const { target: {name, value} } = event;
    this.setState({
      [name]: value
    });
  }

  editGroup() {
    this.setState(state => ({
        edit: !state.edit
    }));
  }

  async deleteGroup() {
    const url = `http://127.0.0.1:8000/api/groups/delete/${this.state.id}`
    const res = await this.props.handleRequest(url, 'DELETE');
    console.log(res.message);

    this.props.updateGroupList('delete', this.state.id);
  }

  async saveEditedGroup() {
    const url = `http://127.0.0.1:8000/api/groups/edit/${this.state.id}`;
    const data = {
      name: this.state.name,
      description: this.state.description
    };
    const { resData, status } = await this.props.handleRequest(url, 'POST', data);
    this.editGroup();
    console.log('GroupTable response status: ' + status);
  }

  render() {
    if (!this.state.edit) {
      return(
        <tr>
          <td>{ this.state.id }</td>
          <td>{ this.state.name }</td>
          <td>{ this.state.description }</td>
          <td><Actions
                id={ this.props.group.id }
                editGroup={ this.editGroup }
                edit={ this.state.edit }
                delete={ this.deleteGroup }/></td>
        </tr>
      )}

    else {
      return(
        <tr>
          <td>{ this.state.id }</td>
          <td>
            <input
                className='form-control'
                name='name'
                value={ this.state.name }
                onChange={ this.updateField }/>
          </td>
          <td>
            <input
                className='form-control'
                name='description'
                value={ this.state.description }
                onChange={ this.updateField }/>
          </td>
          <td><Actions
                id={ this.state.id }
                editGroup={ this.editGroup }
                edit={ this.state.edit }
                save={ this.saveEditedGroup }/></td>
        </tr>
      )}
    };
  }

