import React from 'react';


class GroupsList extends React.Component {
  render() {

    return (
      <div>
        <form id='groupForm'>
          <input type='text' placeholder='name' id='name' />
          <input type='text' placeholder='description' id='description' />
          <button className='btn btn-warning' type='submit'>submit</button>
        </form>
      </div>
    )
  }
}

export default GroupsList;
