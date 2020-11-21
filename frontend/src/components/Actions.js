import React from 'react';


const Actions = (props) => {
  return(
    <div className='row'>
      <button className='btn btn-sm btn-info mr-2' id={ props.id }>Edit</button>
      <button className='btn btn-sm btn-warning' id={ props.id }>Delet</button>
    </div>
  )
}


export default Actions;
