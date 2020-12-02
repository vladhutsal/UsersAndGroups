import React from 'react';
import Actions from '../Actions'


export default class GroupRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.group.id,
      name: props.group.name,
      descr: props.group.description,
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
      description: this.state.descr
    };
    await this.props.saveRow(data, this.state.id);
    this.props.editRow();
    return;
  }

  render() {
    const group = this.props.group;
    const groupKeys = Object.keys(group);
    if (!this.props.isEdit) {
      return (
        <tr key={group.name}>
          { groupKeys.map(fieldName => (
            <td key={fieldName}>{group[fieldName]}</td>
          ))}
          <td>
            <Actions
              id={this.state.id}
              edit={this.props.editRow}
              isEdit={this.props.isEdit}
              delete={this.props.deleteRow}
            />
          </td>
        </tr>
      )
    }

    else {
      return (
        <tr>
          <td>{this.state.id}</td>
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
              id={this.state.id}
              edit={this.props.editRow}
              isEdit={this.props.isEdit}
              save={this.collectData} />
          </td>
        </tr>
      )
    }
  }
}