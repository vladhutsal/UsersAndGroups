import React from 'react';
import GroupRow from './Groups/GroupRow';


export default class TableRow extends React.Component {
    constructor(props) {
      super(props);

    this.state = {
        id: props.object.id,
        object: props.object,
        edit: false
    }
    this.editRow = this.editRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  editRow() {
    this.setState(state => ({
        edit: !state.edit
    }));
  }

  deleteRow() {
    console.log(this.state.id)
    this.props.deleteRow(this.state.id);
    console.log('deleted')
  }

  render() {
    const object = this.state.object;
    const objKeys = Object.keys(object);
    const objId = this.state.object.id;
    return (
      <GroupRow object={object}
                editRow={this.editRow}
                saveRow={this.props.saveEditedRow}
                deleteRow={this.deleteRow}
                isEdit={this.state.edit}

      />
    )
    }
  }

