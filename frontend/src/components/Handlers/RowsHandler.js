import React from 'react';
import GroupRow from '../Rows/GroupRow';
import UserRow from '../Rows/UserRow';


export default class RowsHandler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      objects: [],
    }
    this.deleteRow = this.deleteRow.bind(this);
    this.saveEditedRow = this.saveEditedRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }


  componentDidUpdate(prevProps) {
    if (this.props.objects !== prevProps.objects) {
      this.setState({
        objects: this.props.objects
      });
    }
  }


  async deleteRow(id) {
    const url = `${this.props.url}/delete/${id}`
    const res = await this.props.handleRequest(url, 'DELETE');
    res.data.id = id;
    this.props.updateFetchedObjects('delete', res);

    return;
  }


  async saveEditedRow(data, id) {
    const url = `${this.props.url}/edit/${id}`;
    const res = await this.props.handleRequest(url, 'POST', data);
    this.props.updateFetchedObjects('edit', res)

    return;
  }


  render() {
    const mode = this.props.mode;
    const dataLength = this.props.objects.length;
    return (
      <>
        { mode === 'groups' && dataLength > 0 &&
          this.state.objects.map(object => (
            <GroupRow group={object}
              key={object.id}
              saveEditedRow={this.saveEditedRow}
              deleteRow={this.deleteRow} />
          ))
        }

        { mode === 'users' && dataLength > 0 &&
          this.props.objects.map(object => (
            <UserRow user={object}
              key={object.id}
              groupsIdToName={this.props.groupsIdToName}
              saveEditedRow={this.saveEditedRow}
              deleteRow={this.deleteRow} />
          ))
        }

        { dataLength <= 0 &&
          <tr>
            <td>Sorry, there is no data. Add something to see the table</td>
          </tr>
        }
      </>
    )
  };
}
