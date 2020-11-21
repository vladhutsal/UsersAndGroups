import React from 'react';
import CreateGroup from './components/CreateGroup';
import GroupsList from './components/GroupTable';


export default class Groups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupsList: []
        }

        this.handleRequest = this.handleRequest.bind(this)
        this.addNewGroup = this.addNewGroup.bind(this)
    }

    async handleRequest() {
        const res = await fetch('http://127.0.0.1:8000/api/groups');
        const data = await res.json();
        console.warn('GET FROM SERVER')
        console.log(data)
        return data;        
    }

    async componentDidMount() {
        const data = await this.handleRequest();
        this.setState({
            groupsList: data
        })
    }

    addNewGroup(group) {
        this.setState(state => ({
            groupsList: [group, ...state.groupsList]  
        }));
        console.log(`addNEW: ${this.state.groupsList}`)
    }

    render() {
        return (
            <div>
              <CreateGroup addNewGroup={ this.addNewGroup }/>
              <GroupsList groupsList={ this.state.groupsList }/>
            </div>
        )
    }
    

}