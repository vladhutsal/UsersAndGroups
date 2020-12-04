import React from 'react';


const Actions = (props) => {
  if (!props.isEdit) {
    return (
      <div className='row'>
        <button
          className='btn btn-sm btn-info mr-2'
          onClick={props.edit}>
          Edit
        </button>

        <button
          className='btn btn-sm btn-info'
          onClick={() => {props.delete(props.id)}}>
          Delet
        </button>
      </div>
    )
  }

  else {
    return (
      <div className='row'>
        <button
          className='btn btn-sm btn-info mr-2'
          onClick={props.edit}>
          Cancel
        </button>

        <button
          className='btn btn-sm btn-info'
          onClick={props.save}>
          Save
        </button>
      </div>
    )
  }
}


export default Actions;
