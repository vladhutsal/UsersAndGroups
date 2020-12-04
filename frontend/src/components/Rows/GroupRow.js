import React from 'react';
import Actions from '../Actions'


export default class GroupRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      name: '',
      descr: '',
    }
    this.toogleEdit = this.toogleEdit.bind(this);
    this.updateField = this.updateField.bind(this);
    this.collectData = this.collectData.bind(this);
  }

  toogleEdit() {
    this.setState(state => ({
      isEdit: !state.isEdit,
      name: this.props.group.name,
      descr: this.props.group.description
    }));
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
      description: this.state.descr
    };
    await this.props.saveEditedRow(data, this.props.group.id);
    this.setState({
      isEdit: false
    });
    return;
  }

  render() {
    const group = this.props.group;
    if (!this.state.isEdit) {
      return (
        <tr>
          <td>{group.id}</td>
          <td>{group.name}</td>
          <td>{group.description}</td>
          <td>
            <Actions
              id={group.id}
              edit={this.toogleEdit}
              isEdit={this.state.isEdit}
              delete={this.props.deleteRow}
            />
          </td>
        </tr>
      )
    }

    else {
      return (
        <tr key={group.name}>
          <td>{group.id}</td>
          <td>
            <input className='form-control' name='name'
              value={this.state.name}
              onChange={this.updateField} />
          </td>
          <td>
            <input className='form-control' name='descr'
              value={this.state.descr}
              onChange={this.updateField} />
          </td>
          <td>
            <Actions
              id={group.id}
              edit={this.toogleEdit}
              isEdit={this.state.isEdit}
              save={this.collectData} />
          </td>
        </tr>
      )
    }
  }
}