import React from 'react';
import GroupRow from './GroupRow';
import UserRow from './UserRow';


export default class TableRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.object.id,
      object: props.object,
      mode: props.mode,
      url: props.url,
      edit: false
    }
    this.editRow = this.editRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.saveEditedRow = this.saveEditedRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  editRow() {
    this.setState(state => ({
      edit: !state.edit
    }));
  }


  async deleteRow() {
    const url = `${this.state.url}/delete/${this.state.id}`
    const res = await this.props.handleRequest(url, 'DELETE');
    console.log(res.message);

    this.props.updateFetchedObjects('delete', this.state.id);
  }


  async saveEditedRow(data, id) {
    const url = `${this.state.url}/edit/${id}`;
    const resData = await this.props.handleRequest(url, 'POST', data);
    this.setState({
      object: resData
    })
    return;
  }


  render() {
    const object = this.state.object;
    const objKeys = Object.keys(object);
    const objId = this.state.object.id;

    if (this.state.mode === 'groups') {
      return (
        <GroupRow object={object}
          editRow={this.editRow}
          saveRow={this.saveEditedRow}
          deleteRow={this.deleteRow}
          isEdit={this.state.edit}

        />
      )
    }
    else if (this.state.mode === 'users') {
      return (
        <UserRow object={object}
          editRow={this.editRow}
          saveRow={this.saveEditedRow}
          deleteRow={this.deleteRow}
          isEdit={this.state.edit}
        />
      )
    }

  }
}

