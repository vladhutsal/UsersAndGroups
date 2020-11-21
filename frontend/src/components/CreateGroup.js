import React from 'react';
import Cookies from 'js-cookie';


class CreateGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: ''
    }

    this.submitNewGroup = this.submitNewGroup.bind(this);
    this.updateField = this.updateField.bind(this)
  }

  updateField(event) {
    const { target: {name, value} } = event;
    this.setState({
      [name]: value
    })
  }

  async submitNewGroup(event) {
    event.preventDefault();
    const csrftoken = Cookies.get('csrftoken');
    const data = {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      }
    };
    const res = await fetch('http://127.0.0.1:8000/api/groups/create', data);
    const newGroup = await res.json();
    console.warn('NEW GROUP');
    console.log(newGroup);
    this.props.addNewGroup(newGroup);
  }

  
  render() {

    return (
      <div>
        <form id='groupForm' onSubmit={ this.submitNewGroup }>
          <input type='text' placeholder='name' name='name' onChange={ this.updateField } value={ this.state.name } />
          <input type='text' placeholder='description' name='description' onChange={ this.updateField } value={ this.state.description }/>
          <button className='btn btn-warning btn-sm' type='submit'>submit</button>
        </form>
      </div>
    )
  }
}

export default CreateGroup;
