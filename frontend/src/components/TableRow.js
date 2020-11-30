import React from 'react';
import Actions from './Actions';


export default class TableRow extends React.Component {
    constructor(props) {
      super(props);

    this.state = {
        object: props.object,
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

  async deleteGroup(event) {
    console.log(event.target.id)
    const id = this.state.object.id;
    const url = `http://127.0.0.1:8000/api/groups/delete/${this.state.id}`
    const res = await this.props.handleRequest(url, 'DELETE');
    console.log(res.message);

    this.props.updateFetchedObjects('delete', this.state.object.id);
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
    const object = this.state.object;
    const objKeys = Object.keys(object);
    if ( !this.state.edit ) {
      return(
        <tr key={ object.name }>
          { objKeys.map(fieldName => (
            <td key={ fieldName }>{ object[fieldName] }</td>
          ))}
          <td>
            <Actions
                editGroup={ this.editGroup }
                edit={ this.state.edit }
                delete={ this.deleteGroup }
            />
          </td>
        </tr>
      )}

    else {
      return(
        <tr>
          <td>{ object.id }</td>
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

