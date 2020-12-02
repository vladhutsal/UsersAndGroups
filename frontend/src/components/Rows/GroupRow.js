import React from 'react';
import Actions from '../Actions'


export default class GroupRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.object.id,
      name: props.object.name,
      descr: props.object.description,
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
    const object = this.props.object;
    const objKeys = Object.keys(object);
    const objId = this.state.id;
    if (!this.props.isEdit) {
      return (
        <tr key={object.name}>
          { objKeys.map(fieldName => (
            <td key={fieldName}>{object[fieldName]}</td>
          ))}
          <td>
            <Actions
              id={objId}
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
          <td>{objId}</td>
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