import React, { useState } from 'react';
import GroupRow from './GroupRow';
import UserRow from './UserRow';


export default class RowsHandler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    const url = `${ this.props.url }/delete/${ this.props.object.id }`
    const res = await this.props.handleRequest(url, 'DELETE');
    console.log(res.message);

    this.props.updateFetchedObjects('delete', this.props.object);
  }


  async saveEditedRow(data) {
    const url = `${ this.props.url }/edit/${ this.props.object.id }`;
    const res = await this.props.handleRequest(url, 'POST', data);
    return;
  }


  render() {
    if (this.props.mode === 'groups') {
      return (
        <GroupRow group={this.props.object}
          isEdit={this.state.edit}

          editRow={this.editRow}
          saveRow={this.saveEditedRow}
          deleteRow={this.deleteRow}
        />
      )
    }
    else if (this.props.mode === 'users') {
      return (
        <UserRow user={this.props.object}
          isEdit={this.state.edit}
          groupIdToName={this.props.groupIdToName}

          editRow={this.editRow}
          saveRow={this.saveEditedRow}
          deleteRow={this.deleteRow}
        />
      )
    }

  }
}

