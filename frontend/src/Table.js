import React from 'react';
import TableRow from './components/TableRow';



export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url,
      fetchedObjects: [],
      fieldNames: []
    }
    this.getFieldNames = this.getFieldNames.bind(this);
    this.saveEditedRow = this.saveEditedRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }


  async componentDidMount() {
    const url = this.props.url;
    const data = await this.props.handleRequest(url, 'GET');
    const names = this.getFieldNames(data[0]);
    console.log(data)
    this.setState({
      fetchedObjects: data,
      fieldNames: names
    });
  }


  getFieldNames(object) {
    const names = [];
    for (let key of Object.keys(object)) {
      let name = key.charAt(0).toUpperCase() + key.slice(1);
      names.push(name);
    };
    return names;
  }


  async deleteRow(id) {
    const url = `${this.state.url}/delete/${id}`
    const res = await this.props.handleRequest(url, 'DELETE');
    console.log(res.message);

    this.props.updateFetchedObjects('delete', id);
  }


  async saveEditedRow(data, id) {
    const url = `${this.state.url}/edit/${id}`;
    const { status } = await this.props.handleRequest(url, 'POST', data);
    return status;
  }


  render() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            {this.state.fieldNames.map(fieldName => (
              <th scope='col' key={fieldName}>{fieldName}</th>
            ))}
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.fetchedObjects.map(object => (
            <TableRow
              key={object.id}
              object={object}
              saveEditedRow={this.saveEditedRow}
              deleteRow={this.deleteRow}
            />
          ))}
        </tbody>
      </table>
    )
  }


}