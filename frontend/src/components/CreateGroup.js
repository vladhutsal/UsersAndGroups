import React from 'react';
import Cookies from 'js-cookie';


class CreateGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: ''
    }

    this.handleRequest = this.handleRequest.bind(this);
    this.updateField = this.updateField.bind(this)
  }

  updateField(event) {
    const { target: {name, value} } = event;
    this.setState({
      [name]: value
    })
  }

  async handleRequest(event) {
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
    console.log(data.body)
    const res = await fetch('http://127.0.0.1:8000/api/groups/create', data);
    console.log(res);
  }

  

  render() {

    return (
      <div>
        <form id='groupForm' onSubmit={this.handleRequest}>
          <input type='text' placeholder='name' name='name' onChange={ this.updateField } value={ this.state.name } />
          <input type='text' placeholder='description' name='description' onChange={ this.updateField } value={ this.state.description }/>
          <button className='btn btn-warning' type='submit'>submit</button>
        </form>
      </div>
    )
  }
}

export default CreateGroup;
