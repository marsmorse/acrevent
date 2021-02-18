import React from 'react';
import { observer } from 'mobx-react-lite';
import { values } from 'mobx';
import { types } from 'mobx-state-tree';
import axios from 'axios';
//import { CreativesListView, cstore } from '../store/creatives-list'

class Creatives extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            creatives: this.getUserCreatives()
        }
        
    }
    getUserCreatives() {
        axios.get('/creatives/all').then( res => {
            console.log(res);
        }).catch( error => {
            console.log(error);
        })
        return ["Drake", "Sia", "Kanye West"];
    }
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.name.value)
        let newCreatives = this.state.creatives;
        newCreatives.push(event.target.name.value);
        this.setState({ creatives: newCreatives });
        console.log(this.state.creatives);
    }
    render(){
        console.log(this.state.creatives);
        return(
            <div className="events-cont">
                <div className="list-cont">
                
                <ul className="list-group">
                    {this.state.creatives.map( (c, index) => {
                        console.log(c);
                        return (<li key={index} className="list-group-item">{c}</li>)
                    })}
                    <li className="list-group-item">
                        <form onSubmit={this.handleSubmit}>
                            <input id="name" type="text"/>
                            <button type="submit">+</button>
                        </form>
                    </li>
                </ul>
                </div>
            </div>
        )
    }
        
}

export default Creatives