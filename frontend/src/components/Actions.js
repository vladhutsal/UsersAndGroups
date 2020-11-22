import React from 'react';


const Actions = (props) => {
  if (!props.edit) {
    return(
      <div className='row'>
        <button
          className='btn btn-sm btn-info mr-2'
          id={ props.id }
          onClick={ props.editGroup }>
            Edit
        </button>

        <button
          className='btn btn-sm btn-info'
          id={ props.id }
          onClick={ props.delete }>
            Delet
        </button>
      </div>
  )}

  else {
    return(
      <div className='row'>
        <button
          className='btn btn-sm btn-info mr-2'
          id={ props.id }
          onClick={ props.editGroup }>
            Cancel
        </button>

        <button
          className='btn btn-sm btn-info'
          id={ props.id }
          onClick={ props.save }>
            Save
        </button>
      </div>
    )
  }
}


export default Actions;
