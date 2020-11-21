import React from 'react';
import Actions from './Actions';
import Cookies from 'js-cookie';


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
              <GroupRow key={ group.id } group={ group }/>
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

  async saveEditedGroup() {
    const csrftoken = Cookies.get('csrftoken');
    const url = `http://127.0.0.1:8000/api/groups/edit/${this.state.id}`;
    const data = {
      name: this.state.name,
      description: this.state.description
    };

    const request = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      }
    };
    const res = await fetch(url, request);
    const resData = await res.json();
    this.editGroup();
    console.log(resData);
  }

  render() {
    if (!this.state.edit) {
      return(
        <tr>
          <td>{ this.state.id }</td>
          <td>{ this.state.name }</td>
          <td>{ this.state.description }</td>
          <td><Actions id={ this.props.group.id } editGroup={ this.editGroup } edit={ this.state.edit }/></td>
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

