import React from 'react';
import Actions from './Actions';


class GroupRows extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <tbody id='tBody'>
        { this.props.groupsList.map(group => (
        <tr key={ group.id }>
          <td>{ group.id }</td>
          <td>{ group.name }</td>
          <td>{ group.description }</td>
          <td><Actions id={ group.id }/></td>
        </tr>
      ))}
      </tbody>
    )
  }
}


export default class GroupsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
        <table className="table container mt-4">
        <thead>
        <tr>
            <th scope="col">ID</th>
            <th scope="col">Group</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
        </tr>
        </thead>
            <GroupRows groupsList={ this.props.groupsList }/>
        </table>
        <br />
        </div>

    )
  }
}
