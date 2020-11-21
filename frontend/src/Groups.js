import React from 'react';
import CreateGroup from './components/CreateGroup';
import GroupsList from './components/GroupsList';


export default class Groups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupsList: []
        }
        this.handleRequest = this.handleRequest.bind(this)
    }

    async handleRequest() {
        const res = await fetch('http://127.0.0.1:8000/api/groups');
        const data = await res.json();
        console.log(`GET Groups: ${data}`)
        return data;        
    }

    async componentDidMount() {
        const data = await this.handleRequest();
        this.setState({
            groupsList: data
        })
        console.log(`groups component: ${this.state.groupsList}`)
    }

    render() {
        return (
            <div>
              <CreateGroup />
              <GroupsList groupsList={ this.state.groupsList }/>
            </div>
        )
    }
    

}